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
    </DataTable>
  </div>
</template>

<script>
import { formatDateUtils } from '../../services/utils'

export default {
  name: 'TableStores',

  props: ['stores', 'loading'],

  methods: {
    formatDate(date) {
      return formatDateUtils(date)
    }
  }
}
</script>

<style scoped></style>