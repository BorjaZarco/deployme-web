import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import deploy from '@/components/deploy'
import login from '@/components/login'
import signup from "@/components/signup";


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: deploy,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})



export default router;