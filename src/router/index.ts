import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/form',
    name: 'RenttingForm',
    component: () => import('@/views/RenttingForm/RenttingForm.vue'),
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('@/views/AdminLogin/AdminLogin.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/rules',
    name: 'Rules',
    component: () => import('@/views/Rules.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
