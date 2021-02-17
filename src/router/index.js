import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/item",
    name: "Item",
    component: () => import(/* webpackChunkName: "item" */ "../views/Item.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/terms",
    name: "Terms",
    component: () =>
      import(/* webpackChunkName: "terms" */ "../views/Terms.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () =>
      import(/* webpackChunkName: "privacy" */ "../views/Privacy.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/guide",
    name: "Guide",
    component: () =>
      import(/* webpackChunkName: "guide" */ "../views/Guide.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/support",
    name: "Support",
    component: () =>
      import(/* webpackChunkName: "support" */ "../views/Support.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add",
    name: "Add",
    component: () => import(/* webpackChunkName: "add" */ "../views/Add.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  scrollBehavior: function(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 110
      };
    }
    return { top: 0 };
  },
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
