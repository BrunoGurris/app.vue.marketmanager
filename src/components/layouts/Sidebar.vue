<template>
  <div id="sidebar">
    <div class="d-flex justify-content-center">
      <img id="sidebar-logo" src="@/assets/images/logo2.png" width="180" height="45">
    </div>

    <Menu />
  </div>
</template>

<script>
import Menu from './Menu.vue'
export default {
  name: 'Sidebar',

  components: {
    Menu
  },

  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  @media (max-width: 991.98px) {
    display: none;
  }

  width: 250px;
  height: 100vh;
  position: fixed;
  background: $green;
  overflow: auto;

  #sidebar-logo {
    margin-top: 30px;
  }
}
</style>