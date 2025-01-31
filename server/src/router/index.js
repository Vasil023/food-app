import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },

  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateItemsView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/checked',
    name: 'check',
    component: () => import('../views/CheckedItems.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchRecipe.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/search/:id',
    name: 'SearchWithID',
    component: () => import('../views/ResulSearchRecipeId.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Охоронець маршруту для перевірки авторизації
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn()) {
    next({ name: 'register' }) // Перенаправити на сторінку логіну
  } else {
    next()
  }
})

export default router
