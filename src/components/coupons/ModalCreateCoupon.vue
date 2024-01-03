<template>
  <div>
    <Dialog v-model:visible="visible" header="Adicionar loja" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">
      <div>
        <div class="mb">
          Qr Stream
        </div>
        <div class="center stream">
          <QrcodeStream @detect="onDecode" class="mb">
            <div style="color: red;" class="frame"></div>
          </QrcodeStream>
        </div>
        <div class="result">
          Result: {{ data }}
        </div>
      </div>

      <template #footer>
        <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        <Button :label="buttonCreateStore.label" :disabled="buttonCreateStore.disabled" @click="storeCreate()" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'ModalCreateCoupon',

  components: {
    QrcodeStream
  },

  data() {
    return {
      visible: false,
      data: '',

      buttonCreateStore: {
        label: 'Adicionar',
        disabled: false
      }

    }
  },

  methods: {
    onDecode(data) {
      this.data = data
      console.log(data)
    },

    openModal() {
      this.data = ''
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
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

<style lang="scss" scoped></style>