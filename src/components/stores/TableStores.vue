<template>
  <div>
    <DataTable
      ref="dt"
      :value="stores"
      :paginator="true"
      :rows="100"
      size="small"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} lojas"
      showGridlines
    >
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Loja"></Column>
      <Column field="created_at" header="Data de Criação">
        <template #body="{ data }">
            {{ formatDate(data.created_at) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { formatDateUtils } from '../../services/utils'

export default {
  name: 'TableStores',

  props: ['stores'],

  methods: {
    formatDate(date) {
      return formatDateUtils(date)
    }
  }
}
</script>

<style scoped></style>