<template>
  <div>
    <Dialog v-model:visible="visible" header="Adicionar cupom" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <div v-if="step == 1" class="row">
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Chave de acesso (Cupom SAT)</label>
          <InputGroup>
            <InputText v-model="formConsultCoupon.key" type="text"
              placeholder="Digite, scaneie o código de barras ou o QR Code do cupom" maxlength="44" class="w-100" />
            <Button v-if="formConsultCoupon.key == ''" icon="bi bi-qr-code" class="ms-1" @click="openModalReadQrCode()" />
          </InputGroup>
          <Button class="ms-1 w-100 mt-2" :label="buttonConsultCoupon.label"
            :disabled="buttonConsultCoupon.disabled || formConsultCoupon.key.length != 44" @click="consultCoupon()" />
        </div>
      </div>

      <div v-if="step == 2">
        <Divider align="center">
          <b>Lojas</b>
        </Divider>

        <div v-for="(store, n) in formCreateCoupon.stores" class="row mt-2 mb-3">
          <div class="col-2 col-lg-1 mb-1">
            <label class="form-label m-0 w-100"></label>
            <Button icon="bi bi-x-lg" severity="danger" class="w-100" :disabled="n == 0" @click="removeStore(n)" />
          </div>

          <div class="col-10 col-lg-6 mb-1">
            <label class="form-label m-0 w-100">Loja</label>
            <Dropdown v-model="store.id" :options="stores" optionLabel="name" placeholder="Selecione a loja"
              class="w-100" />
          </div>

          <div class="col-12 col-lg-5 mb-1">
            <label class="form-label m-0 w-100">Valor</label>
            <InputNumber v-model="store.value" mode="currency" currency="BRL" locale="pt-BR" :minFractionDigits="2"
              :maxFractionDigits="2" class="w-100" />
          </div>
        </div>
        
        <div class="row">
          <div class="col-12 mb-3 d-flex justify-content-end">
            <Button label="Adicionar loja" severity="info" @click="addStore()" />
          </div>
        </div>

        <Divider align="center">
          <b>Informações</b>
        </Divider>

        <div class="row mt-2">
          <div class="col-12 mb-3">
            <label class="form-label m-0 w-100">Chave de acesso</label>
            <InputText v-model="formCreateCoupon.coupon.key" type="text" class="w-100 input-readonly" readonly />
          </div>

          <div class="col-12 col-lg-4 mb-3">
            <label class="form-label m-0 w-100">Nº do cupom</label>
            <InputText v-model="formCreateCoupon.coupon.number" type="text" class="w-100 input-readonly" readonly />
          </div>

          <div class="col-12 col-lg-4 mb-3">
            <label class="form-label m-0 w-100">Data da compra</label>
            <InputText v-model="formCreateCoupon.coupon.date" type="text" class="w-100 input-readonly" readonly />
          </div>

          <div class="col-12 col-lg-4 mb-3">
            <label class="form-label m-0 w-100">Valor</label>
            <InputText v-model="formCreateCoupon.coupon.value" type="text" class="w-100 input-readonly" readonly />
          </div>
        </div>

        <Divider align="center">
          <b>Estabelecimento</b>
        </Divider>

        <div class="row">
          <div class="col-12 col-lg-6 mb-3">
            <label class="form-label m-0 w-100">Nome</label>
            <InputText v-model="formCreateCoupon.company.name" type="text" class="w-100 input-readonly" readonly />
          </div>

          <div class="col-12 col-lg-6 mb-3">
            <label class="form-label m-0 w-100">CNPJ</label>
            <InputText v-model="formCreateCoupon.company.cnpj" type="text" class="w-100 input-readonly" readonly />
          </div>

          <div class="col-12 mb-3">
            <label class="form-label m-0 w-100">Endereço</label>
            <InputText v-model="formCreateCoupon.company.address" type="text" class="w-100 input-readonly" readonly />
          </div>

          <div class="col-12 col-lg-6 mb-3">
            <label class="form-label m-0 w-100">Bairro</label>
            <InputText v-model="formCreateCoupon.company.neighborhood" type="text" class="w-100 input-readonly"
              readonly />
          </div>

          <div class="col-12 col-lg-6 mb-3">
            <label class="form-label m-0 w-100">Cidade</label>
            <InputText v-model="formCreateCoupon.company.city" type="text" class="w-100 input-readonly" readonly />
          </div>
        </div>

        <Divider align="center" type="dotted">
          <b>Produtos ({{ formCreateCoupon.items.length }})</b>
        </Divider>

        <div v-for="(item, n) in formCreateCoupon.items" :key="n" class="row mt-3 border-bottom pb-3">
          <div class="col-12">
            <div><b>Cod:</b> {{ item.cod }}</div>
            <div><b>Descricão:</b> {{ item.description }}</div>
            <div><b>Quantidade:</b> {{ item.amount }}</div>
            <div><b>Unidade:</b> {{ item.unit }}</div>
            <div><b>Valor unitário:</b> {{ item.valueUnit }}</div>
            <div><b>Valor total:</b> {{ item.value }}</div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="mt-2">
          <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        </div>
      </template>
    </Dialog>

    <ModalReadQrCode ref="modalReadQrCode" @setKey="setKey" />
  </div>
</template>

<script>
import { couponConsultHook } from '@/hooks/couponHooks'
import { storeListHook } from '@/hooks/storeHooks'
import ModalReadQrCode from '@/components/reads/ModalReadQrCode.vue'

export default {
  name: 'ModalCreateCoupon',

  components: {
    ModalReadQrCode
  },

  data() {
    return {
      visible: false,
      stores: [],
      step: 1,

      formConsultCoupon: {
        key: '35231106057223053704590012134230420798919903'
      },

      formCreateCoupon: {
        coupon: {
          key: '',
          number: '',
          date: '',
          cpf: '',
          value: ''
        },
        company: {
          cnpj: '',
          name: '',
          address: '',
          neighborhood: '',
          city: ''
        },
        items: [],
        stores: [{
          id: '',
          value: null
        }]
      },

      buttonConsultCoupon: {
        label: 'Consultar',
        disabled: false
      },
    }
  },

  methods: {
    async consultCoupon() {
      this.buttonConsultCoupon.label = 'Consultando...'
      this.buttonConsultCoupon.disabled = true

      const response = await couponConsultHook(this.formConsultCoupon)

      if (response.status == 200) {
        this.step = 2
        this.formCreateCoupon = response.data
        this.formCreateCoupon.stores = [{
          id: '',
          value: response.data.coupon.value
        }]
        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Consulta realizada com sucesso!', life: 3000 })
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonConsultCoupon.label = 'Consultar'
      this.buttonConsultCoupon.disabled = false
    },

    async listStores() {
      const response = await storeListHook()

      if (response.status == 200) {
        this.stores = []
        response.data.forEach(store => {
          this.stores.push({
            name: store.name,
            code: store.id
          })
        })
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    addStore() {
      this.formCreateCoupon.stores.push({
        id: '',
        value: null
      })
    },

    removeStore(index) {
      this.formCreateCoupon.stores.splice(index, 1)
    },

    openModalReadQrCode() {
      this.$refs.modalReadQrCode.openModal()
    },

    setKey(key) {
      this.formConsultCoupon.key = key
    },

    openModal() {
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.step = 1
      this.formConsultCoupon.key = ''

      this.formCreateCoupon = {
        coupon: {
          key: '',
          number: '',
          date: '',
          cpf: '',
          value: ''
        },
        company: {
          cnpj: '',
          name: '',
          address: '',
          neighborhood: '',
          city: ''
        },
        items: [],
        stores: [{
          id: '',
          value: null
        }]
      }
    }
  },

  watch: {
    visible() {
      if (!this.visible) {
        this.clearFields()
      }
    },
  },

  created() {
    this.listStores()
  }
}
</script>

<style lang="scss" scoped></style>