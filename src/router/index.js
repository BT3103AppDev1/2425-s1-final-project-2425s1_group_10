import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const requireAuth = (to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // User is not logged in, redirect to login
      alert('You must be logged in to access this page');
      next('/login');
    } else {
      // User is logged in, allow access to the route
      next();
    }
  });
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
      meta: { requiresAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: "/register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
    },
  ],
});

export default router;