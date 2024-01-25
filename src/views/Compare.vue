<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
        <h4 class="page-title">Comparar</h4>
        <span class="page-subtitle">Compare os cupons com as lojas</span>
      </div>
    </div>

    <div class="page-content-layout">
      <div class="row mb-3 mt-2">
        <div class="d-flex">
          <div class="flex align-items-center me-4">
            <RadioButton v-model="formCompare.type" name="type" value="coupon" :disabled="step" />
            <label class="ms-1">Entre cupom e lojas</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton v-model="formCompare.type" name="type" value="stores" :disabled="step" />
            <label class="ms-1">Apenas entre lojas</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-if="formCompare.type == 'coupon'" class="col-12 mb-3">
          <label class="form-label m-0 w-100">Cupom</label>
          <AutoComplete v-model="couponSelected" :suggestions="suggestions" field="name"
            placeholder="Selecione um cupom (Nº ou Chave)" dropdown @complete="onComplete" class="w-100" :disabled="step" />
        </div>
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Lojas</label>
          <MultiSelect v-model="storesSelected" display="chip" :options="stores" optionLabel="name" optionValue="id"
            placeholder="Selecione as lojas" class="w-100" :disabled="step" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100">Lucro mínimo (%)</label>
          <InputNumber v-model="formCompare.percentage_min" suffix="%" :minFractionDigits="2" placeholder="Minimo"
            class="w-100" :disabled="step" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100">Lucro máximo (%)</label>
          <InputNumber v-model="formCompare.percentage_max" suffix="%" :minFractionDigits="2" placeholder="Máximo"
            class="w-100" :disabled="step" />
        </div>
        <div class="col-12 mb-3">
          <Button v-if="!step" :label="buttonCompare.label" :disabled="buttonCompare.disabled" class="w-100" @click="compare()" />
          <Button v-else label="Nova comparação" class="w-100" severity="info" @click="clearFields()" />
        </div>
      </div>
    </div>

    <div class="page-content-layout mt-3" v-if="formCompare.type == 'stores' && step == true">
      <TableCompareStores :columns="tableCompareStores.columns" :rows="tableCompareStores.rows" />
    </div>
  </div>
</template>
  
<script>
import TableCompareStores from '@/components/compare/TableCompareStores.vue'
import { compareCompareHook } from '@/hooks/compareHooks'
import { couponListHook } from '@/hooks/couponHooks'
import { storeListHook } from '@/hooks/storeHooks'
import { formatCurrencyUtils, formatDateUtils } from '@/services/utils'

export default {
  name: 'Compare',

  components: {
    TableCompareStores
  },

  data() {
    return {
      step: false,
      suggestions: [],
      coupons: [],
      stores: [],

      couponSelected: null,
      storesSelected: [],

      formCompare: {
        type: 'coupon',
        coupon_id: 0,
        stores_id: [],
        percentage_min: 0,
        percentage_max: 0,
      },

      tableCompareStores: {
        type: '',
        columns: [],
        rows: [],
      },

      buttonCompare: {
        label: 'Comparar',
        disabled: false,
      }
    }
  },

  methods: {
    async compare() {
      this.buttonCompare.label = 'Comparando...'
      this.buttonCompare.disabled = true

      const response = await compareCompareHook(this.formCompare)

      if (response.status == 200) {
        this.step = true
        this.tableCompareStores.type = response.data.type
        this.tableCompareStores.columns = response.data.columns
        this.tableCompareStores.rows = response.data.rows
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonCompare.label = 'Comparar'
      this.buttonCompare.disabled = false
    },

    async listCoupons() {
      this.coupons = []

      const response = await couponListHook()

      if (response.status == 200) {
        this.coupons = response.data
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    async listStores() {
      this.stores = []

      const response = await storeListHook()

      if (response.status == 200) {
        this.stores = response.data
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    onComplete(e) {
      this.suggestions = []

      this.coupons.forEach(coupon => {
        if (coupon.number.includes(e.query) || coupon.key.includes(e.query) || e.query == '') {
          this.suggestions.push({
            name: 'Nº ' + coupon.number + ' | ' + this.formatDate(coupon.date) + ' | ' + this.formatCurrency(coupon.value) + ' | ' + coupon.key,
            code: coupon.id
          })
        }
      })
    },

    formatCurrency(value) {
      return formatCurrencyUtils(value)
    },

    formatDate(date) {
      return formatDateUtils(date)
    },

    clearFields() {
      this.step = false
      this.formCompare.type = 'coupon'
      this.formCompare.coupon_id = 0
      this.formCompare.stores_id = []
      this.formCompare.percentage_min = 0
      this.formCompare.percentage_max = 0

      this.storesSelected = []
    }
  },

  created() {
    this.listCoupons()
    this.listStores()
  },

  watch: {
    couponSelected(value) {
      this.formCompare.coupon_id = value.code
    },

    storesSelected(value) {
      this.formCompare.stores_id = []

      value.forEach(store_id => {
        this.formCompare.stores_id.push(store_id)
      })
    }
  }

}
</script>
  
<style lang="scss" scoped></style>