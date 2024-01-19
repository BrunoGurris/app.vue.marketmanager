<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
        <h4 class="page-title">Dashboard</h4>
        <span class="page-subtitle">Gerencie suas informações</span>
      </div>
      <!-- <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <span class="p-input-icon-left me-2">
          <i class="bi bi-search d-flex align-items-center" />
          <InputText v-model="filters['global'].value" placeholder="Buscar" />
        </span>
        <Button @click="openModalCreateCoupon()" label="Adicionar" />
      </div> -->
    </div>

    <div class="page-content-layout">
      <Graphic1 />
    </div>
  </div>
</template>

<script>
import Graphic1 from '@/components/dashboard/Graphic1.vue'

export default {
  name: 'Dashboard',

  components: {
    Graphic1
  },

  data() {
    return {

    }
  },

  methods: {

  },

  created() {

  }
}
</script>

<style lang="scss" scoped></style>