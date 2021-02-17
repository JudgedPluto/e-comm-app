import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapPlugin from "./plugins/bootstrap";
import OcticonsPlugin from "./plugins/octicons";
import ApiPlugin from "./plugins/api";

const app = createApp(App)
  .use(router)
  .use(store)
  .use(BootstrapPlugin)
  .use(OcticonsPlugin)
  .use(ApiPlugin);

app.mount("#app");
