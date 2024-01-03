<template>
  <div>
    <Dialog v-model:visible="visible" header="Leitor QR Code" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">
      <div>
        <div class="center stream">
          <qrcode-stream @detect="onDecode">
            <div style="color: red;" class="frame"></div>
          </qrcode-stream>
        </div>
      </div>

      <template #footer>
        <div class="mt-2">
          <Button label="Cancelar" severity="secondary" class="me-2" @click="closeModal()" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
  
<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'ModalReadQrCode',

  components: {
    QrcodeStream
  },

  data() {
    return {
      visible: false,

      qrcode: '',

      buttonCreateStore: {
        label: 'Adicionar',
        disabled: false
      }

    }
  },

  methods: {
    onDecode(data) {
      const key = this.formatKey(data[0].rawValue)
      this.setKey(key)
      this.closeModal()
    },

    setKey(key) {
      this.$emit('setKey', key);
    },

    openModal() {
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.qrcode = ''
    },

    formatKey(text) {
      const result = text.match(/^(.*?)\|/);

      if (result) {
        const key = result[1].replace(/\D/g, '')
        return key
      }

      this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possivel ler o QR Code. Faça a leitura de cupons SAT', life: 5000 })
      return ''
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