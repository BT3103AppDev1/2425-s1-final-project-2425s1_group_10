import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/components/Login.vue";
import RegisterView from "@/views/Register.vue";
import ResetPasswordView from "@/components/ResetPassword.vue"; 
import HomeView from "@/views/Home.vue";
import MainDashboard from '@/views/MainDashboard.vue';

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/reset-password", 
    component: ResetPasswordView,
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: '/dashboard', 
    component: MainDashboard, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
