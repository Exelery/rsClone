import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BuilderPage from "../pages/builder/BuilderPage.vue"
import BuilderEditor from "../pages/builder/BuilderEditor.vue"
import BuilderConstuctor from "../pages/builder/BuilderConstructor.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
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
