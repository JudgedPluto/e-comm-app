import "./bootstrap.scss";
import * as bootstrap from "bootstrap";

export default {
  install: function(app) {
    app.config.globalProperties.$bootstrap = bootstrap;
  }
};
