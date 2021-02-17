<template>
  <div class="p-2 border border-primary rounded">
    <div
      class="carousel carousel-dark slide"
      v-if="srcList && srcList.length > 0"
      id="imageCarousel"
      ref="imageCarousel"
      data-bs-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          v-for="(item, index) in srcList"
          v-bind:key="index"
          v-bind:class="{ active: index == 0 }"
          data-bs-target="#imageCarousel"
          v-bind:data-bs-slide-to="index"
        ></li>
      </ol>
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(item, index) in srcList"
          v-bind:key="index"
          v-bind:class="{ active: index == 0 }"
        >
          <div class="ratio ratio-4x3">
            <img v-bind:src="item" class="d-block w-100 object-fit-contain" />
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#imageCarousel"
        role="button"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#imageCarousel"
        role="button"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>
    <div class="ratio ratio-4x3" v-else>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <div
          v-html="
            $octicons['image'].toSVG({
              width: 96,
              height: 96,
              class: 'thumb-size'
            })
          "
        ></div>
        <h6>No images</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCarousel",
  props: {
    srcList: Array
  },
  data: function() {
    return {
      carouselRef: null
    };
  },
  mounted: function() {
    this.$watch(
      "srcList",
      function(newValue) {
        if (newValue && newValue.length > 0) {
          this.carouselRef = new this.$bootstrap.Carousel(
            this.$refs.imageCarousel,
            {
              interval: false,
              wrap: false,
              touch: true
            }
          );
        } else {
          if (this.carouselRef) {
            this.carouselRef.dispose();
            this.carouselRef = null;
          }
        }
      },
      {
        immediate: true,
        deep: true,
        flush: "post"
      }
    );
  },
  unmounted: function() {
    if (this.carouselRef) {
      this.carouselRef.dispose();
      this.carouselRef = null;
    }
  }
};
</script>
