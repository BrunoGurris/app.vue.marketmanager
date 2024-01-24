<template>
  <div>
    <DataTable ref="dt" :value="rows" :paginator="true" :rows="100"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} lojas">
      <template #empty>
        <div class="text-center">Nenhum registro de lojas</div>
      </template>

      <Column v-for="(col, n) in columns" :key="n" :field="col" :header="col">
        <template #body="{ data }">
          <div v-if="col == 'Código'">{{ data[n] }}</div>
          <div v-else-if="col == 'Descrição'">{{ data[n] }}</div>
          <div v-else-if="col == 'Igual'">{{ data[n] }}</div>
          <div v-else>{{ data[n] ? data[n]['price'] : '-' }}</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'TableCompareStores',

  props: ['columns', 'rows'],

  data() {
    return {
    }
  },

  components: {
  },

  methods: {
  }
}
</script>

<style scoped></style>