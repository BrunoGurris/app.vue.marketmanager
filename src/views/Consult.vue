<template>
  <div>
    <div class="d-flex justify-content-start align-items-center">
      <div>
        <h4 class="page-title">Consultar</h4>
        <span class="page-subtitle">Consulte um produto</span>
      </div>
    </div>

    <div class="page-content-layout px-4">
      <div class="row">
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Código do produto</label>
          <InputGroup>
            <InputText v-show="!step" v-model="formConsult.cod" type="text" inputmode="numeric"
              placeholder="Digite o código do produto que deseja consultar" />
            <Button v-show="!step" :label="buttonConsult.label" :disabled="buttonConsult.disabled" class="ms-1"
              @click="consult()" />

            <InputText v-show="step" type="text" class="input-readonly" :value="'Buscando por: ' + formConsult.cod" readonly />
            <Button v-show="step" label="Nova consulta" severity="info" class="ms-1" @click="clearConsult()" />
          </InputGroup>
        </div>
      </div>
    </div>

    <div v-if="step" class="row">
      <div class="col-12 col-lg-6">
        <div class="page-content-layout">
          <TableStoresConsult :stores="stores" />
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="page-content-layout">
          <TableCouponsConsult :coupons="coupons" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { consultPriceAndAmountHook } from '@/hooks/consultHooks'
import TableStoresConsult from '@/components/consult/TableStoresConsult.vue'
import TableCouponsConsult from '@/components/consult/TableCouponsConsult.vue'

export default {
  name: 'Consult',

  components: {
    TableStoresConsult,
    TableCouponsConsult
  },

  data() {
    return {
      stores: [],
      coupons: [],
      step: false,

      formConsult: {
        cod: ''
      },

      buttonConsult: {
        label: 'Consultar',
        disabled: false
      }
    }
  },

  methods: {
    async consult() {
      this.buttonConsult.label = 'Consultando...'
      this.buttonConsult.disabled = true

      this.stores = []
      this.coupons = []

      const response = await consultPriceAndAmountHook(this.formConsult)

      if (response.status == 200) {
        this.stores = response.data.stores
        this.coupons = response.data.coupons
        this.step = true
        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Consulta realizada com sucesso!', life: 3000 })
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonConsult.label = 'Consultar'
      this.buttonConsult.disabled = false
    },

    clearConsult() {
      this.formConsult.cod = ''
      this.step = false
    }
  },

  created() {
  }
}
</script>
  
<style lang="scss" scoped></style>