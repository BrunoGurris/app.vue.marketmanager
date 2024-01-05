<template>
  <div id="layout" class="d-flex">
    <Sidebar />

    <div id="layout-content">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'

export default {
  components: {
    Header,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
#layout {
  width: 100%;
  height: 100vh;
}

#layout-content {
  @media (max-width: 991.98px) {
    width: 100%;
    margin-left: 0px;
  }

  @media (min-width: 992px) {
    width: calc(100% - 250px);
    margin-left: 250px;
  }
  
  padding: 20px;
  overflow: auto;
}
</style>