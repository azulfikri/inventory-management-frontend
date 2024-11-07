import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
const routes = [
  {
    path: '/admin/:component',
    name: 'admin',
    component: AdminView,
    props: true,
  },
  {
    path: '/user/:component',
    name: 'user',
    component: UserView,
    props: true,
  },
  {
    path: '/',
    redirect: {'name': 'admin', params: {component: 'items'}}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
