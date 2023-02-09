import { createApp } from "vue";
import { createPinia } from "pinia";

import { GlobalCmComponent } from "codemirror-editor-vue3";

import App from "./App.vue";
import router from "./router";

import BootstrapVue from "bootstrap-vue-3"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "bootstrap-icons/font/bootstrap-icons.css";


const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(GlobalCmComponent);
app.use(BootstrapVue);

app.mount("#app");
