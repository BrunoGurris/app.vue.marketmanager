<template>
  <div>
    <Dialog v-model:visible="visible" :header="'Estoque [' + store.name + ']'" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <div v-if="step == true">
        <FileUpload chooseLabel="Selecionar" uploadLabel="Enviar" :showUploadButton="true" :showCancelButton="false"
          :multiple="false" :fileLimit="1" cancelLabel="Cancelar" :previewWidth="150" accept=".csv,.xlsx"
          :maxFileSize="1000000" :customUpload="true" @uploader="onAdvancedUpload">
          <template #empty>
            <p class="text-center">Faça o upload do .xlsx ou .csv (Excel)</p>
          </template>
        </FileUpload>
      </div>
      <div v-else>
        asdasdas
      </div>

      <template #footer>
        <div class="d-flex justify-content-between">
          <Button :label="step ? 'Voltar para listagem' : 'Atualizar estoque'" severity="info" @click="step = !step" />
          <Button label="Fechar" severity="secondary" @click="closeModal()" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalStockStore',

  props: ['stores'],

  data() {
    return {
      store: {},
      visible: false,
      step: false,

      buttonDeleteStore: {
        label: 'Excluir',
        disabled: false
      }
    }
  },

  methods: {
    onAdvancedUpload(event) {
      console.log(event.files[0])
    },

    openModal(store) {
      this.store = store
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.step = false
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