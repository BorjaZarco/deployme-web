import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Notifications from 'vue-notification'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(Notifications)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

const axios = require('axios');
function checkLog(){
  const config = {
    headers: {
      authorization : localStorage.token 
    }
  }
  return axios.get('http://54.171.47.46:5000/api/login' ,config)
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


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
