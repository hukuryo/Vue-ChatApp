import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

// ルーターを初期化する記述
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 認証がない場合にログインページの遷移させる記述
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
          message: true
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
