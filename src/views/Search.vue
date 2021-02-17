<template>
  <div class="py-2 sticky-top bg-light-variant">
    <nav-header
      query-always
      v-bind:query-value="$route.query.query"
      v-on:login-click="$refs.auth.showModal()"
      v-on:more-click="$refs.sidenav.showSidenav()"
      v-on:query-input="updateQuery({ query: $event })"
    />
    <search-filter
      v-bind:query-value="getFilter()"
      v-on:query-input="updateQuery($event)"
    />
  </div>
  <div class="flex-shrink-0">
    <div class="mb-3 py-3 container-lg">
      <div
        class="row g-2"
        v-if="searchResults && searchResults.length && !wait"
      >
        <div class="col-12" v-for="item in searchResults" v-bind:key="item.id">
          <div
            class="card bg-light"
            v-bind:class="{ 'border-primary': item.boosted }"
          >
            <div class="card-body">
              <div class="row">
                <div class="col-lg-auto">
                  <image-thumb v-bind:src="item.image"></image-thumb>
                </div>
                <div class="col-lg">
                  <div class="row">
                    <div class="col-lg">
                      <router-link
                        class="h3 stretched-link"
                        v-bind:to="'/item?id=' + item.id"
                        v-text="item.title"
                      ></router-link>
                      <p
                        class="mt-1 mb-0 text-muted"
                        v-text="
                          'By ' + item.seller.fname + ' ' + item.seller.lname
                        "
                      ></p>
                      <p
                        class="mt-1 small text-muted"
                        v-text="getTextDate(item.dateCreated)"
                      ></p>
                    </div>
                    <div class="col-lg-auto">
                      <div class="text-lg-end">
                        <h4
                          class="mb-1"
                          v-text="
                            getTextCurrency(
                              item.priceAdj,
                              item.localeAdj,
                              item.currencyAdj
                            )
                          "
                        ></h4>
                        <h6
                          class="mb-1"
                          v-if="item.currencyAdj !== item.currency"
                          v-text="
                            '(' +
                              getTextCurrency(
                                item.price,
                                item.locale,
                                item.currency
                              ) +
                              ')'
                          "
                        ></h6>
                        <p class="text-muted" v-if="item.negotiable">
                          Negotiable
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix">
                    <p v-text="'Category: ' + item.category"></p>
                    <p
                      class="mb-lg-0 d-lg-inline-block"
                      v-bind:class="{ 'mb-0': !item.boosted }"
                      v-text="
                        'Location: ' +
                          (item.overseas ? 'International' : item.district)
                      "
                    ></p>
                    <p
                      class="mb-0 badge bg-primary float-lg-end"
                      v-if="item.boosted"
                    >
                      Featured
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-3 mb-0">
          Currency data provided by
          <a target="_blank" href="https://currencylayer.com/">
            currencylayer API </a
          >.
        </p>
      </div>
      <div ref="scrollCheck"></div>
      <div
        class="p-5 text-center"
        v-if="!(searchResults && searchResults.length) && !wait"
      >
        <h2>No Results Found.</h2>
        <p>
          Try search using a different keyword or choose a different filter.
        </p>
      </div>
      <div class="py-5 text-center" v-if="wait">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
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
import SearchFilter from "../components/SearchFilter.vue";
import ImageThumb from "../components/ImageThumb.vue";
import NavFooter from "../components/NavFooter.vue";
import Authentication from "../components/Authentication.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Search",
  components: {
    NavHeader,
    SearchFilter,
    ImageThumb,
    NavFooter,
    Authentication,
    Sidenav
  },
  data: function() {
    return {
      searchResults: null,
      searchQuery: null,
      wait: true
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(function(vm) {
      if (vm.searchResults) {
        vm.searchResults = null;
      }
      vm.wait = true;
      let searchQuery = Object.assign({}, to.query);
      delete searchQuery.login;
      vm.updateApi(searchQuery);
      if (to.query.login) {
        vm.$refs.auth.showModal();
        let query = Object.assign({}, to.query);
        delete query.login;
        vm.$router.replace({ query: query });
      }
    });
  },
  beforeRouteUpdate: function(to) {
    if (this.searchResults) {
      this.searchResults = null;
    }
    this.wait = true;
    let searchQuery = Object.assign({}, to.query);
    delete searchQuery.login;
    this.updateApi(searchQuery);
    if (to.query.login) {
      this.$refs.auth.showModal();
      let query = Object.assign({}, to.query);
      delete query.login;
      this.$router.replace({ query: query });
    }
  },
  methods: {
    updateApi: function(params) {
      this.searchQuery = Object.assign({}, params);
      this.$api
        .advertAll(
          Object.assign({}, this.searchQuery, {
            limit: 5,
            offset: this.searchResults ? this.searchResults.length : 0
          }),
          false
        )
        .then(
          function(response) {
            this.wait = false;
            if (!this.searchResults) {
              this.searchResults = [];
            }
            if (response.data) {
              this.searchResults = this.searchResults.concat(response.data);
              return window.addEventListener("scroll", this.handleScroll);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.wait = false;
            console.error(error);
            this.searchResults = null;
          }.bind(this)
        );
    },
    updateQuery: function(data) {
      this.searchQuery = Object.assign({}, this.searchQuery, data);
      this.$router.replace({
        path: "search",
        query: this.searchQuery
      });
    },
    getFilter: function() {
      let filter = Object.assign({}, this.searchQuery);
      delete filter.query;
      return filter;
    },
    handleScroll: function() {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) +
          window.innerHeight >=
        this.$refs.scrollCheck.offsetTop
      ) {
        window.removeEventListener("scroll", this.handleScroll);
        this.updateApi(this.searchQuery);
      }
    },
    getTextDate: function(timestamp) {
      let timestampDiff = Date.now() / 1000 - timestamp;
      if (Math.floor(timestampDiff / 86400) == 0) {
        return "Posted Recently";
      }
      let noOfDays = Math.floor(timestampDiff / 86400);
      if (noOfDays <= 28) {
        return (
          "Posted " + noOfDays + (noOfDays == 1 ? " day" : " days") + " ago"
        );
      }
      let noOfMonths = Math.floor(noOfDays / 28);
      if (noOfMonths <= 6) {
        return (
          "Posted " +
          noOfMonths +
          (noOfMonths == 1 ? " month" : " months") +
          " ago"
        );
      }
      let date = new Date(timestamp * 1000);
      let dateFormat = new Intl.DateTimeFormat("en-GB").format;
      return "Posted on " + dateFormat(date);
    },
    getTextCurrency: function(price, locale, currency) {
      let currencyFormat = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        currencyDisplay: "code"
      }).format;
      return currencyFormat(price);
    }
  }
};
</script>
