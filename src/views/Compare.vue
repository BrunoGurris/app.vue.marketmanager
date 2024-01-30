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
            placeholder="Selecione um cupom (Nº ou Chave)" dropdown @complete="onComplete" class="w-100"
            :disabled="step" />
        </div>
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Lojas</label>
          <MultiSelect v-model="storesSelected" display="chip" :options="stores" optionLabel="name" optionValue="id"
            placeholder="Selecione as lojas" class="w-100" emptyMessage="Nenhum registro de loja" :disabled="step" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100">Lucro (%)</label>
          <InputNumber v-model="formCompare.percentage" suffix="%" :minFractionDigits="2" placeholder="Minimo"
            class="w-100" :disabled="step" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100">Margem do lucro (%)<i class="bi bi-question-circle-fill ms-2"
              v-tooltip.top="{ value: 'Ex: Se seu lucro é de 60% e sua margem de lucro é de 5%, o sistema irá considerar que os produtos que tem o preço de venda entre 55% e 65% do valor comprado estão no preço correto!', showDelay: 300, hideDelay: 1 }"></i></label>
          <InputNumber v-model="formCompare.percentage_radius" suffix="%" :minFractionDigits="2" placeholder="Máximo"
            class="w-100" :disabled="step" />
        </div>
        <div class="col-12 mb-3">
          <Button v-if="!step && formCompare.type == 'coupon'" :label="buttonCompareCoupon.label"
            :disabled="buttonCompareCoupon.disabled" class="w-100" @click="compareCoupon()" />
          <Button v-else-if="!step && formCompare.type == 'stores'" :label="buttonCompareStores.label"
            :disabled="buttonCompareStores.disabled" class="w-100" @click="compareStores()" />
          <Button v-else label="Nova comparação" class="w-100" severity="info" @click="clearFields()" />
        </div>
      </div>
    </div>

    <div class="page-content-layout mt-3" v-if="tableCompareCoupon.type == 'coupon' && step == true">
      <TableCompareCoupon :columns="tableCompareCoupon.columns" :rows="tableCompareCoupon.rows" />
    </div>

    <div class="page-content-layout mt-3" v-if="tableCompareStores.type == 'stores' && step == true">
      <TableCompareStores :columns="tableCompareStores.columns" :rows="tableCompareStores.rows" />
    </div>
  </div>
</template>
  
<script>
import TableCompareCoupon from '@/components/compare/TableCompareCoupon.vue'
import TableCompareStores from '@/components/compare/TableCompareStores.vue'
import { compareCouponHook, compareStoresHook } from '@/hooks/compareHooks'
import { couponListHook } from '@/hooks/couponHooks'
import { storeListHook } from '@/hooks/storeHooks'
import { formatCurrencyUtils, formatDateUtils } from '@/services/utils'

export default {
  name: 'Compare',

  components: {
    TableCompareCoupon,
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
        percentage: 0,
        percentage_radius: 5,
      },

      tableCompareCoupon: {
        type: '',
        columns: [],
        rows: [],
      },

      tableCompareStores: {
        type: '',
        columns: [],
        rows: [],
      },

      buttonCompareCoupon: {
        label: 'Comparar cupom',
        disabled: false,
      },

      buttonCompareStores: {
        label: 'Comparar lojas',
        disabled: false,
      }
    }
  },

  methods: {
    async compareCoupon() {
      this.buttonCompareCoupon.label = 'Comparando cupom...'
      this.buttonCompareCoupon.disabled = true

      const response = await compareCouponHook(this.formCompare)

      if (response.status == 200) {
        this.step = true
        this.tableCompareCoupon.type = response.data.type
        this.tableCompareCoupon.columns = response.data.columns
        this.tableCompareCoupon.rows = response.data.rows
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonCompareCoupon.label = 'Comparar cupom'
      this.buttonCompareCoupon.disabled = false
    },

    async compareStores() {
      this.buttonCompareStores.label = 'Comparando lojas...'
      this.buttonCompareStores.disabled = true

      const response = await compareStoresHook(this.formCompare)

      if (response.status == 200) {
        this.step = true
        this.tableCompareStores.type = response.data.type
        this.tableCompareStores.columns = response.data.columns
        this.tableCompareStores.rows = response.data.rows
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonCompareStores.label = 'Comparar lojas'
      this.buttonCompareStores.disabled = false
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
      this.formCompare.percentage = ''
      this.formCompare.percentage_radius = 5

      this.couponSelected = null
      this.storesSelected = []
    }
  },

  created() {
    this.listCoupons()
    this.listStores()
  },

  watch: {
    couponSelected(value) {
      this.formCompare.coupon_id = value ? value.code : null
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