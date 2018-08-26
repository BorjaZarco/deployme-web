import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Landing from 'src/components/Dashboard/Views/Landing.vue'
import Deploy from 'src/components/Dashboard/Views/Deploy.vue'
import MyProjects from 'src/components/Dashboard/Views/MyProjects.vue'
import LogIn from 'src/components/Dashboard/Views/LogIn.vue'
import SignUp from 'src/components/Dashboard/Views/SignUp.vue'


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/home/landing'
  },
  {
    path: '/home',
    component: DashboardLayout,
    redirect: '/home/landing',
    children: [
      {
        path: 'landing',
        name: 'Landing',
        component: Landing
      },
      {
        path: 'deploy',
        name: 'Deploy',
        component: Deploy,
        // meta: { requiresAuth: true }
      },
      {
        path: 'my-projects',
        name: 'My Projects',
        component: MyProjects,
        // meta: { requiresAuth: true }
      }     
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
