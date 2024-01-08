<template>
  <div v-if="visible" id="background-qrcode">
    <div class="d-flex justify-content-between align-items-center" id="header-qrcode">
      <h4 class="m-0">Leitor de QR Code</h4>
      <Button label="Fechar" severity="danger" @click="closeModal()" class="ms-auto" />
    </div>
    <div class="center stream">
      <qrcode-stream @detect="onDecode">
        <div style="color: red;" class="frame"></div>
      </qrcode-stream>
    </div>
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
  
<style lang="scss" scoped>
#background-qrcode {
  width: 100%;
  height: 100vh;
  position: fixed;

  top: 0;
  left: 0;

  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}

.stream {
  width: 100%;
  height: 100vh;
}

#header-qrcode {
  width: 100%;

  color: white;
  padding: 10px;

  z-index: 9999;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>