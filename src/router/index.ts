import { createRouter, createWebHistory, RouterView } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import BuilderPage from "../pages/builder/BuilderPage.vue"
import BuilderEditor from "../pages/builder/BuilderEditor.vue"
import BuilderConstuctor from "../pages/builder/BuilderConstructor.vue"
import AccountPage from "../pages/AccountPage.vue"
import mainPageVue from "@/pages/userHome/mainPage.vue";
import NotFound from "@/pages/NotFound.vue";
import PreviewProject from "@/pages/PreviewProject.vue";

import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: RouterView,
      // beforeEnter: router
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "about",
          name: "about",
          component: AboutView,
        },
        {
          path: "account",
          name: "account",
          component: AccountPage,
        },
      ]
    },

    {
      path: "/builder/",
      name: "builder",
      component: BuilderPage,
      children: [
        {
          path: "user",
          name: "user",
          component: mainPageVue,
        },
        {
          path: "create",
          name: "creator",
          component: BuilderConstuctor,
        },
        {
          path: "editor",
          name: "editor",
          component: BuilderEditor,
        }
      ]
    },
    {
      path: '/preview/:id',
      name: 'PreviewProject',
      component: PreviewProject
    }, 
    {
      path: '/:pathMatch(.*)',
      redirect: "/404",
      name: "notFound",
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
  }
    
  ],
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (
    to.name === "builder" && store.isAuth ||
    to.name === "create" && store.isAuth ||
    to.name === "account" && store.isAuth

  ) {
    next();
  } else if (
    to.name === "builder" && !store.isAuth ||
    to.name === "create" && !store.isAuth ||
    to.name === "account" && !store.isAuth
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
