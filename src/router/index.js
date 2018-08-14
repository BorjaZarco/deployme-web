import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import deploy from '@/components/deploy'
import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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
