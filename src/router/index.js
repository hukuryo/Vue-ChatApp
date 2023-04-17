import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
