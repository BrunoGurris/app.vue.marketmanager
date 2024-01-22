<template>
  <div>
    <div class="d-flex justify-content-start align-items-center">
      <div>
        <h4 class="page-title" @click="teste()">Comparar</h4>
        <span class="page-subtitle">Compare os cupons com as lojas</span>
      </div>
    </div>

    <div class="page-content-layout px-4">
      <div class="row mb-3 mt-2">
        <div class="d-flex">
          <div class="flex align-items-center me-4">
            <RadioButton v-model="formCompare.type" inputId="ingredient1" name="type" value="coupon" />
            <label class="ms-1">Entre cupom e lojas</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton v-model="formCompare.type" inputId="ingredient2" name="type" value="stores" />
            <label class="ms-1">Apenas entre lojas</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-if="formCompare.type == 'coupon'" class="col-12 mb-3">
          <label class="form-label m-0 w-100">Cupom</label>
          <AutoComplete v-model="couponSelected" :suggestions="suggestions" field="name"
            placeholder="Selecione um cupom (Nº ou Chave)" dropdown @complete="onComplete" class="w-100" />
        </div>
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Lojas</label>
          <MultiSelect v-model="storesSelected" display="chip" :options="stores" optionLabel="name" optionValue="id"
            placeholder="Selecione as lojas" class="w-100" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100">Lucro mínimo (%)</label>
          <InputNumber v-model="formCompare.percentage_min" suffix="%" :minFractionDigits="2" placeholder="Minimo"
            class="w-100" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 col-lg-6 mb-3">
          <label class="form-label m-0 w-100">Lucro máximo (%)</label>
          <InputNumber v-model="formCompare.percentage_max" suffix="%" :minFractionDigits="2" placeholder="Máximo"
            class="w-100" />
        </div>
        <div v-if="formCompare.type == 'coupon'" class="col-12 mb-3">
          <div class="flex align-items-center">
            <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" class="me-1" />
            <label class="form-label m-0">Arredondar centavos (0,49 ou 0,99)</label>
            <i class="bi bi-question-circle-fill ms-2" v-tooltip.top="{ value: 'Ex: R$5,30 => R$5,49\nEx: R$8,75 => R$8,99', showDelay: 300, hideDelay: 1 }"
             ></i>
          </div>
        </div>
        <div class="col-12 mb-3">
          <Button label="Comparar" class="w-100" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { couponListHook } from '@/hooks/couponHooks'
import { storeListHook } from '@/hooks/storeHooks'
import { formatCurrencyUtils, formatDateUtils } from '@/services/utils'

export default {
  name: 'Compare',

  components: {

  },

  data() {
    return {
      suggestions: [],
      coupons: [],
      stores: [],

      couponSelected: null,
      storesSelected: null,

      formCompare: {
        type: 'coupon',
        coupon_id: 0,
        stores_id: [],
        percentage_min: 0,
        percentage_max: 0,
        rounded: false
      }
    }
  },

  methods: {
    async listCoupons() {
      this.coupons = []

      const response = await couponListHook()

      if (response.status == 200) {
        this.coupons = response.data
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    teste() {
      console.log(this.formCompare)
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
      this.suggestions = [{ name: 'Nenhum', code: 0 }]

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