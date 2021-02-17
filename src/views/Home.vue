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
    <home-carousel v-bind:srcList="sponsors" />
    <div class="mb-3 py-3 container-lg text-center">
      <h2 class="mb-4">Find products by Category</h2>
      <div>
        <div class="row g-2 justify-content-center">
          <div
            class="col-sm-6 col-xl-3"
            v-for="item in categoriesExpandable"
            v-bind:key="item.id"
          >
            <div class="position-relative">
              <div class="w-50 mx-auto mb-3 ratio ratio-1x1">
                <img class="object-fit-contain" v-bind:src="item.image" />
              </div>
              <router-link
                class="h6 stretched-link"
                v-bind:to="'/search?category=' + item.id"
                v-text="item.name"
              ></router-link>
              <p
                class="mb-2 text-muted"
                v-text="
                  item.count +
                    (item.count == 1 ? ' advertisement' : ' advertisements')
                "
              ></p>
              <p v-text="item.description"></p>
            </div>
          </div>
        </div>
        <div v-if="!isCategoryExpanded">
          <button
            class="btn btn-primary"
            type="button"
            v-if="!isCategoryExpanded"
            v-on:click="isCategoryExpanded = !isCategoryExpanded"
          >
            <span
              v-html="
                $octicons['chevron-down'].toSVG({
                  width: 16,
                  height: 16,
                  class: 'd-inline-block align-text-bottom'
                })
              "
            ></span>
            <span class="ms-1">Show all categories</span>
          </button>
        </div>
      </div>
      <hr />
      <h2 class="mb-4">Find products by Location</h2>
      <div>
        <div class="row g-2 justify-content-center">
          <div
            class="col-sm-6 col-xl-3"
            v-for="item in districtsExpandable"
            v-bind:key="item.id"
          >
            <div class="position-relative">
              <router-link
                class="h6 stretched-link"
                v-bind:to="'/search?district=' + item.id"
                v-text="item.name"
              ></router-link>
              <p
                class="text-muted"
                v-text="
                  item.count +
                    (item.count == 1 ? ' advertisement' : ' advertisements')
                "
              ></p>
            </div>
          </div>
        </div>
        <div v-if="!isDistrictExpanded">
          <button
            class="btn btn-primary"
            type="button"
            v-on:click="isDistrictExpanded = !isDistrictExpanded"
          >
            <span
              v-html="
                $octicons['chevron-down'].toSVG({
                  width: 16,
                  height: 16,
                  class: 'd-inline-block align-text-bottom'
                })
              "
            ></span>
            <span class="ms-1">Show all locations</span>
          </button>
        </div>
        <div class="mt-2">
          <button
            class="btn btn-link"
            type="button"
            v-on:click="$router.push('/search?overseas=1')"
          >
            <span
              v-html="
                $octicons['search'].toSVG({
                  width: 16,
                  height: 16,
                  class: 'd-inline-block align-text-bottom'
                })
              "
            ></span>
            <span class="ms-1">Or search internationally</span>
          </button>
        </div>
      </div>
      <hr v-if="false" />
      <h2 v-if="false" class="mb-4">Why choose us?</h2>
      <div v-if="false" class="row g-2">
        <div
          class="col-sm-6 col-xl-3"
          v-for="item in specialities"
          v-bind:key="item"
        >
          <div class="position-relative">
            <div class="w-50 mx-auto mb-3 ratio ratio-1x1">
              <div class="bg-primary"></div>
            </div>
            <p v-text="item.description"></p>
          </div>
        </div>
      </div>
      <hr />
      <h2 class="mb-4">Want to sell a product?</h2>
      <router-link class="btn btn-lg btn-primary" to="/add">
        Post your ad here
      </router-link>
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
import HomeCarousel from "../components/HomeCarousel.vue";
import NavFooter from "../components/NavFooter.vue";
import Authentication from "../components/Authentication.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Home",
  components: {
    NavHeader,
    HomeCarousel,
    NavFooter,
    Authentication,
    Sidenav
  },
  data: function() {
    return {
      sponsors: null,
      categories: null,
      districts: null,
      isCategoryExpanded: false,
      isDistrictExpanded: false,
      specialities: [
        {
          description: "Speciality 1"
        },
        {
          description: "Speciality 2"
        },
        {
          description: "Speciality 3"
        },
        {
          description: "Speciality 4"
        }
      ]
    };
  },
  computed: {
    categoriesExpandable: function() {
      if (this.categories) {
        if (!this.isCategoryExpanded) {
          return this.categories.filter(function(item, index) {
            return index < 4;
          });
        }
        return this.categories;
      }
      return null;
    },
    districtsExpandable: function() {
      if (this.districts) {
        if (!this.isDistrictExpanded) {
          return this.districts.filter(function(item, index) {
            return index < 4;
          });
        }
        return this.districts;
      }
      return null;
    }
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
  },
  beforeMount: function() {
    this.$api
      .sponsorAll()
      .then(
        function(response) {
          this.sponsors = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
          this.sponsors = null;
        }.bind(this)
      );

    this.$api
      .categoryAll(false)
      .then(
        function(response) {
          this.categories = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
          this.categories = null;
        }.bind(this)
      );

    this.$api
      .districtAll(false)
      .then(
        function(response) {
          this.districts = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
          this.districts = null;
        }.bind(this)
      );
  }
};
</script>
