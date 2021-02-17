<template>
  <div class="py-2 sticky-top bg-light-variant">
    <nav-header
      v-on:login-click="$refs.auth.showModal()"
      v-on:more-click="$refs.sidenav.showSidenav()"
      v-on:query-input="
        $router.push('/search?query=' + encodeURIComponent($event))
      "
    />
  </div>
  <div class="flex-shrink-0">
    <div class="mb-3 py-3 container-lg">
      <h2 class="text-center">How to Sell</h2>
      <hr />
      <div class="row g-2 justify-content-center text-center">
        <div class="col-lg-3">
          <p
            v-html="
              $octicons['sun'].toSVG({
                width: 96,
                height: 96,
                class: 'fill-warning'
              })
            "
          ></p>
          <h4 class="mb-2">Step 1</h4>
          <h2>Pick the right price</h2>
          <img
            class="p-guide-down d-none d-lg-block"
            src="../assets/bottom-end.png"
            alt=""
          />
        </div>
        <div class="col-lg-3">
          <img
            class="p-guide-up d-none d-lg-block"
            src="../assets/top-end.png"
            alt=""
          />
          <p
            v-html="
              $octicons['device-camera'].toSVG({
                width: 96,
                height: 96,
                class: 'fill-success'
              })
            "
          ></p>
          <h4 class="mb-2">Step 2</h4>
          <h2>Use great photos</h2>
        </div>
        <div class="col-lg-3">
          <p
            v-html="
              $octicons['pencil'].toSVG({
                width: 96,
                height: 96,
                class: 'fill-danger'
              })
            "
          ></p>
          <h4 class="mb-2">Step 3</h4>
          <h2>Provide clear details</h2>
          <img
            class="p-guide-down d-none d-lg-block"
            src="../assets/bottom-end.png"
            alt=""
          />
        </div>
        <div class="col-lg-3">
          <img
            class="p-guide-up d-none d-lg-block"
            src="../assets/empty.png"
            alt=""
          />
          <p
            v-html="
              $octicons['rocket'].toSVG({
                width: 96,
                height: 96,
                class: 'fill-info'
              })
            "
          ></p>
          <h4 class="mb-2">Step 4</h4>
          <h2>Boost your ad</h2>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-auto">
    <nav-footer />
  </div>
  <authentication ref="auth" />
  <sidenav ref="sidenav" v-on:login-click="$refs.auth.showModal()" />
</template>

<script>
import NavHeader from "../components/NavHeader.vue";
import NavFooter from "../components/NavFooter.vue";
import Authentication from "../components/Authentication.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Guide",
  components: {
    NavHeader,
    NavFooter,
    Authentication,
    Sidenav
  },
  beforeRouteEnter: function(to, from, next) {
    next(function(vm) {
      if (to.query.login) {
        vm.$refs.auth.showModal();
        let query = Object.assign({}, to.query);
        delete query.login;
        vm.$router.replace({ query: query });
      }
    });
  },
  beforeRouteUpdate: function(to) {
    if (to.query.login) {
      this.$refs.auth.showModal();
      let query = Object.assign({}, to.query);
      delete query.login;
      this.$router.replace({ query: query });
    }
  }
};
</script>
