<template>
  <div id="header" class="d-flex align-items-center">
    <h4 id="header-title">{{ pageName }}</h4>
  </div>
</template>
  
<script>
export default {
  name: 'Header',

  data() {
    return {
      pageName: '',
    }
  },

  methods: {
    getPageName() {
      const routeMapping = {
        '/': 'Dashboard',
        '/lojas': 'Lojas',
      };

      const currentPage = this.$route.path
      const pageName = routeMapping[currentPage]

      this.pageName = pageName
    }
  },

  created() {
    this.getPageName()
  },

  watch: {
    '$route'(to, from) {
      this.getPageName()
    }
  },
}
</script>
  
<style lang="scss" scoped>
#header {
  width: 100%;
  height: 20px;

  margin-bottom: 20px;

  #header-title {
    font-weight: bold;
  }
}
</style>