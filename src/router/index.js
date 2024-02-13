
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/supabase';
import store from "../store/store";
const routes = [
  {
    path: '/',
    component: () => import('../components/Main-compoent.vue'),
    children: [
      {
        path: '', // Default route
        redirect: 'school' // Redirect to the 'school' route
      },
      {
        path: '/:pathMatch(.*)*', // Catch-all route for handling not found routes
        name: 'NotFound',
        component: () => import('../components/content/PageNotFound.vue'),
      },
      {
        path: 'school',
        name: 'school',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/School.vue'),
      },
      {
        path: 'department',
        redirect: '/department/list',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/department/DepartmentLayout.vue'), // Add a layout component for department routes
        children: [
          {
            path: 'list', 
            component: () => import('../components/content/department/DepartmentList.vue'),
          },
          {
            path: 'add', 
            component: () => import('../components/content/department/DepartmentAdd.vue'),
          },
        ]
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/Login.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})
console.log('router',router)
router.beforeEach(async (to, from, next) => {
  // console.log('Before each guard triggered');
  // console.log('From:', from);
  // console.log('To:', to);
  const redirectedRoute = to?.redirectedFrom?.fullPath || from.fullPath
  const { data: { session } } = await supabase.auth.getSession();
  const isAuthenticated = !!session;
  store.commit("setRedirectedFrom", redirectedRoute);
  console.log('isAuthenticated', isAuthenticated)
  if (to.meta.requireAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }

});


export default router
