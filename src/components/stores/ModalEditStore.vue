<template>
  <div>
    <Dialog
      v-model:visible="visible"
      header="Editar loja"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :modal="true"
      position="top"
      :draggable="false"
    >
      <div class="col-12 mb-3">
        <label class="form-label m-0 w-100">Nome</label>
        <InputText v-model="formEditStore.name" type="text" placeholder="Informe o nome da loja" class="w-100" />
      </div>
      <template #footer>
        <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        <Button :label="buttonEditStore.label" :disabled="buttonEditStore.disabled" @click="editStore(store.id)" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { storeEditHook } from '@/hooks/storeHooks'

export default {
  name: 'ModalEditStore',

  props: ['stores'],

  data() {
    return {
      store: {},
      visible: false,

      formEditStore: {
        name: ''
      },

      buttonEditStore: {
        label: 'Editar',
        disabled: false
      }
    }
  },

  methods: {
    async editStore(id) {
      this.buttonEditStore.label = 'Editando...'
      this.buttonEditStore.disabled = true

      const response = await storeEditHook(this.formEditStore, id)

      if (response.status == 200) {
        const index = this.stores.findIndex(obj => obj.id === response.data.id)
        this.stores[index] = response.data

        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja editada com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonEditStore.label = 'Editar'
      this.buttonEditStore.disabled = false
    },

    openModal(store) {
      this.store = store
      this.formEditStore.name = store.name
      this.visible = true
    },

    closeModal() {
      this.visible = false
    }
  }
}
</script>

<!-- <script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { storeCreateHook } from '@/hooks/StoreHooks';
import { type StoreCreateInterface } from '@/interfaces/StoreInterfaces';
import type { AxiosResponse } from 'axios';

export default defineComponent({
  data() {
    return {
      visible: ref(false),

      storeCreate: reactive<StoreCreateInterface>({
        name: ''
      }),

      buttons: {
        buttonCreateStore: {
          label: 'Adicionar',
          disabled: false
        }
      }
    }
  },

  methods: {
    async handleStoreCreate() {
      this.buttons.buttonCreateStore.label = 'Adicionando...'
      this.buttons.buttonCreateStore.disabled = true

      const response = await storeCreateHook(this.storeCreate) as AxiosResponse

      if (response.status == 201) {
        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja adicionada com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttons.buttonCreateStore.label = 'Adicionar'
      this.buttons.buttonCreateStore.disabled = false
    },

    openModal() {
      this.visible = true
    },

    closeModal() {
      this.visible = false
    },

    clearFields() {
      this.storeCreate.name = ''
    }
  },

  watch: {
    visible() {
      if (!this.visible) {
        this.clearFields()
      }
    }
  }
})
</script> -->

<style lang="scss" scoped></style>