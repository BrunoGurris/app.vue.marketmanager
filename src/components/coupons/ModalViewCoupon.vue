<template>
  <div>
    <Dialog v-model:visible="visible" header="Visualizar cupom" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <Divider align="center">
        <b>Informações</b>
      </Divider>

      <div class="row mt-2">
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Chave de acesso</label>
          <p>{{ coupon.key }}</p>
        </div>

        <div class="col-12 col-lg-4 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Nº do cupom</label>
          <p>{{ coupon.number }}</p>
        </div>

        <div class="col-12 col-lg-4 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Data da compra</label>
          <p>{{ formatDateTime(coupon.date) }}</p>
        </div>

        <div class="col-12 col-lg-4 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Valor</label>
          <p>{{ formatCurrency(coupon.value) }}</p>
        </div>
      </div>

      <Divider align="center">
        <b>Estabelecimento</b>
      </Divider>

      <div class="row">
        <div class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Nome</label>
          <p>{{ coupon.company }}</p>
        </div>

        <div class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100 fw-bold">CNPJ</label>
          <p>{{ coupon.cnpj }}</p>
        </div>

        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Endereço</label>
          <p>{{ coupon.address }}</p>
        </div>

        <div class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Bairro</label>
          <p>{{ coupon.neighborhood }}</p>
        </div>

        <div class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Cidade</label>
          <p>{{ coupon.city }}</p>
        </div>

        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Estado</label>
          <p>{{ coupon.state }}</p>
        </div>
      </div>

      <Divider align="center" type="dotted">
        <b>Produtos</b>
      </Divider>

      <div v-for="(item, n) in items" :key="n" class="row mt-3 border-bottom pb-3">
        <div class="col-12">
          <div><b>Cod:</b> {{ item.cod }}</div>
          <div><b>Descricão:</b> {{ item.description }}</div>
          <div><b>Quantidade:</b> {{ item.amount }}</div>
          <div><b>Unidade:</b> {{ item.unit }}</div>
          <div><b>Valor unitário:</b> {{ item.valueUnit }}</div>
          <div><b>Valor total:</b> {{ item.value }}</div>
        </div>
      </div>
      
      <p class="text-center" v-if="loading">Carregando...</p>

      <template #footer>
        <div class="mt-2">
          <Button label="Fechar" severity="secondary" @click="closeModal()" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { formatDateTimeUtils, formatCurrencyUtils } from '@/services/utils'
import { couponItemsHook } from '@/hooks/couponHooks'

export default {
  name: 'ModalViewCoupon',

  data() {
    return {
      visible: false,
      loading: true,
      coupon: {},
      items: [],
    }
  },

  methods: {
    async listCouponItems(id) {
      this.items = []
      this.loading = true

      const response = await couponItemsHook(id)

      if (response.status == 200) {
        this.items = response.data
        this.loading = false
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    openModal(coupon) {
      this.visible = true
      this.coupon = coupon
      this.listCouponItems(coupon.id)
    },

    closeModal() {
      this.visible = false
    },

    formatDateTime(date) {
      return formatDateTimeUtils(date)
    },

    formatCurrency(value) {
      return formatCurrencyUtils(value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>