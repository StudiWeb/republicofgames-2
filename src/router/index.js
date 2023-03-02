import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import TheAdmin from '../views/admin/TheAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: null },
    { name: 'login', path: '/login', component: LoginPage },
    { name: 'admin', path: '/admin', component: TheAdmin }
  ]
})

export default router
