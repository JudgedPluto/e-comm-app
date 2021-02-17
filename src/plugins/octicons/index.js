import octicons from "@primer/octicons";

export default {
  install: function(app) {
    app.config.globalProperties.$octicons = octicons;
  }
};
