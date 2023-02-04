import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BuilderPage from "../pages/BuilderPage.vue"

const BuilderRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/builder",
      name: "builder",
      component: BuilderPage,
    }
  ],
});

export default BuilderRouter;
