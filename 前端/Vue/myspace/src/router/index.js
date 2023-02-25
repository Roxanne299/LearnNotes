import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserListView from '../views/UserListView.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: UserListView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/userprofile/:userId',
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
