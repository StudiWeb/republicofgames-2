import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import TheAdmin from '../views/admin/TheAdmin.vue'
import NewGame from '../views/admin/NewGame.vue'
import SystemRequirements from '../views/admin/SystemRequirements.vue'
import TheCover from '../views/admin/TheCover.vue'
import ReleaseDate from '../views/admin/ReleaseDate.vue'
import TheDescription from '../views/admin/TheDescription.vue'
import ThePegi from '../views/admin/ThePegi.vue'
import TheScreens from '../views/admin/TheScreens.vue'
import TheTrailer from '../views/admin/TheTrailer.vue'
import GameList from '../views/admin/GameList.vue'
import GameInfo from '../views/admin/GameInfo.vue'

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
        { name: 'cover', path: 'cover', component: TheCover },
        { name: 'release-date', path: 'release-date', component: ReleaseDate },
        { name: 'description', path: 'description', component: TheDescription },
        { name: 'pegi', path: 'pegi', component: ThePegi },
        { name: 'screens', path: 'screens', component: TheScreens },
        { name: 'trailer', path: 'trailer', component: TheTrailer },
        { name: 'game-list', path: 'game-list', component: GameList },
        { name: 'game-info', path: 'game-info', component: GameInfo }
      ]
    }
  ]
})

export default router
