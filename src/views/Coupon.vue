<template>
  <div>
    <div class="d-flex justify-content-end align-items-center">
      <Button @click="openModalCreateCoupon()" label="Adicionar" />
    </div>
    <div id="pageContent">
      <ModalCreateCoupon ref="modalCreateCoupon" />
    </div>
  </div>
</template>

<script>
import ModalCreateCoupon from '@/components/coupons/ModalCreateCoupon.vue';

export default {
  name: 'Coupon',

  components: {
    ModalCreateCoupon,
  },

  data() {
    return {
      data: '',
    }
  },

  methods: {
    openModalCreateCoupon() {
      this.$refs.modalCreateCoupon.openModal()
    }
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