<template>
  <div>
    <div class="sidebar-menu" v-for="(menuGroup, index) in menuGroups" :key="index">
      <div class="sidebar-menu-title">{{ menuGroup.title }}</div>
      <div @click="changePage(item.route)" class="sidebar-menu-item" v-for="(item, idx) in menuGroup.items" :key="idx">
        <i :class="item.icon" class="sidebar-menu-item-icon"></i>{{ item.page }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',

  data() {
    return {
      menuGroups: [
        {
          title: 'Menu',
          items: [
            {
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
            }
          ]
        },
        {
          title: 'Funções',
          items: [
            {
              page: 'Consultar',
              icon: 'bi bi-search',
              route: '/consultar'
            },
            {
              page: 'Comparar',
              icon: 'bi bi-shuffle',
              route: '/comparar'
            }
          ]
        },
        {
          title: 'Em Construção',
          items: [
            {
              page: 'Despesas',
              icon: 'bi bi-currency-dollar',
              route: '/despesas'
            },
            {
              page: 'Faturamento',
              icon: 'bi bi-cash-stack',
              route: '/faturamento'
            }
          ]
        }
      ]
    }
  },

  methods: {
    changePage(page) {
      this.$router.push(page)
      this.$emit('changePage')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 100%;
  margin-top: 15px;

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

      margin-right: 5px;
    }
  }
}
</style>