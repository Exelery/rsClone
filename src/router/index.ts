import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import BuilderPage from "../pages/builder/BuilderPage.vue"
import BuilderEditor from "../pages/builder/BuilderEditor.vue"
import BuilderConstuctor from "../pages/builder/BuilderConstructor.vue"
import AccountPage from "../pages/AccountPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountPage,
    },
    // {
    //   path: "/registration",
    //   name: "Registration" ,
    //   component: Registration
    // },
    {
      path: "/builder/",
      name: "builder",
      component: BuilderPage,
      children:[
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
    }
  ],
});

export default router;
