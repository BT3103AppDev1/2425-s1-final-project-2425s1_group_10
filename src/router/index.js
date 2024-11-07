import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/components/Login.vue";
import RegisterView from "@/views/Register.vue";
import ResetPasswordView from "@/components/ResetPassword.vue"; 
import MainDashboard from '@/views/MainDashboard.vue';
import NotFound from "@/views/NotFound.vue";
import SalesPage from "@/views/SalesPage.vue";
import HelpPage from "@/views/HelpPage.vue";

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
    path: '/dashboard', 
    component: MainDashboard, 
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: "/sales",
    component: SalesPage,
  },
  {
    path: "/help",
    component: HelpPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
