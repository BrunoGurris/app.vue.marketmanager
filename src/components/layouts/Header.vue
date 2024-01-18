<template>
  <div>
    <div id="header" class="d-flex justify-content-between align-items-center">
      <div>
        <img id="sidebar-logo" src="@/assets/images/logo2.png" width="170" height="40" class="ms-3">
      </div>
      <div>
        <i id="button-menu-header" @click="visible = true" class="bi bi-justify"></i>
      </div>
    </div>

    <Sidebar v-model:visible="visible">
      <template #header>
        <img src="@/assets/images/logo2.png" width="180" height="45">
      </template>
      <Menu @changePage="visible = false" />
    </Sidebar>
  </div>
</template>

<script>
import Menu from './Menu.vue'

export default {
  name: 'Header',

  components: {
    Menu
  },

  data() {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 60px;

  background: $green;

  @media (max-width: 991.98px) {
    left: 0;
    top: 0;
    position: fixed;
    z-index: 10;
    display: flex !important;
  }

  @media (min-width: 992px) {
    display: none !important;
  }
}

#button-menu-header {
  font-size: 30px;
  color: $white;

  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
}
</style>