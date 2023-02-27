import { createRouter, createWebHistory, RouterView } from "vue-router";
// import AboutView from "../views/AboutView.vue";
// import BuilderPage from "../pages/builder/BuilderPage.vue";
// import BuilderEditor from "../pages/builder/BuilderEditor.vue";
// import BuilderConstuctor from "../pages/builder/BuilderConstructor.vue";
// import mainPageVue from "@/pages/userHome/mainPage.vue";
import { i18nRouterMiddleware } from "../i18n/index";

import { useAuthStore } from "@/stores/authStore";
const HomeView = () => import("../views/HomeView.vue");
const NotFound = () => import("@/pages/NotFound.vue");
const AccountPage = () => import("../pages/AccountPage.vue");
const BuilderPage  = () => import("../pages/builder/BuilderPage.vue");
const BuilderEditor  = () => import("../pages/builder/BuilderEditor.vue");
const BuilderConstuctor = () => import("../pages/builder/BuilderConstructor.vue");
const mainPageVue = () => import( "@/pages/userHome/mainPage.vue");
const About = () => import("../views/AboutView.vue")








const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: RouterView,
      beforeEnter: i18nRouterMiddleware,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "about",
          name: "about",
          component: About,
        },
        {
          path: "account",
          name: "account",
          component: AccountPage,
        },
        {
          path: "user/",
          name: "user",
          component: mainPageVue,
        },
        {
          path: "builder/",
          name: "builder",
          component: BuilderPage,
          children: [
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
      ]
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

// router.beforeEach(async (to, _from, next) => {
//   const paramLocale = to.params.locale as string

//   if(paramLocale === "en" || paramLocale === "ru") {
//     await switchLanguage(paramLocale)
//     return next()
//   }

// })

export default router;
