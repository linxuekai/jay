import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlayList from '../views/PlayList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:zjName',
    name: 'PlayList',
    component: PlayList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
