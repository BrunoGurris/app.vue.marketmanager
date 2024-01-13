<template>
  <div>
    <Dialog v-model:visible="visible" :header="'Estoque [' + store.name + ']'" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" position="top" :draggable="false">

      <div v-if="step == true">
        <FileUpload chooseLabel="Selecionar" uploadLabel="Enviar" :showUploadButton="true" :showCancelButton="false"
          :multiple="false" :fileLimit="1" cancelLabel="Cancelar" :previewWidth="150" accept=".csv,.xlsx"
          :maxFileSize="50000" :customUpload="true" @uploader="onUpload">
          <template #empty>
            <p class="text-center">Faça o upload do .xlsx ou .csv (Excel)</p>
          </template>
        </FileUpload>
      </div>
      <div v-else>
        <TableItemsStore :items="items" :loading="loading" />
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
import TableItemsStore from './TableItemsStore.vue'
import { storeItemsListHook } from '@/hooks/storeHooks'

export default {
  name: 'ModalStockStore',

  props: ['stores'],

  components: {
    TableItemsStore,
  },

  data() {
    return {
      store: {},
      items: [],

      visible: false,
      step: false,
      loading: false

      // buttonDeleteStore: {
      //   label: 'Excluir',
      //   disabled: false
      // }
    }
  },

  methods: {
    async listItems(id) {
      this.items = []
      this.loading = true
      
      const response = await storeItemsListHook(id)

      if (response.status == 200) {
        this.items = response.data
        this.loading = false
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    onUpload(event) {
      console.log(event.files[0])
    },

    openModal(store) {
      this.store = store
      this.listItems(store.id)
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