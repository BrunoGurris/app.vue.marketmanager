<template>
  <div>
    <DataTable ref="dt" :value="stores" :paginator="true" :rows="100" :loading="loading" :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} lojas"
      :globalFilterFields="['name', 'last_stock', 'created_at']">
      <template #loading>
        <div class="text-center">Carregando as lojas...</div>
      </template>
      <template #empty v-if="loading == false">
        <div class="text-center">Nenhum registro de lojas</div>
      </template>

      <Column field="id" header="ID"></Column>
      <Column field="name" header="Loja"></Column>
      <Column field="last_stock" header="Último Estoque">
        <template #body="{ data }">
          {{ data.last_stock ? formatDateTime(data.last_stock) : 'Nenhum' }}
        </template>
      </Column>
      <Column field="created_at" header="Data de Criação">
        <template #body="{ data }">
          {{ formatDate(data.created_at) }}
        </template>
      </Column>
      <Column header="Ações">
        <template #body="{ data }">
          <div class="d-flex">
            <i @click="openModalStockStore(data)" v-tooltip.top="{ value: 'Estoque', showDelay: 300, hideDelay: 1 }"
              class="bi bi-box-fill mx-2 button-icon-aux"></i>
            <i @click="openModalEditStore(data)" v-tooltip.top="{ value: 'Editar', showDelay: 300, hideDelay: 1 }"
              class="bi bi-pencil-square mx-2 button-icon-edit"></i>
            <i @click="openModalDeleteStore(data)" v-tooltip.top="{ value: 'Excluir', showDelay: 300, hideDelay: 1 }"
              class="bi bi-trash3-fill mx-2 button-icon-delete"></i>
          </div>
        </template>
      </Column>
    </DataTable>

    <ModalStockStore ref="modalStockStore" />
    <ModalEditStore :stores="stores" ref="modalEditStore" />
    <ModalDeleteStore :stores="stores" ref="modalDeleteStore" />
  </div>
</template>

<script>
import { formatDateUtils, formatDateTimeUtils } from '@/services/utils'
import ModalStockStore from './ModalStockStore.vue'
import ModalEditStore from './ModalEditStore.vue'
import ModalDeleteStore from './ModalDeleteStore.vue'

export default {
  name: 'TableStores',

  props: ['stores', 'loading', 'filters'],

  data() {
    return {
      
    }
  },

  components: {
    ModalStockStore,
    ModalEditStore,
    ModalDeleteStore
  },

  methods: {
    openModalStockStore(store) {
      this.$refs.modalStockStore.openModal(store)
    },

    openModalEditStore(store) {
      this.$refs.modalEditStore.openModal(store)
    },

    openModalDeleteStore(store) {
      this.$refs.modalDeleteStore.openModal(store)
    },

    formatDate(date) {
      return formatDateUtils(date)
    },

    formatDateTime(date) {
      return formatDateTimeUtils(date)
    }
  }
}
</script>

<style scoped></style>