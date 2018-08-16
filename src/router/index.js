import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import deploy from '@/components/deploy'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: deploy
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
