<template>
  <div>
    <div class="d-flex justify-content-end">
      <span class="p-input-icon-left">
        <i class="bi bi-search d-flex align-items-center" />
        <InputText v-model="filters['global'].value" placeholder="Buscar" />
      </span>
    </div>
    <DataTable ref="dt" :value="items" :paginator="true" :rows="100" :loading="loading" :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} itens" showGridlines :frozen="header"
      stripedRows scrollable :globalFilterFields="['cod', 'description', 'price']" class="mt-4">

      <template #loading>
        <div class="text-center">Carregando os itens...</div>
      </template>
      <template #empty v-if="loading == false">
        <div class="text-center">Nenhum registro de itens</div>
      </template>

      <Column field="cod" header="Código"></Column>
      <Column field="description" header="Descrição"></Column>
      <Column field="amount" header="Quant."></Column>
      <Column field="price" header="Preço">
        <template #body="{ data }">
          {{ formatCurrency(data.price) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import { formatCurrencyUtils } from '@/services/utils';

export default {
  name: 'TableItemsStore',

  props: ['items', 'loading'],

  data() {
    return {
      filters: {},
    }
  },

  methods: {
    formatCurrency(value) {
      return formatCurrencyUtils(value)
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  },

  created() {
    this.initFilters()
  }
}
</script>

<style scoped></style>