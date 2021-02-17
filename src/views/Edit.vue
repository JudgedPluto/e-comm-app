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
      <h2>Edit Advertisement</h2>
      <hr />
      <input
        class="mb-3 form-control"
        type="text"
        placeholder="Title"
        v-model="advert.title"
      />
      <textarea
        class="mb-3 form-control"
        placeholder="Description"
        rows="4"
        v-model="advert.description"
      ></textarea>
      <label class="mb-2">Images (Max 5 images, 1920x1080 preferred):</label>
      <image-input
        class="mb-3"
        ref="imageInput"
        v-bind:max="5"
        v-bind:input="advert.images"
        v-on:commit="handleSubmit"
      ></image-input>
      <div class="mb-3 input-group">
        <select
          class="form-select flex-grow-0 w-auto"
          aria-label="Default select currency"
          v-model="advert.currency"
        >
          <option
            v-for="item in currencies"
            v-bind:key="item.id"
            v-bind:value="item.id"
          >
            <span v-text="item.name"></span>
          </option>
        </select>
        <input
          class="form-control"
          type="text"
          placeholder="Price"
          v-model="advert.price"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="negotiable"
          v-bind:true-value="1"
          v-bind:false-value="0"
          v-model="advert.negotiable"
        />
        <label class="form-check-label" for="negotiable">
          Negotiable
        </label>
      </div>
      <label class="mb-2" for="category">Category:</label>
      <select
        class="mb-3 form-select"
        aria-label="Default select category"
        v-model="advert.category"
        disabled
      >
        <option v-bind:value="0">
          None
        </option>
        <option
          v-for="item in categories"
          v-bind:key="item.id"
          v-bind:value="item.id"
        >
          <span v-text="item.name"></span>
        </option>
      </select>
      <label class="mb-2">Location:</label>
      <select
        class="mb-2 form-select"
        aria-label="Default select district"
        v-bind:disabled="advert.overseas ? true : false"
        v-model="advert.district"
      >
        <option v-bind:value="0">
          None
        </option>
        <option
          v-for="item in districts"
          v-bind:key="item.id"
          v-bind:value="item.id"
        >
          <span v-text="item.name"></span>
        </option>
      </select>
      <div class="mb-3 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="overseas"
          v-bind:true-value="1"
          v-bind:false-value="0"
          v-model="advert.overseas"
        />
        <label class="form-check-label" for="overseas">
          International
        </label>
      </div>
      <button
        class="mb-3 btn btn-primary"
        type="button"
        v-bind:disabled="progress"
        v-on:click="performPreperation"
      >
        <span v-if="progress">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Loading...</span>
        </span>
        <span v-else>
          Add Item
        </span>
      </button>
    </div>
  </div>
  <div class="mt-auto">
    <nav-footer />
  </div>
  <sidenav ref="sidenav" />
</template>

<script>
import NavHeader from "../components/NavHeader.vue";
import ImageInput from "../components/ImageInput.vue";
import NavFooter from "../components/NavFooter.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Edit",
  components: {
    NavHeader,
    ImageInput,
    NavFooter,
    Sidenav
  },
  data: function() {
    return {
      currencies: null,
      categories: null,
      districts: null,
      advert: {
        title: "",
        description: "",
        images: [],
        currency: 1,
        price: "",
        negotiable: 0,
        category: 0,
        district: 0,
        overseas: 0
      },
      progress: false
    };
  },
  beforeMount: function() {
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

    this.$api
      .categoryAll(true)
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
      .districtAll(true)
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
      .advertFind(this.$route.query.id, true)
      .then(
        function(response) {
          this.advert = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
        }.bind(this)
      );
  },
  methods: {
    performPreperation: function() {
      this.progress = true;
      this.$refs.imageInput.commitChanges();
    },
    handleSubmit: function(imageList) {
      console.log("All images committed.", imageList);
      let advertData = Object.assign({}, this.advert, { images: imageList });
      this.$api
        .advertEdit(advertData)
        .then(
          function(response) {
            if (response.data.success) {
              this.$router.push("/success?code=advert_edit");
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.error(error);
            this.$router.push("/error?code=advert_edit");
          }.bind(this)
        );
    }
  }
};
</script>
