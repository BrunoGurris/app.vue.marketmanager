<template>
  <div>
    <DataTable
      ref="dt"
      :value="items"
      :paginator="true"
      :rows="100"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} itens"
      showGridlines
      :frozen="header"
      stripedRows 
    >
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
import { formatCurrencyUtils } from '@/services/utils';

export default {
  name: 'TableItemsStore',

  props: ['items', 'loading'],

  methods: {
    formatCurrency(value) {
      return formatCurrencyUtils(value)
    }
  }
}
</script>

<style scoped></style>