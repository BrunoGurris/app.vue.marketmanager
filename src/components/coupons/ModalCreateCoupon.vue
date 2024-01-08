<template>
  <div>
    <Dialog v-model:visible="visible" header="Adicionar cupom" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <div class="row">
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Chave de acesso (Cupom SAT)</label>
          <InputGroup>
            <InputText v-model="formCreateCoupon.key" type="text"
              placeholder="Digite, scaneie o código de barras ou o QR Code do cupom" maxlength="44" class="w-100" />
            <Button icon="bi bi-qr-code" class="ms-1" @click="openModalReadQrCode()" />
            <Button icon="bi bi-upc" class="ms-1 fs-3" @click="openModalReadQrCode()" />
          </InputGroup>
        </div>
      </div>

      <template #footer>
        <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        <Button :label="buttonCreateCoupon.label" :disabled="buttonCreateCoupon.disabled" @click="createCoupon()" />
      </template>
    </Dialog>

    <ModalReadQrCode ref="modalReadQrCode" @setKey="setKey" />
  </div>
</template>

<script>
import { couponCreateHook } from '@/hooks/couponHooks'
import ModalReadQrCode from '@/components/reads/ModalReadQrCode.vue'

export default {
  name: 'ModalCreateCoupon',

  props: ['coupons'],

  components: {
    ModalReadQrCode
  },

  data() {
    return {
      visible: false,

      formCreateCoupon: {
        key: '35231106057223053704590012134230420798919903'
      },

      buttonCreateCoupon: {
        label: 'Adicionar',
        disabled: false
      },
    }
  },

  methods: {
    async createCoupon() {
      this.buttonCreateCoupon.label = 'Adicionando...'
      this.buttonCreateCoupon.disabled = true

      const response = await couponCreateHook(this.formCreateCoupon)

      if (response.status == 201) {
        this.coupons.unshift(response.data)
        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cupom cadastrado com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.clearFields()
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonCreateCoupon.label = 'Adicionar'
      this.buttonCreateCoupon.disabled = false
    },

    openModalReadQrCode() {
      this.$refs.modalReadQrCode.openModal()
    },

    setKey(key) {
      this.formCreateCoupon.key = key
    },

    openModal() {
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.formCreateCoupon.key = ''
    }
  },

  watch: {
    visible() {
      if (!this.visible) {
        this.clearFields()
      }
    },
  }
}
</script>

<style lang="scss" scoped></style>