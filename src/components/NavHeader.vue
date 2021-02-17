<template>
  <nav class="navbar navbar-light">
    <div class="container-lg">
      <div class="d-block d-lg-none">
        <button
          class="btn btn-icon btn-outline-primary"
          type="button"
          v-html="$octicons['three-bars'].toSVG({ width: 16, height: 16 })"
          v-on:click="$emit('more-click')"
        ></button>
      </div>
      <router-link to="/">
        <img class="navbar-logo" src="../assets/logo.png" />
      </router-link>
      <div class="d-block d-lg-none">
        <button
          class="btn btn-icon btn-outline-primary"
          v-bind:class="{ active: isQueryShown }"
          type="button"
          v-bind:aria-expanded="isQueryShown"
          aria-controls="query"
          v-html="$octicons['search'].toSVG({ width: 16, height: 16 })"
          v-on:click="$refs.query.toggle()"
        ></button>
      </div>
      <div class="ms-auto d-none d-lg-block">
        <router-link class="btn btn-lg btn-outline-primary" to="/add">
          Post your Ad
        </router-link>
        <div class="dropdown d-inline-block" v-if="$store.state.auth">
          <button
            class="ms-2 btn btn-icon-lg btn-outline-primary dropdown-toggle"
            type="button"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            v-html="$octicons['person'].toSVG({ width: 16, height: 16 })"
          ></button>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownUser"
          >
            <li>
              <h6 class="dropdown-header">
                <span
                  class="mb-1"
                  v-text="
                    $store.state.auth &&
                      $store.state.auth.firstName +
                        ' ' +
                        $store.state.auth.lastName
                  "
                ></span>
              </h6>
              <h6 class="dropdown-header pt-0">
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
            </li>
            <li>
              <router-link class="dropdown-item" to="/user">
                Account Details
              </router-link>
            </li>
            <li>
              <a class="dropdown-item" href="/api/auth/logout">
                Log Out
              </a>
            </li>
          </ul>
        </div>
        <button
          class="ms-2 btn btn-lg btn-primary"
          v-else
          type="button"
          v-on:click="$emit('login-click')"
        >
          Login
        </button>
        <button
          class="ms-2 btn btn-icon-lg btn-outline-primary"
          v-bind:class="{ active: isQueryShown }"
          type="button"
          v-bind:aria-expanded="isQueryShown"
          aria-controls="query"
          v-html="$octicons['search'].toSVG({ width: 16, height: 16 })"
          v-on:click="$refs.query.toggle()"
        ></button>
      </div>
      <collapse
        class="w-100"
        ref="query"
        id="query"
        v-bind:lock-toggle="queryAlways"
        v-model="isQueryShown"
      >
        <input
          class="mt-3 form-control"
          type="text"
          v-bind:value="queryValue"
          v-on:keyup.enter="$emit('query-input', $event.target.value)"
        />
      </collapse>
    </div>
  </nav>
</template>

<script>
import Collapse from "./Collapse.vue";

export default {
  name: "NavHeader",
  components: {
    Collapse
  },
  props: {
    queryAlways: Boolean,
    queryValue: String
  },
  emits: ["login-click", "more-click", "query-input"],
  data: function() {
    return {
      isQueryShown: this.queryAlways
    };
  }
};
</script>
