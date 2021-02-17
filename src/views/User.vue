<template>
  <div class="py-2 sticky-top bg-light-variant">
    <nav-header
      v-on:query-input="
        $router.push('/search?query=' + encodeURIComponent($event))
      "
      v-on:more-click="$refs.sidenav.showSidenav()"
    />
  </div>
  <div class="flex-shrink-0">
    <div class="mb-3 py-3 container-lg">
      <h2>
        <span
          v-text="
            $store.state.auth &&
              $store.state.auth.firstName + ' ' + $store.state.auth.lastName
          "
        ></span>
      </h2>
      <h4>
        <span
          class="badge"
          v-bind:class="
            $store.state.auth.verifyStatus ? 'bg-success' : 'bg-danger'
          "
          v-text="
            $store.state.auth.verifyStatus
              ? 'Email Verified'
              : 'Email Not Verified'
          "
        ></span>
      </h4>
      <p class="text-muted">
        <span v-text="$store.state.auth && $store.state.auth.email"></span>
      </p>
      <div class="row g-2">
        <div class="col-lg-auto">
          <router-link
            class="btn btn-primary"
            v-if="$store.state.auth.verifyStatus"
            to="/add"
          >
            <span
              v-html="
                $octicons['plus'].toSVG({
                  width: 16,
                  height: 16,
                  class: 'd-inline-block align-text-bottom'
                })
              "
            ></span>
            <span class="ms-1">Post an advertisement</span>
          </router-link>
          <a class="btn btn-primary" v-else href="/api/auth/verify/request">
            <span
              v-html="
                $octicons['mail'].toSVG({
                  width: 16,
                  height: 16,
                  class: 'd-inline-block align-text-bottom'
                })
              "
            ></span>
            <span class="ms-1">Verify email</span>
          </a>
        </div>
        <div class="col-lg-auto">
          <router-link class="btn btn-primary" to="/settings">
            <span
              v-html="
                $octicons['gear'].toSVG({
                  width: 16,
                  height: 16,
                  class: 'd-inline-block align-text-bottom'
                })
              "
            ></span>
            <span class="ms-1">Settings</span>
          </router-link>
        </div>
      </div>
      <hr />
      <h4 class="mb-3">Posted Advertisements</h4>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="item in adverts"
            v-bind:key="item.id"
          >
            <div class="row g-1 align-items-center">
              <div class="col-lg">
                <h6 class="mb-0" v-text="item.title"></h6>
                <span
                  class="text-muted"
                  v-text="getDate(item.dateCreated)"
                ></span>
              </div>
              <div class="col-lg-auto">
                <div class="row g-2">
                  <div class="col-auto">
                    <button
                      class="btn btn-sm btn-primary"
                      v-bind:class="item.boosted ? 'btn-light' : 'btn-primary'"
                      type="button"
                      v-bind:disabled="item.boosted"
                      v-on:click="boostAdvert(item.id)"
                    >
                      <span
                        v-html="
                          $octicons['rocket'].toSVG({
                            width: 16,
                            height: 16,
                            class: 'd-inline-block align-text-bottom'
                          })
                        "
                      ></span>
                      <span
                        class="ms-1"
                        v-text="item.boosted ? 'Boosting' : 'Boost'"
                      ></span>
                    </button>
                  </div>
                  <div class="col-auto">
                    <router-link
                      class="btn btn-sm btn-primary"
                      v-bind:to="'/item?id=' + item.id"
                    >
                      <span
                        v-html="
                          $octicons['eye'].toSVG({
                            width: 16,
                            height: 16,
                            class: 'd-inline-block align-text-bottom'
                          })
                        "
                      ></span>
                      <span class="ms-1">View</span>
                    </router-link>
                  </div>
                  <div class="col-auto">
                    <router-link
                      class="btn btn-sm btn-primary"
                      v-bind:to="'/edit?id=' + item.id"
                    >
                      <span
                        v-html="
                          $octicons['pencil'].toSVG({
                            width: 16,
                            height: 16,
                            class: 'd-inline-block align-text-bottom'
                          })
                        "
                      ></span>
                      <span class="ms-1">Edit</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="mt-auto">
    <nav-footer />
  </div>
  <sidenav ref="sidenav" />
</template>

<script>
import NavHeader from "../components/NavHeader.vue";
import NavFooter from "../components/NavFooter.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "User",
  components: {
    NavHeader,
    NavFooter,
    Sidenav
  },
  data: function() {
    return {
      adverts: null
    };
  },
  beforeMount: function() {
    this.$api
      .advertAll(
        { user: this.$store.state.auth && this.$store.state.auth.id },
        true
      )
      .then(
        function(response) {
          this.adverts = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
          this.adverts = null;
        }.bind(this)
      );
  },
  methods: {
    getDate: function(timestamp) {
      let date = new Date(timestamp * 1000);
      return (
        "Created on: " +
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear()
      );
    },
    boostAdvert: function(id) {
      this.$api
        .advertBoost(id)
        .then(
          function(response) {
            if (response.data.success) {
              this.adverts.find(function(item) {
                return item.id == id;
              }).boosted = 1;
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>
