import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClienteView from '../views/cliente/ClienteView.vue'
import PrestamoView from '../views/prestamo/PrestamoView.vue'
import InteresView from '../views/interes/InteresView.vue'
import PagosView from '../views/pagos/PagosView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClienteView
  },
  {
    path: '/prestamo',
    name: 'prestamo',
    component: PrestamoView
  },
  {
    path: '/interes',
    name: 'interes',
    component: InteresView
  },
  ,
  {
    path: '/pago_prestamo/:id',
    name: 'pago_prestamo',
    component: PagosView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_API_URL),
  routes
})

export default router
