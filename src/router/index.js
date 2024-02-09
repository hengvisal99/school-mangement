
import { createRouter, createWebHistory } from 'vue-router'
import SchoolComponent from '../components/right-content/School.vue';
import TeacherComponent from '../components/right-content/Teacher.vue';
import CourseComponent from '../components/right-content/Courses.vue';
import LoginComponent from '../components/login/Login.vue';
import { supabase } from '../supabase/supabase';
import store from "../store/store";
const routes = [
  {
    path: '/',
    component: () => import('../components/Main-compoent.vue'),
    meta: {
      requireAuth: true
    },

    children: [
      {
        path: '', // This is the default route
        redirect: 'school' // Redirect to the 'school' route
      },
      {
        path: 'school',
        component: SchoolComponent,
        name: 'school',
        meta: {
          requireAuth: true
        },
      },
      {
        path: 'teacher',
        component: TeacherComponent,
        meta: {
          requireAuth: true
        },
      },
      {
        path: 'course',
        name: 'course',
        component: CourseComponent,
        meta: {
          requireAuth: true
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

router.beforeEach(async (to, from, next) => {
  // console.log('Before each guard triggered');
  // console.log('From:', from);
  // console.log('To:', to);
  const redirectedRoute = to?.redirectedFrom?.fullPath || from.fullPath 
  const { data : {session} } = await supabase.auth.getSession();
  const isAuthenticated = !!session;
  store.commit("setRedirectedFrom", redirectedRoute);
  if (to.meta.requireAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
  
});


export default router
