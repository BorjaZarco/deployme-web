import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import deploy from '@/components/deploy'
import services from '@/components/services'
import login from '@/components/login'
import signup from "@/components/signup";
const axios = require('axios');


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/services',
      name: 'services',
      component: services,
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: deploy,
      meta: { requiresAuth: true }
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

function checkLog(){
  const config = {
    headers: {
      authorization : localStorage.token 
    }
  }
  return axios.get('http://localhost:5000/api/login' ,config)
  .then(res => {
    return true
    
  }).catch( err => {
    return false
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await checkLog()){
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
});



export default router;