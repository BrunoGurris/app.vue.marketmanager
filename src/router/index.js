import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/layouts/Layout.vue'
import Login from '../views/Login.vue'
import Stores from '../views/Stores.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      children: [
        {
          path: '/lojas',
          name: 'Stores',
          component: Stores
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