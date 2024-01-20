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
        <b>Lojas <span v-if="formEditCoupon.stores.length > 0">({{ formEditCoupon.stores.length }})</span></b>
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
          <Button icon="bi bi-x" severity="danger" v-tooltip.top="{ value: 'Excluir', showDelay: 300, hideDelay: 1 }"
            @click="removeStore(n)" />
        </div>
      </div>

      <div v-if="formEditCoupon.stores.length == 0 && loading == false" class="text-center">
        Não há valores das lojas
      </div>
      <div v-else-if="formEditCoupon.stores.length == 0 && loading == true" class="text-center">
        Carregando....
      </div>

      <template #footer>
        <div class="d-flex justify-content-between">
          <Button label="Adicionar loja" severity="info" @click="addStore()" />
          <div>
            <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
            <Button :label="buttonEditCoupon.label" :disabled="buttonEditCoupon.disabled" @click="editCoupon(coupon.id)" />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { formatDateUtils, formatDateTimeUtils, formatCurrencyUtils } from '../../services/utils'
import { couponViewHook, couponEditHook } from '@/hooks/couponHooks'
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
      loading: true,

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
    async editCoupon(id) {
      this.buttonEditCoupon.label = 'Editando...'
      this.buttonEditCoupon.disabled = true

      const response = await couponEditHook(this.formEditCoupon, id)

      if (response.status == 200) {
        const index = this.coupons.findIndex(obj => obj.id === response.data.id)
        this.coupons[index] = response.data

        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cupom editado com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonEditCoupon.label = 'Editar'
      this.buttonEditCoupon.disabled = false
    },

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
      })

      this.loading = false
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
      this.loading = true
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