<template>
  <div>
    <Dialog
      v-model:visible="visible"
      header="Excluir loja"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :modal="true"
      position="top"
      :draggable="false"
    >
      <div class="col-12 mb-3">
        Você realmente deseja excluir a loja <b>{{ store.name }}</b>?
      </div>
      <template #footer>
        <Button label="Fechar" severity="secondary" class="me-2" @click="closeModal()" />
        <Button :label="buttonDeleteStore.label" :disabled="buttonDeleteStore.disabled" severity="danger" @click="deleteStore(store.id)" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { storeDeleteHook } from '@/hooks/storeHooks'

export default {
  name: 'ModalDeleteStore',

  props: ['stores'],

  data() {
    return {
      store: {},
      visible: false,

      buttonDeleteStore: {
        label: 'Excluir',
        disabled: false
      }
    }
  },

  methods: {
    async deleteStore(id) {
      this.buttonDeleteStore.label = 'Excluindo...'
      this.buttonDeleteStore.disabled = true

      const response = await storeDeleteHook(id)

      if (response.status == 200) {
        const index = this.stores.findIndex(obj => obj.id === response.data.id)
        this.stores.splice(index, 1)

        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja excluída com sucesso!', life: 3000 })
        this.closeModal()
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonDeleteStore.label = 'Excluir'
      this.buttonDeleteStore.disabled = false
    },

    openModal(store) {
      this.store = store
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