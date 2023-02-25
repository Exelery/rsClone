import router from "@/router";
// import TestLoadData from "../components/TestLoadData.vue"
import { defineComponent } from 'vue';

function createComponent(name: string ,template: string) {
  return defineComponent({
    name,
    template: `<div>${template}</div>`
  });
}

export default function  createNewPage(path: string, name: string, html: string) {
  // Define a new Vue.js component for the page
  const NewPageComponent = createComponent(name, html)
  console.log(NewPageComponent)

  // Add a new route for the page to the router configuration
  router.addRoute({
    path,
    name,
    component: NewPageComponent
  });

  // Return a URL for the new page
  return router.resolve({ name });
}

// const url = createNewPage('/my-new-page', 'MyNewPage', '<h1>Hello, world!</h1>');
// console.log(url)