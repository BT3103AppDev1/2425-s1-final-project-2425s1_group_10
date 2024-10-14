import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const requireAuth = (to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert('You must be logged in to access this page');
      next('/login'); 
    } else {
      next();
    }
  });
};

const routes = [
  {
    path: "/",
    redirect: "/login", 
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
    beforeEnter: requireAuth, 
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
