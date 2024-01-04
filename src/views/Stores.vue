<template>
  <div>
    <div class="d-flex justify-content-end align-items-center">
      <Button @click="openModalCreateStore()" label="Adicionar" />
    </div>
    <div id="pageContent">
      <TableStores :stores="stores" :loading="loading" />
    </div>

    <ModalCreateStore :stores="stores" ref="modalCreateStore" />
  </div>
</template>

<script>
import TableStores from '@/components/stores/TableStores.vue'
import ModalCreateStore from '@/components/stores/ModalCreateStore.vue'
import { storeListHook } from '@/hooks/storeHooks'

export default {
  name: 'Stores',

  components: {
    TableStores,
    ModalCreateStore
  },

  data() {
    return {
      stores: [],
      loading: false
    }
  },

  methods: {
    async listStores() {
      this.loading = true
      const response = await storeListHook()

      if (response.status == 200) {
        this.stores = response.data
        this.loading = false
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    },

    openModalCreateStore() {
      this.$refs.modalCreateStore.openModal()
    }
  },

  created() {
    this.listStores()
  }
}
</script>

<style lang="scss" scoped>
#pageContent {
  width: 100%;

  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;

  background: $white;
}
</style>