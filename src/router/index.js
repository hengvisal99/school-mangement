
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
        redirect: 'dashboard' 
      },
      {
        path: 'dashboard',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/dashboard/Dashboard.vue'),
      },
      {
        path: 'course',
        name: 'course',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/Courses.vue'),
      },
      {
        path: 'department',
        redirect: '/department/list',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/department/DepartmentLayout.vue'), 
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
      {
        path: 'teacher',
        redirect: '/teacher/list',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/teacher/TeacherLayout.vue'), 
        children: [
          {
            path: 'list', 
            component: () => import('../components/content/teacher/TeacherList.vue'),
          },
          {
            path: 'add', 
            component: () => import('../components/content/teacher/TeacherAdd.vue'),
          },
        ]
      },
      {
        path: 'role-management',
        redirect: '/role-management/roles',
        meta: {
          requireAuth: true
        },
        component: () => import('../components/content/role-management/RoleManagement.vue'),
        children: [
          {
            path: 'roles', 
            component: () => import('../components/content/role-management/components/Roles.vue'),
          },
          {
            path: 'permissions', 
            component: () => import('../components/content/role-management/components/Permissions.vue'),
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
  {
    path: '/:pathMatch(.*)*', // Catch-all route for handling not found routes
    name: 'NotFound',
    meta: {
      requireAuth: true
    },
    component: () => import('../components/page-error/PageNotFound.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})
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
