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
      <h2>Help and Support</h2>
      <hr />
      <p>Welcome to Vendee Ceylon’s help and support page.</p>
      <h4 id="contact">Contact Us</h4>
      <hr />
      <p>
        Any questions or issues regarding our service? Get in touch with us on
        WhatsApp and we will respond to your message as soon as possible.
      </p>
      <a
        class="btn btn-whatsapp-variant"
        target="_blank"
        href="https://wa.me/+94740443788?text=Is%20there%20anyone%20to%20help%3F"
        >Message on WhatsApp</a
      >
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
