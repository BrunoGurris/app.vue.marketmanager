<template>
  <div>
    <Dialog v-model:visible="visible" header="Editar cupom" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <div class="row mt-2">
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Chave de acesso</label>
          <p>{{ coupon.key ?? '...' }}</p>
        </div>

        <div class="col-12 col-lg-4 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Nº do cupom</label>
          <p>{{ coupon.number ?? '...' }}</p>
        </div>

        <div class="col-12 col-lg-4 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Data da compra</label>
          <p>{{ coupon.date ? formatDateTime(coupon.date) : '...' }}</p>
        </div>

        <div class="col-12 col-lg-4 mb-3">
          <label class="form-label m-0 w-100 fw-bold">Valor</label>
          <p>{{ coupon.value ? formatCurrency(coupon.value) : '...' }}</p>
        </div>
      </div>

      <Divider align="center" type="dotted">
        <b>Lojas</b>
      </Divider>

      <div v-for="(store, n) in formEditCoupon.stores" :key="n" class="row mb-3">
        <Divider type="dashed" v-if="n > 0" />

        <div class="col-12 col-lg-6 mb-1">
          <Dropdown v-model="store.id" :options="stores" optionLabel="name" optionValue="id"
            placeholder="Selecione a loja" class="w-100" />
        </div>
        <div class="col-10 col-lg-5 mb-1">
          <InputNumber v-model="store.value" mode="currency" currency="BRL" locale="pt-BR" :minFractionDigits="2"
            class="w-100" placeholder="R$ 0,00" />
        </div>
        <div class="col-2 col-lg-1 mb-1">
          <Button icon="bi bi-x" severity="danger" v-tooltip.top="{ value: 'Excluir', showDelay: 300, hideDelay: 1 }" @click="removeStore(n)" />
        </div>
      </div>

      <template #footer>
        <div class="d-flex justify-content-between">
          <Button label="Adicionar loja" severity="info" @click="addStore()" />
          <div>
            <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
            <Button :label="buttonEditCoupon.label" :disabled="buttonEditCoupon.disabled" @click="createCoupon()" />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { formatDateUtils, formatDateTimeUtils, formatCurrencyUtils } from '../../services/utils'
import { couponViewHook } from '@/hooks/couponHooks'
import { storeListHook } from '@/hooks/storeHooks'

export default {
  name: 'ModalEditCoupon',

  props: ['coupons'],

  components: {
  },

  data() {
    return {
      visible: false,
      coupon: {},
      stores: [],

      formEditCoupon: {
        stores: []
      },

      buttonEditCoupon: {
        label: 'Editar',
        disabled: false
      },
    }
  },

  methods: {
    async viewCoupon(coupon) {
      const response = await couponViewHook(coupon.id)

      if (response.status == 200) {
        this.coupon = response.data
        this.formatForm(response.data)
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    async listStores() {
      this.stores = [];
      const response = await storeListHook()

      if (response.status == 200) {
        this.stores = response.data
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    addStore() {
      this.formEditCoupon.stores.push({
        id: 0,
        value: 0
      })
    },

    removeStore(index) {
      this.formEditCoupon.stores.splice(index, 1)
    },

    formatForm(coupon) {
      coupon.stores.forEach(store => {
        this.formEditCoupon.stores.push({
          id: store.store_id,
          value: store.value
        })
      });
    },

    openModal(coupon) {
      this.viewCoupon(coupon)
      this.listStores()
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    formatDate(date) {
      return formatDateUtils(date)
    },

    formatDateTime(date) {
      return formatDateTimeUtils(date)
    },

    formatCurrency(value) {
      return formatCurrencyUtils(value)
    },

    clearFields() {
      this.coupon = {}
      this.formEditCoupon.stores = []
    }
  },

  watch: {
    visible() {
      if (!this.visible) {
        this.clearFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>