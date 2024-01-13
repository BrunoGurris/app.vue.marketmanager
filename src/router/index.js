import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/layouts/Layout.vue'
import Login from '../views/Login.vue'
import Coupons from '../views/Coupons.vue'
import Stores from '../views/Stores.vue'
import Consult from '../views/Consult.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      children: [
        {
          path: '/cupons',
          name: 'Coupons',
          component: Coupons
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