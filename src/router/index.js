import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue';
import Home from '../views/Home.vue'

Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    params: false,
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/details/:id',
    name: 'Details',
    params: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
