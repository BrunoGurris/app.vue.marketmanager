<template>
  <div>
    <div class="d-block d-lg-flex justify-content-center justify-content-lg-end mt-2">
      <div class="d-flex justify-content-center align-items-center">
        <div class="flex align-items-center me-4">
          <RadioButton v-model="filters.type" name="filter" value="all" />
          <label class="ms-1">Todos</label>
        </div>
        <div class="flex align-items-center me-4">
          <RadioButton v-model="filters.type" name="filter" value="below-price" />
          <label class="ms-1">Abaixo do preço</label>
        </div>
        <div class="flex align-items-center me-4">
          <RadioButton v-model="filters.type" name="filter" value="above-price" />
          <label class="ms-1">Acima do preço</label>
        </div>
        <div class="flex align-items-center me-4">
          <RadioButton v-model="filters.type" name="filter" value="not-standard" />
          <label class="ms-1">Não padronizados</label>
        </div>
      </div>
      <div class="d-flex justify-content-center me-4">
        <span class="p-input-icon-left ms-lg-3 mt-3 mt-lg-0">
          <i class="bi bi-search d-flex align-items-center" />
          <InputText v-model="filters.text" placeholder="Buscar" />
        </span>
      </div>
    </div>

    <DataTable ref="dt" :value="rowsTable" :paginator="true" :rows="500"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos" scrollable scrollHeight="600px"
      class="mt-3" :rowClass="(data) => verifyBackgroundColor(data[data.length - 1])">
      <template #empty>
        <div class="text-center">Nenhum registro de produtos</div>
      </template>

      <Column v-for="(col, n) in columns" :key="n" :field="col" :header="col">
        <template #body="{ data }">
          <div v-if="col == 'Código'">{{ data[n] }}</div>
          <div v-else-if="col == 'Descrição'">{{ data[n] }}</div>
          <div v-else-if="col == 'Cupom'">{{ formatCurrency(data[n]) }}</div>
          <div v-else-if="col.includes('Venda (')">
            <p class="m-0"><span class="badge text-bg-dark fw-bold fs-8">{{ formatCurrency(data[n]['value']) }}</span></p>
            <p class="m-0">
              <span class="badge text-bg-light fw-normal">{{ formatCurrency(data[n]['min']) }} a {{
                formatCurrency(data[n]['max']) }}</span>
            </p>
          </div>
          <div v-else-if="col == 'Situação'">
            <div v-if="data[n].length == 0"><span class="badge text-bg-success">OK</span></div>
            <div v-else>
              <div v-for="(status, n) in data[n]" :key="n">
                <span v-if="status == 'Acima do preço'" class="badge text-bg-warning fw-normal">{{ status }}</span>
                <span v-else-if="status == 'Abaixo do preço'" class="badge text-bg-danger fw-normal">{{ status }}</span>
                <span v-else-if="status == 'Não padronizado'" class="badge text-bg-primary fw-normal">{{ status }}</span>
                <span v-else>{{ status }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="data[n]" class="">
              <p class="m-0">{{ formatCurrency(data[n]['price']) }}</p>
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
  name: 'TableCompareCoupon',

  props: ['columns', 'rows'],

  data() {
    return {
      filters: {
        text: '',
        type: 'all',
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

      if (this.filters.type == 'below-price') {
        rows = rows.filter(row => row[row.length - 1].includes('Abaixo do preço'))
      }
      else if (this.filters.type == 'above-price') {
        rows = rows.filter(row => row[row.length - 1].includes('Acima do preço'))
      }
      else if (this.filters.type == 'not-standard') {
        rows = rows.filter(row => row[row.length - 1].includes('Não padronizado'))
      }

      this.rowsTable = rows
    },

    verifyBackgroundColor(array) {
      if (array.includes('Abaixo do preço')) {
        return 'compare-coupon-below-price'
      } else if (array.includes('Acima do preço')) {
        return 'compare-coupon-above-price'
      } else if (array.includes('Não padronizado')) {
        return 'compare-coupon-not-standard'
      } else {
        return ''
      }
    }
  },

  created() {
    this.rowsTable = this.rows
  },

  watch: {
    'filters.text'() {
      this.filter()
    },

    'filters.type'() {
      this.filter()
    }
  }
}
</script>

<style lang="scss" scoped></style>