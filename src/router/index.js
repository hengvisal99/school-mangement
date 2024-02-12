
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
      // Other routes...
      {
        path: 'department',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/department/DepartmentList.vue'), // Add a layout component for department routes
        children: [
          {
            path: '', // Default route for department layout
            redirect: 'list' // Redirect to the department list
          },
          {
            path: 'list', // Child route for the department list
            component: () => import('../components/content/department/DepartmentList.vue'),
            name: 'department-list',
          },
          {
            path: 'add', // Child route for the department list
            component: () => import('../components/content/department/DepartmentAdd.vue'),
            name: 'department-add',
          },
          // Add other child routes as needed (e.g., 'add' route)
        ]
      },
    ],
  },
  // Other top-level routes...
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})
console.log('router',router)
// router.beforeEach(async (to, from, next) => {
//   // console.log('Before each guard triggered');
//   // console.log('From:', from);
//   // console.log('To:', to);
//   const redirectedRoute = to?.redirectedFrom?.fullPath || from.fullPath
//   const { data: { session } } = await supabase.auth.getSession();
//   const isAuthenticated = !!session;
//   store.commit("setRedirectedFrom", redirectedRoute);
//   console.log('isAuthenticated', isAuthenticated)
//   if (to.meta.requireAuth && !isAuthenticated) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }

// });


export default router
