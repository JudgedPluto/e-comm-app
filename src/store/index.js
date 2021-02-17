import { createStore } from "vuex";

const store = createStore({
  state: function() {
    return {
      auth: null
    };
  },
  mutations: {
    setAuth: function(state, auth) {
      state.auth = auth;
    }
  }
});

export default store;
