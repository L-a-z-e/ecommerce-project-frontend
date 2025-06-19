import type {RouteRecordRaw} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // TODO: 다른 라우터 추가
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;