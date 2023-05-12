import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  // メッセージ一覧ページ
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  // メッセージ編集ページ
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditView.vue'),
    meta: { requiresAuth: true }
  },
  // ログインページ
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  // ユーザー登録ページ
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue')
  },
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
      })
    } else {
      next()
    }
  } else {
    if (store.getters.loggedIn && to.path === '/login') {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
})

export default router
