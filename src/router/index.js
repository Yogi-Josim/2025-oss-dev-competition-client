import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UnsubscribePage from '../views/UnsubscribePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/unsubscribe',
    name: 'Unsubscribe',
    component: UnsubscribePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
