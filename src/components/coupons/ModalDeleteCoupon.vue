<template>
  <div>
    <Dialog v-model:visible="visible" header="Excluir cupom" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <p>Você realmente deseja excluir o cupom de valor de <b>{{ formatCurrency(coupon.value) }}</b> em compras?</p>

      <template #footer>
        <div class="mt-2">
          <Button label="Cancelar" severity="secondary" class="me-2" @click="closeModal()" />
          <Button :label="buttonDeleteCoupon.label" :disabled="buttonDeleteCoupon.disabled" severity="danger" @click="deleteCoupon(coupon.id)" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { formatDateTimeUtils, formatCurrencyUtils } from '@/services/utils'
import { couponDeleteHook } from '@/hooks/couponHooks'

export default {
  name: 'ModalDeleteCoupon',

  props: ['coupons'],

  data() {
    return {
      visible: false,
      coupon: {},

      buttonDeleteCoupon: {
        label: 'Excluir',
        disabled: false
      }
    }
  },

  methods: {
    async deleteCoupon(id) {
      this.buttonDeleteCoupon.label = 'Excluindo...'
      this.buttonDeleteCoupon.disabled = true

      const response = await couponDeleteHook(id)

      if (response.status == 200) {
        const index = this.coupons.findIndex(obj => obj.id === response.data.id)
        this.coupons.splice(index, 1)

        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cupom excluído com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonDeleteCoupon.label = 'Excluir'
      this.buttonDeleteCoupon.disabled = false
    },

    openModal(coupon) {
      this.visible = true
      this.coupon = coupon
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

<style lang="scss" scoped></style>