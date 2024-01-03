<template>
  <div>
    <DataTable
      ref="dt"
      :value="stores"
      :paginator="true"
      :rows="100"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} lojas"
    >
      <template #loading>
        <div class="text-center">Carregando as lojas...</div>
      </template>
      <template #empty v-if="loading == false">
        <div class="text-center">Nenhum registro de lojas</div>
      </template>

      <Column field="id" header="ID"></Column>
      <Column field="name" header="Loja"></Column>
      <Column field="created_at" header="Data de Criação">
        <template #body="{ data }">
            {{ formatDate(data.created_at) }}
        </template>
      </Column>
      <Column header="Ações">
        <template #body="{ data }">
            <div class="d-flex">
              <i @click="openModalEditStore(data)" class="bi bi-pencil-square mx-1 button-icon-edit"></i>
              <i  @click="openModalDeleteStore(data)" class="bi bi-trash3-fill mx-1 button-icon-delete"></i>
            </div>
        </template>
      </Column>
    </DataTable>

    <ModalEditStore :stores="stores" ref="modalEditStore" />
    <ModalDeleteStore :stores="stores" ref="modalDeleteStore" />
  </div>
</template>

<script>
import { formatDateUtils } from '../../services/utils'
import ModalEditStore from './ModalEditStore.vue'
import ModalDeleteStore from './ModalDeleteStore.vue'

export default {
  name: 'TableStores',

  props: ['stores', 'loading'],

  components: {
    ModalEditStore,
    ModalDeleteStore
  },

  methods: {
    openModalEditStore(store) {
      this.$refs.modalEditStore.openModal(store)
    },

    openModalDeleteStore(store) {
      this.$refs.modalDeleteStore.openModal(store)
    },

    formatDate(date) {
      return formatDateUtils(date)
    }
  }
}
</script>

<style scoped></style>