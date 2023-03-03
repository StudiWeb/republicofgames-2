import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import TheAdmin from '../views/admin/TheAdmin.vue'
import NewGame from '../views/admin/NewGame.vue'
import SystemRequirements from '../views/admin/SystemRequirements.vue'
import GameCover from '../views/admin/GameCover.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: null },
    { name: 'login', path: '/login', component: LoginPage },
    {
      name: 'admin',
      path: '/admin',
      component: TheAdmin,
      children: [
        { name: 'new-game', path: 'new-game', component: NewGame },
        { name: 'system-requirements', path: 'system-requirements', component: SystemRequirements },
        { name: 'game-cover', path: 'cover', component: GameCover }
      ]
    }
  ]
})

export default router
