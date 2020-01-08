import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Form from "./components/Form.vue";
import Home from "./components/Home.vue";
import Buefy from "buefy";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import config from "buefy/src/utils/config";
// config.defaultIconPack = "fas";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;
// Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(Buefy, {
  // defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas"
});

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/form", component: Form, name: "Form", props: true }
];

const router = new VueRouter({ routes });
// router.replace({ path: "*", redirect: "/" });

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
