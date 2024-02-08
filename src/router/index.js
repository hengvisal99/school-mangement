
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
router.beforeEach((to, from, next) => {
  console.log('form',from)
  console.log('to',to)
  console.log('redirectedFrom',to?.redirectedFrom?.fullPath)
  store.commit("setRedirectedFrom", to?.redirectedFrom?.fullPath);
  if (to.meta.requireAuth && !store.getters.isAuth) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router
