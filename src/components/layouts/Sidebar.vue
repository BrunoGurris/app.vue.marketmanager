<template>
  <div id="sidebar">
    <div class="d-flex justify-content-center">
      <img id="sidebar-logo" src="@/assets/images/logo2.png" width="180" height="45">
    </div>

    <div class="sidebar-menu" v-for="(menuGroup, index) in menuGroups" :key="index">
      <div class="sidebar-menu-title">{{ menuGroup.title }}</div>
      <div @click="$router.push(item.route)" class="sidebar-menu-item" v-for="(item, idx) in menuGroup.items" :key="idx">
        <i :class="item.icon" class="sidebar-menu-item-icon"></i>{{ item.page }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  data() {
    return {
      menuGroups: [
        {
          title: 'Menu',
          items: [{
            page: 'Dashboard',
            icon: 'bi bi-grid',
            route: '/'
          },
          {
            page: 'Cupons',
            icon: 'bi bi-receipt',
            route: '/cupons'
          },
          {
            page: 'Lojas',
            icon: 'bi bi-shop-window',
            route: '/lojas'
          }]
        },
        {
          title: 'Funções',
          items: [{
            page: 'Consultar preço',
            icon: 'bi bi-search',
            route: '/consulta-preco'
          },
          {
            page: 'Comparação',
            icon: 'bi bi-shuffle',
            route: '/comparacao'
          }]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  background: $green;
  overflow: auto;

  #sidebar-logo {
    margin-top: 30px;
  }

  .sidebar-menu {
    width: 100%;
    margin-top: 30px;

    .sidebar-menu-title {
      height: 60px;

      display: flex;
      align-items: center;

      color: $white;
      font-weight: bold;
      font-size: 16px;
      padding-left: 20px;
    }

    .sidebar-menu-item {
      height: 50px;

      display: flex;
      align-items: center;

      color: $white;
      padding-left: 35px;

      &:hover {
        font-weight: bold;
      }

      &:hover {
        transition: 0.5s;
        padding-left: 40px;
        background: $green-hover;
        cursor: pointer;
      }

      .sidebar-menu-item-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>