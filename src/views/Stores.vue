<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
        <h4 class="page-title">Lojas</h4>
        <span class="page-subtitle">Gerencie todas as suas lojas</span>
      </div>
      <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <span class="p-input-icon-left me-2">
          <i class="bi bi-search d-flex align-items-center" />
          <InputText v-model="filters['global'].value" placeholder="Buscar" />
        </span>
        <Button @click="openModalCreateStore()" label="Adicionar" />
      </div>
    </div>

    <div class="page-content-layout">
      <TableStores :stores="stores" :loading="loading" :filters="filters" />
    </div>

    <ModalCreateStore :stores="stores" ref="modalCreateStore" />
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import TableStores from '@/components/stores/TableStores.vue'
import ModalCreateStore from '@/components/stores/ModalCreateStore.vue'
import { storeListHook } from '@/hooks/storeHooks'

export default {
  name: 'Stores',

  components: {
    TableStores,
    ModalCreateStore
  },

  data() {
    return {
      stores: [],
      loading: false,
      filters: {}
    }
  },

  methods: {
    async listStores() {
      this.loading = true
      const response = await storeListHook()

      if (response.status == 200) {
        this.stores = response.data
        this.loading = false
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    openModalCreateStore() {
      this.$refs.modalCreateStore.openModal()
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  },

  created() {
    this.listStores()
    this.initFilters()
  }
}
</script>

<style lang="scss" scoped></style>