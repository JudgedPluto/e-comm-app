import axios from "axios";

export default {
  install: function(app) {
    app.config.globalProperties.$api = {
      categoryAll: function(summary) {
        if (summary) {
          return axios.get("/api/categories/all?summary=1");
        } else {
          return axios.get("/api/categories/all?summary=0");
        }
      },
      districtAll: function(summary) {
        if (summary) {
          return axios.get("/api/districts/all?summary=1");
        } else {
          return axios.get("/api/districts/all?summary=0");
        }
      },
      currencyAll: function() {
        return axios.get("/api/currencies/all");
      },
      advertAll: function(filterData, summary) {
        return axios.get("/api/adverts/all", {
          params: Object.assign({}, filterData, { summary: summary ? 1 : 0 })
        });
      },
      advertFind: function(id, summary) {
        return axios.get("/api/adverts/find", {
          params: { id: id, summary: summary ? 1 : 0 }
        });
      },
      advertAdd: function(input) {
        return axios.post("/api/adverts/add", input);
      },
      advertEdit: function(input) {
        return axios.post("/api/adverts/edit", input);
      },
      advertBoost: function(id) {
        return axios.post("/api/adverts/boost", { id: id });
      },
      sponsorAll: function() {
        return axios.get("/api/sponsors/all");
      },
      imageAdd: function(file) {
        let formData = new FormData();
        formData.append("image", file);
        return axios.post("/api/images/add", formData);
      },
      imageDelete: function(filePath) {
        let formData = new URLSearchParams();
        formData.append("path", filePath);
        return axios.post("/api/images/delete", formData);
      },
      authUserFind: function() {
        return axios.get("/api/auth/user/find");
      },
      authUserMetaFind: function() {
        return axios.get("/api/auth/user/meta/find");
      }
    };
  }
};
