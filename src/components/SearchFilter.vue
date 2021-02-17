<template>
  <nav class="py-2 text-black">
    <div class="container-lg">
      <collapse ref="filter" id="filter" v-model="isShowing">
        <div class="mb-3 row g-2">
          <div class="col-lg-auto">
            <label class="pt-lg-1 form-label">Filter By:</label>
          </div>
          <div class="col-lg">
            <select
              class="form-select form-select-sm"
              aria-label="Small select category"
              v-bind:value="getQuery('category', 0, categories, true)"
              v-on:change="updateQuery('category', $event.target.value)"
            >
              <option value="0">All Categories</option>
              <option
                v-for="item in categories"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                <span v-text="item.name"></span>
              </option>
            </select>
          </div>
          <div class="col-lg">
            <select
              class="mb-2 form-select form-select-sm"
              aria-label="Small select district"
              v-bind:value="getQuery('district', 0, districts, true)"
              v-on:change="updateQuery('district', $event.target.value)"
            >
              <option value="0">All Districts</option>
              <option
                v-for="item in districts"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                <span v-text="item.name"></span>
              </option>
            </select>
            <div class="pt-lg-1 form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckOverseas"
                v-bind:checked="getQuery('overseas', 0) ? true : false"
                v-on:change="
                  updateQuery('overseas', $event.target.checked ? '1' : '0')
                "
              />
              <label class="form-check-label" for="flexCheckOverseas">
                International
              </label>
            </div>
          </div>
          <div class="col-lg">
            <select
              class="mb-2 form-select form-select-sm"
              aria-label="Small select currency"
              v-bind:value="getQuery('currency', 1, currencies, true)"
              v-on:change="updateQuery('currency', $event.target.value)"
            >
              <option
                v-for="item in currencies"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                <span v-text="item.name"></span>
              </option>
            </select>
            <select
              class="form-select form-select-sm"
              aria-label="Small select price"
              v-bind:value="getQuery('price', 0, prices)"
              v-on:change="updateQuery('price', $event.target.value)"
            >
              <option value="0">All Prices</option>
              <option
                v-for="item in prices"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                <span v-text="item.name"></span>
              </option>
            </select>
          </div>
          <div class="col-lg"></div>
          <div class="col-lg-auto">
            <label class="pt-lg-1 form-label">Sort By:</label>
          </div>
          <div class="col-lg">
            <select
              class="form-select form-select-sm"
              aria-label="Small select sort"
              v-bind:value="getQuery('sort', 1, sorts)"
              v-on:change="updateQuery('sort', $event.target.value)"
            >
              <option
                v-for="item in sorts"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                <span v-text="item.name"></span>
              </option>
            </select>
          </div>
        </div>
      </collapse>
      <div class="d-flex justify-content-center justify-content-lg-start">
        <button
          class="btn btn-outline-primary"
          v-on:click="$refs.filter.toggle()"
        >
          <span
            class="me-1"
            v-text="isShowing ? 'Hide Filters' : 'Show Filters'"
          ></span>
          <span
            v-html="
              $octicons[isShowing ? 'chevron-up' : 'chevron-down'].toSVG({
                width: 16,
                height: 16,
                class: 'd-inline-block align-text-bottom'
              })
            "
          ></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from "./Collapse.vue";

export default {
  name: "SearchFilter",
  components: {
    Collapse
  },
  props: {
    queryValue: Object
  },
  emits: ["query-input"],
  data: function() {
    return {
      categories: null,
      districts: null,
      currencies: null,
      prices: [
        { id: 1, name: "Less than 1,000" },
        { id: 2, name: "1,000 to 5,000" },
        { id: 3, name: "5,000 to 10,000" },
        { id: 4, name: "More than 10,000" }
      ],
      sorts: [
        { id: 1, name: "Featured" },
        { id: 2, name: "Latest" },
        { id: 3, name: "Earliest" },
        { id: 4, name: "Lowest Price" },
        { id: 5, name: "Highest Price" }
      ],
      isShowing: false
    };
  },
  beforeMount: function() {
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

    this.$api
      .currencyAll()
      .then(
        function(response) {
          this.currencies = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
          this.currencies = null;
        }.bind(this)
      );
  },
  methods: {
    getQuery: function(key, defaultValue, list = null, listCheck = false) {
      if (this.queryValue[key] && (list || !listCheck)) {
        if (
          !list ||
          list.find(
            function(item) {
              return item.id == parseInt(this.queryValue[key]);
            }.bind(this)
          )
        ) {
          return this.queryValue[key];
        }
      }
      return defaultValue;
    },
    updateQuery: function(key, value) {
      let newQueryValue = Object.assign({}, this.queryValue);
      newQueryValue[key] = value;
      this.$emit("query-input", newQueryValue);
    }
  }
};
</script>
