<template>
  <div
    ref="sidenav"
    class="py-3 d-block d-lg-none fixed-top h-100 bg-light-variant sidenav"
  >
    <div class="clearfix">
      <button
        class="mx-3 mb-3 btn btn-icon btn-outline-primary float-end"
        type="button"
        v-html="$octicons['x'].toSVG({ width: 16, height: 16 })"
        v-on:click="hideSidenav()"
      ></button>
    </div>
    <div class="px-3 sidenav-content">
      <div v-if="$store.state.auth">
        <h4
          class="mb-2 text-primary"
          v-text="
            $store.state.auth &&
              $store.state.auth.firstName + ' ' + $store.state.auth.lastName
          "
        ></h4>
        <h6 class="mb-3">
          <span
            class="badge"
            v-bind:class="
              $store.state.auth.verifyStatus ? 'bg-success' : 'bg-danger'
            "
            v-text="
              $store.state.auth.verifyStatus ? 'Verified' : 'Not Verified'
            "
          ></span>
        </h6>
        <router-link
          class="mb-2 btn-lg btn btn-outline-primary d-block text-start"
          to="/user"
        >
          Account details
        </router-link>
        <a
          class="mb-2 btn btn-lg btn-outline-primary d-block text-start"
          href="/api/auth/logout"
        >
          Log Out
        </a>
      </div>
      <a
        class="mb-2 btn btn-lg btn-primary d-block text-start"
        v-else
        href="#"
        v-on:click="$emit('login-click')"
      >
        Login
      </a>
      <router-link
        class="mb-2 btn btn-lg btn-outline-primary d-block text-start"
        to="/add"
      >
        Post your Ad
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidenav",
  emits: ["login-click"],
  methods: {
    showSidenav: function() {
      this.$refs.sidenav.classList.add("show");
    },
    hideSidenav: function() {
      this.$refs.sidenav.classList.remove("show");
    }
  }
};
</script>
