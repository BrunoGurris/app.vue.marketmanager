<template>
  <div>
    <Dialog v-model:visible="visible" header="Adicionar cupom" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <div>
        <div class="col-12 mb-3">
          <label class="form-label m-0 w-100">Chave de acesso (Cupom SAT)</label>
          <InputGroup>
            <InputText v-model="formKeyAccess.key" type="text" placeholder="Digite, scaneie o código de barras ou o QR Code do cupom" maxlength="44" class="w-100" />
            <Button v-if="formKeyAccess.key == ''" icon="bi bi-qr-code" class="ms-1" @click="openModalReadQrCode()" />
          </InputGroup>
          <Button class="ms-1 w-100 mt-2" label="Consultar" :disabled="formKeyAccess.key.length != 44" />
        </div>
      </div>

      <template #footer>
        <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        <Button :label="buttonCreateStore.label" :disabled="buttonCreateStore.disabled" @click="storeCreate()" />
      </template>
    </Dialog>

    <ModalReadQrCode ref="modalReadQrCode" @setKey="setKey" />
  </div>
</template>

<script>
import ModalReadQrCode from '@/components/reads/ModalReadQrCode.vue'

export default {
  name: 'ModalCreateCoupon',

  components: {
    ModalReadQrCode
  },

  data() {
    return {
      visible: false,
      
      formKeyAccess: {
        key: ''
      },

      buttonCreateStore: {
        label: 'Adicionar',
        disabled: false
      }

    }
  },

  methods: {
    openModalReadQrCode() {
      this.$refs.modalReadQrCode.openModal()
    },

    setKey(key) {
      this.formKeyAccess.key = key
    },

    openModal() {
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.formKeyAccess.key = ''
    }
  },

  watch: {
    visible() {
      if (!this.visible) {
        this.clearFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>