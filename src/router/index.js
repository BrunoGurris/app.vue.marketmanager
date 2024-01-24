import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/layouts/Layout.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Coupons from '../views/Coupons.vue'
import Expenses from '../views/Expenses.vue'
import Sales from '../views/Sales.vue'
import Stores from '../views/Stores.vue'
import Consult from '../views/Consult.vue'
import Compare from '../views/Compare.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/cupons',
          name: 'Coupons',
          component: Coupons
        },
        {
          path: '/despesas',
          name: 'Expenses',
          component: Expenses
        },
        {
          path: '/faturamento',
          name: 'Sales',
          component: Sales
        },
        {
          path: '/lojas',
          name: 'Stores',
          component: Stores
        },
        {
          path: '/consultar',
          name: 'Consult',
          component: Consult
        },
        {
          path: '/comparar',
          name: 'Compare',
          component: Compare
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router