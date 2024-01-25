<template>
  <div>
    <div class="d-block d-lg-flex justify-content-center justify-content-lg-end mt-2">
      <div class="d-flex justify-content-center align-items-center">
        <div class="flex align-items-center me-4">
          <RadioButton v-model="filters.standard" name="standard" value="all" />
          <label class="ms-1">Todos</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="filters.standard" name="standard" value="not-standard" />
          <label class="ms-1">Apenas não padronizados</label>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <span class="p-input-icon-left ms-lg-3 mt-3 mt-lg-0">
          <i class="bi bi-search d-flex align-items-center" />
          <InputText v-model="filters.text" placeholder="Buscar" />
        </span>
      </div>
    </div>
    <DataTable ref="dt" :value="rowsTable" :paginator="true" :rows="500"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos" scrollable scrollHeight="600px"
      :rowClass="(data) => data[data.length - 1] == false ? 'compare-stores-not-standard' : ''" class="mt-3">
      <template #empty>
        <div class="text-center">Nenhum registro de produtos</div>
      </template>

      <Column v-for="(col, n) in columns" :key="n" :field="col" :header="col">
        <template #body="{ data }">
          <div v-if="col == 'Código'">{{ data[n] }}</div>
          <div v-else-if="col == 'Descrição'">{{ data[n] }}</div>
          <div v-else-if="col == 'Padrão'">
            <div v-if="data[n] == 1"><span class="badge text-bg-success">OK</span></div>
            <div v-else><span class="badge text-bg-danger">Não</span></div>
          </div>
          <div v-else>
            <div v-if="data[n]" class="">
              <p class="m-0 fw-bold">{{ formatCurrency(data[n]['price']) }}</p>
              <span class="badge text-bg-light fw-normal">{{ 'Qtde: ' + data[n]['amount'] }}</span>
            </div>
            <div v-else>-</div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { formatCurrencyUtils } from '@/services/utils'

export default {
  name: 'TableCompareStores',

  props: ['columns', 'rows'],

  data() {
    return {
      filters: {
        text: '',
        standard: 'all',
      },

      rowsTable: [],
    }
  },

  components: {
  },

  methods: {
    formatCurrency(value) {
      return formatCurrencyUtils(value)
    },

    filter() {
      let rows = this.rows

      if (this.filters.text) {
        rows = rows.filter(row => row.some(item => typeof item === 'string' && item.includes(this.filters.text.toUpperCase())));
      }

      if (this.filters.standard == 'not-standard') {
        rows = rows.filter(row => row[row.length - 1] === false)
      }

      this.rowsTable = rows
    }
  },

  created() {
    this.rowsTable = this.rows
  },

  watch: {
    'filters.text'() {
      this.filter()
    },

    'filters.standard'() {
      this.filter()
    }
  }
}
</script>

<style lang="scss" scoped></style>