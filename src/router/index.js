
import { createRouter, createWebHistory } from 'vue-router'
import SchoolComponent from '../components/right-content/School.vue';
import TeacherComponent from '../components/right-content/Teacher.vue';
import CourseComponent from '../components/right-content/Courses.vue';
import LoginComponent from '../components/login/Login.vue';
import { supabase } from '../supabase/supabase';
const routes = [
  {
    path: '/',
    component: () => import('../components/Main-compoent.vue'),
    meta: {
      auth: false
    },

    children: [
      {
        path: 'school',
        component: SchoolComponent,
        meta: {
          auth: true
        },
      },
      {
        path: 'teacher',
        component: TeacherComponent,
        meta: {
          auth: false
        },
      },
      {
        path: 'course',
        component: CourseComponent,
        meta: {
          auth: false
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to.meta.auth)
  if (to.meta.auth) {
    next();
  } else {
    // Check if the current route is already the login page
    if (to.name === 'login') {
      next(); // Prevent infinite loop
    } else {
      next({ name: 'login' }); // Redirect to login for other routes without authentication
    }
  }
});
// router.beforeEach((to, from, next) => {
//   // const store = useStore()
//   console.log('test',to.matched.some(record => record.meta.auth))
//   next()
//   // if (to.matched.some(record => record.meta.requiresAuth)) {
//   //   if (!store.getters.isAuthenticated) {
//   //     next({
//   //       path: '/login',
//   //       query: { redirect: to.fullPath }
//   //     })
//   //   } else {
//   //     next()
//   //   }
//   // } else {
//   //   next()
//   // }
// })

export default router
