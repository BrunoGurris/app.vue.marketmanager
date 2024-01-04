<template>
  <div>
    <DataTable
      ref="dt"
      :value="coupons"
      :paginator="true"
      :rows="100"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cupons"
    >
      <template #loading>
        <div class="text-center">Carregando os cupons...</div>
      </template>
      <template #empty v-if="loading == false">
        <div class="text-center">Nenhum registro de cupons</div>
      </template>

      <Column field="id" header="ID"></Column>
      <Column field="key" header="Chave de Acesso">
        <template #body="{ data }">
            {{ formatKey(data.key) }}
        </template>
      </Column>
      <Column field="number" header="Nº do Cupom"></Column>
      <Column field="company" header="Estabelecimento"></Column>
      <Column field="value" header="Total"></Column>
      <Column field="created_at" header="Data da Compra">
        <template #body="{ data }">
            {{ formatDateTime(data.date) }}
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
              <i @click="openModalEditStore(data)" class="bi bi-pencil-square mx-1 button-icon-edit"></i>
              <i  @click="openModalDeleteStore(data)" class="bi bi-trash3-fill mx-1 button-icon-delete"></i>
            </div>
        </template>
      </Column>
    </DataTable>

    <!-- <ModalEditStore :stores="stores" ref="modalEditStore" />
    <ModalDeleteStore :stores="stores" ref="modalDeleteStore" /> -->
  </div>
</template>

<script>
import { formatDateUtils, formatDateTimeUtils, formatKeyUtils} from '../../services/utils'
// import ModalEditStore from './ModalEditStore.vue'
// import ModalDeleteStore from './ModalDeleteStore.vue'

export default {
  name: 'TableCoupons',

  props: ['coupons', 'loading'],

  components: {
    // ModalEditStore,
    // ModalDeleteStore
  },

  methods: {
    // openModalEditStore(store) {
    //   this.$refs.modalEditStore.openModal(store)
    // },

    // openModalDeleteStore(store) {
    //   this.$refs.modalDeleteStore.openModal(store)
    // },

    formatDate(date) {
      return formatDateUtils(date)
    },

    formatDateTime(date) {
      return formatDateTimeUtils(date)
    },

    formatKey(key) {
      return formatKeyUtils(key)
    }
  }
}
</script>

<style scoped></style>