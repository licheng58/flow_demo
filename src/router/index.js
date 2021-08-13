import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/home')
  },
  {
    path: '/flow',
    name: 'Flow',
    component: () => import('../pages/flow/panel')
  }
]

const router = new VueRouter({
  routes
})

export default router
