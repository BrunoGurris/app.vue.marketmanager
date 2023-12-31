<template>
  <div>
    <div class="d-flex justify-content-end align-items-center">
      <Button label="Adicionar" rounded />
    </div>
    <div id="pageContent">
      <TableStores :stores="stores" />
    </div>

    <!-- <ModalCreateStore ref="modalCreateStore" /> -->
  </div>
</template>

<script>
import TableStores from '@/components/stores/TableStores.vue'
import { storeListHook } from '@/hooks/storeHooks'

export default {
  name: 'Stores',

  components: {
    TableStores
  },

  data() {
    return {
      stores: [],
    }
  },

  methods: {
    async handleListStore() {
      const response = await storeListHook()

      if (response.status == 200) {
        this.stores = response.data
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }
    }
  },

  created() {
    this.handleListStore()
  }
}
</script>

<style lang="scss" scoped>
#pageContent {
  width: 100%;
  background: $white;

  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>