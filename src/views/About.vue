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
      <div class="text-center">
        <img
          class="mb-3"
          style="height: 196px; width: auto;"
          src="../assets/logo.png"
        />
        <h1 class="display-6">See the world with Vendee Ceylon</h1>
      </div>
      <hr />
      <h2 class="mb-3">About Vendee Ceylon</h2>
      <p>
        Vendee Ceylon is a website where you can find and sell almost
        everything. So, on this it is easy to sell and find locally and
        internationally and when it comes to buyer’s perspective it so easy to
        contact the sellers since the contact info is visible. It takes less
        than 2 minutes to post an ad on it. You can sign up for an account and
        post ads easily. It has the widest selection of popular second-hand
        items all over Sri Lanka, which makes it easy to find exactly what you
        are looking for. So, if you are looking for a mobile phone, computer and
        etc you will find the best deal on it. Here you can find and sell items
        in different categories. We also carefully review all ads that are being
        published, to make sure the quality is up to our standards.
      </p>
      <hr />
      <h2 class="mb-3">Our Mission</h2>
      <p>
        Our mission at Vendee Ceylon is to provide the best product and services
        with liveliness, energy and enthusiasm.
      </p>
      <hr />
      <h2 class="mb-3">Our Vision</h2>
      <p>
        To Provide something out of the box.
      </p>
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
  name: "About",
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
