<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
        <h4 class="page-title">Cupons</h4>
        <span class="page-subtitle">Gerencie todos os seus cupons</span>
      </div>
      <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <span class="p-input-icon-left me-2">
          <i class="bi bi-search d-flex align-items-center" />
          <InputText v-model="filters['global'].value" placeholder="Buscar" />
        </span>
        <Button @click="openModalCreateCoupon()" label="Adicionar" />
      </div>
    </div>

    <div class="page-content-layout">
      <TableCoupons :coupons="coupons" :loading="loading" :filters="filters" />
    </div>

    <ModalCreateCoupon :coupons="coupons" ref="modalCreateCoupon" />
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
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
      loading: false,
      filters: {}
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
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  },

  created() {
    this.listCoupons()
    this.initFilters()
  }
}
</script>

<style lang="scss" scoped>
</style>