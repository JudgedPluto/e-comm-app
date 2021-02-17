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
      <div class="row g-3">
        <div class="col-lg-6">
          <image-carousel v-bind:src-list="advert && advert.images" />
        </div>
        <div class="col-lg">
          <p class="mb-0 badge bg-primary" v-if="advert && advert.boosted">
            Featured
          </p>
          <h2 v-text="advert && advert.title"></h2>
          <p
            class="mb-2 text-muted"
            v-text="
              advert && 'By ' + advert.seller.fname + ' ' + advert.seller.lname
            "
          ></p>
          <h3
            class="mb-0"
            v-text="
              advert &&
                getTextCurrency(advert.price, advert.locale, advert.currency)
            "
          ></h3>
          <hr />
          <p
            class="mb-3 small text-muted"
            v-text="advert && getTextDate(advert.dateCreated)"
          ></p>
          <div class="mb-3 mb-lg-2 row g-1">
            <div class="col-lg-4">
              <h6 class="mb-0">Category</h6>
            </div>
            <div class="col-lg">
              <span v-text="advert && advert.category"></span>
            </div>
          </div>
          <div class="row g-1">
            <div class="col-lg-4">
              <h6 class="mb-0">Location</h6>
            </div>
            <div class="col-lg">
              <span
                v-text="
                  advert && advert.overseas
                    ? 'International'
                    : advert && advert.district
                "
              ></span>
            </div>
          </div>
          <hr />
          <h4>About this product</h4>
          <p
            class="mb-0"
            style="white-space: pre-wrap;"
            v-text="advert && advert.description"
          ></p>
          <hr />
          <h4>Seller details</h4>
          <div class="mb-3 mb-lg-2 row g-1">
            <div class="col-lg-4">
              <h6 class="mb-0">Name</h6>
            </div>
            <div class="col-lg">
              <span
                v-text="
                  advert && advert.seller.fname + ' ' + advert.seller.lname
                "
              ></span>
            </div>
          </div>
          <div class="mb-3 mb-lg-2 row g-1">
            <div class="col-lg-4">
              <h6 class="mb-0">Email</h6>
            </div>
            <div class="col-lg">
              <a
                v-if="advert && advert.seller.email"
                v-bind:href="'mailto:' + advert.seller.email"
              >
                <span v-text="advert.seller.email"></span>
              </a>
              <span v-else v-text="'Not Available'"></span>
            </div>
          </div>
          <div class="row g-1">
            <div class="col-lg-4">
              <h6 class="mb-0">Contact No</h6>
            </div>
            <div class="col-lg">
              <a
                v-if="advert && advert.seller.contact"
                v-bind:href="'tel:' + advert.seller.contact"
              >
                <span v-text="advert.seller.contact"></span>
              </a>
              <span v-else v-text="'Not Available'"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="suggestions && suggestions.length">
        <hr />
        <h4 class="mb-3">You may also like</h4>
        <div class="row g-3 g-lg-2">
          <div
            class="col-lg-3"
            v-for="item in suggestions"
            v-bind:key="item.id"
          >
            <div class="card bg-light h-100">
              <div class="card-body">
                <image-thumb v-bind:src="item.image"></image-thumb>
                <router-link
                  class="h4 stretched-link"
                  v-bind:to="'/item?id=' + item.id"
                  v-text="item.title"
                ></router-link>
                <h5
                  class="mb-1"
                  v-text="item.currency + ' ' + item.price.toLocaleString()"
                ></h5>
                <p class="text-muted" v-if="item.negotiable">
                  Negotiable
                </p>
              </div>
            </div>
          </div>
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
import ImageCarousel from "../components/ImageCarousel.vue";
import NavFooter from "../components/NavFooter.vue";
import Authentication from "../components/Authentication.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Item",
  components: {
    NavHeader,
    ImageCarousel,
    NavFooter,
    Authentication,
    Sidenav
  },
  data: function() {
    return {
      advert: null,
      suggestions: null
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(function(vm) {
      vm.updateApi(to.query.id);
      if (to.query.login) {
        vm.$refs.auth.showModal();
        let query = Object.assign({}, to.query);
        delete query.login;
        vm.$router.replace({ query: query });
      }
    });
  },
  beforeRouteUpdate: function(to) {
    this.updateApi(to.query.id);
    if (to.query.login) {
      this.$refs.auth.showModal();
      let query = Object.assign({}, to.query);
      delete query.login;
      this.$router.replace({ query: query });
    }
  },
  methods: {
    updateApi: function(id) {
      this.$api
        .advertFind(id, false)
        .then(
          function(response) {
            this.advert = response.data;
            if (this.advert) {
              this.$api
                .advertAll({
                  query: this.advert.title,
                  exclude: this.advert.id,
                  limit: 4,
                  offset: 0
                })
                .then(
                  function(response) {
                    this.suggestions = response.data;
                  }.bind(this)
                )
                .catch(
                  function(error) {
                    console.error(error);
                    this.suggestions = null;
                  }.bind(this)
                );
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.error(error);
            this.advert = null;
          }.bind(this)
        );
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
