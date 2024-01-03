<template>
  <div>
    <div class="d-flex justify-content-end align-items-center">
      <Button @click="openModalCreateStore()" label="Adicionar" rounded />
    </div>
    <div id="pageContent">
      asdasdasd
    </div>
  </div>
</template>

<script>
export default {
  name: 'Coupon',

  components: {
  },

  data() {
    return {
    }
  },

  methods: {
  },

  created() {
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