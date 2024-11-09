import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/components/Login.vue";
import RegisterView from "@/views/Register.vue";
import ResetPasswordView from "@/components/ResetPassword.vue"; 
import MainDashboard from '@/views/MainDashboard.vue';
import NotFound from "@/views/NotFound.vue";
import SalesPage from "@/views/SalesPage.vue";
import HelpPage from "@/views/HelpPage.vue";
import SuppliersPage from "@/views/SuppliersPage.vue";
import OrdersPage from "@/views/OrdersPage.vue";
import InventoryPage from "@/views/InventoryPage.vue";
import AlertsPage from "@/views/AlertsPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import TermsPage from "@/views/TermsPage.vue";
import PolicyPage from "@/views/PolicyPage.vue";

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
  {
    path: '/suppliers',
    component: SuppliersPage
  },
  {
    path: '/orders',
    component: OrdersPage
  },
  {
    path: '/alerts',
    component: AlertsPage
  },
  {
    path: '/inventory',
    component: InventoryPage
  },
  {
    path: '/settings',
    component: SettingsPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/terms',
    component: TermsPage
  },
  {
    path: '/policy',
    component: PolicyPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
