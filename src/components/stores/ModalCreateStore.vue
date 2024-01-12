<template>
  <div>
    <Dialog
      v-model:visible="visible"
      header="Adicionar loja"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :modal="true"
      position="top"
      :draggable="false"
    >
      <div class="col-12 mb-3">
        <label class="form-label m-0 w-100">Nome</label>
        <InputText v-model="formCreateStore.name" type="text" placeholder="Informe o nome da loja" class="w-100" />
      </div>
      <template #footer>
        <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        <Button :label="buttonCreateStore.label" :disabled="buttonCreateStore.disabled" @click="storeCreate()" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { storeCreateHook } from '@/hooks/storeHooks'

export default {
  name: 'ModalCreateStore',

  props: ['stores'],

  data() {
    return {
      visible: false,

      formCreateStore: {
        name: ''
      },

      buttonCreateStore: {
        label: 'Adicionar',
        disabled: false
      }
    }
  },

  methods: {
    async storeCreate() {
      this.buttonCreateStore.label = 'Adicionando...'
      this.buttonCreateStore.disabled = true

      const response = await storeCreateHook(this.formCreateStore)

      if (response.status == 201) {
        this.stores.unshift(response.data)
        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja adicionada com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonCreateStore.label = 'Adicionar'
      this.buttonCreateStore.disabled = false
    },

    openModal() {
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.formCreateStore.name = ''
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