import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/transactions',
    component: () => import('../pages/Transactions.vue')
  },
  {
    path: '/loans',
    component: () => import('../pages/Loans.vue')
  },
  {
    path: '/borrowers',
    component: () => import('../pages/Borrowers.vue')
  },
  {
    path: '/products',
    component: () => import('../pages/Products.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router