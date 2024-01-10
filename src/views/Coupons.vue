<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h4 class="page-title">Cupons</h4>
      <Button @click="openModalCreateCoupon()" label="Adicionar" />
    </div>
    <div id="pageContent">
      <TableCoupons :coupons="coupons" :loading="loading" />
    </div>

    <ModalCreateCoupon :coupons="coupons" ref="modalCreateCoupon" />
  </div>
</template>

<script>
import TableCoupons from '@/components/coupons/TableCoupons.vue'
import ModalCreateCoupon from '@/components/coupons/ModalCreateCoupon.vue'
import { couponListHook } from '@/hooks/couponHooks'

export default {
  name: 'Coupons',

  components: {
    TableCoupons,
    ModalCreateCoupon,
  },

  data() {
    return {
      coupons: [],
      loading: false
    }
  },

  methods: {
    async listCoupons() {
      this.loading = true
      const response = await couponListHook()

      if (response.status == 200) {
        this.coupons = response.data
        this.loading = false
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    openModalCreateCoupon() {
      this.$refs.modalCreateCoupon.openModal()
    }
  },

  created() {
    this.listCoupons()
  }
}
</script>

<style lang="scss" scoped>
#pageContent {
  width: 100%;

  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;

  background: $white;
}
</style>