<template>
  <div
    class="carousel slide"
    id="imageCarousel"
    ref="imageCarousel"
    data-bs-ride="carousel"
  >
    <ol class="carousel-indicators">
      <li
        class="active"
        data-bs-target="#imageCarousel"
        data-bs-slide-to="0"
      ></li>
      <li
        v-for="(item, index) in srcList"
        v-bind:key="index"
        data-bs-target="#imageCarousel"
        v-bind:data-bs-slide-to="index + 1"
      ></li>
      <li
        data-bs-target="#imageCarousel"
        v-bind:data-bs-slide-to="(srcList ? srcList.length : 0) + 1"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div
          class="d-flex d-lg-none flex-column bg-primary text-white align-items-center justify-content-center text-center"
          style="height: 200px; padding: 0 15%;"
        >
          <h4>See the world with Vendee Ceylon.</h4>
          <p class="small">
            Find the products you want from used cars to mobile phones and
            computers, or sell your product on vendeeceylon.com
          </p>
        </div>
        <div
          class="d-none d-lg-flex flex-column bg-primary text-white align-items-center justify-content-center text-center"
          style="height: 350px; padding: 0 15%;"
        >
          <h2>See the world with Vendee Ceylon.</h2>
          <p>
            Find the products you want from used cars to mobile phones and
            computers, or sell your product on vendeeceylon.com
          </p>
        </div>
      </div>
      <div
        class="carousel-item"
        v-for="(item, index) in srcList"
        v-bind:key="index"
      >
        <div
          class="d-flex align-items-center justify-content-center h-img"
          style="padding: 0 15%;"
          v-bind:style="{ 'background-color': item.bg }"
        >
          <a
            class="d-block w-100 h-100"
            target="_blank"
            v-bind:href="item.link"
          >
            <img
              v-bind:src="item.img"
              class="d-block w-100 h-100 object-fit-contain"
            />
          </a>
        </div>
      </div>
      <div class="carousel-item">
        <div
          class="d-flex d-lg-none flex-column bg-primary text-white align-items-center justify-content-center text-center"
          style="height: 200px; padding: 0 15%;"
        >
          <h4>Any suggessions?</h4>
          <p class="small">
            You can leave a feedback on our website. Mention any suggessions or
            issues in your feedback and we will try to improve based on your
            feedback.
          </p>
          <a
            class="btn btn-smhttps://docs.google.com/forms/d/e/1FAIpQLSd_rYSdhGGpXhDXlGBnj0YhmDyxsvbEiXVzQYvhRmVBHzHkNg/viewform?embedded=true btn-light"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd_rYSdhGGpXhDXlGBnj0YhmDyxsvbEiXVzQYvhRmVBHzHkNg/viewform?embedded=true"
          >
            Go to feedback page
          </a>
        </div>
        <div
          class="d-none d-lg-flex flex-column bg-primary text-white align-items-center justify-content-center text-center"
          style="height: 350px; padding: 0 15%;"
        >
          <h2>Any suggessions?</h2>
          <p>
            You can leave a feedback on our website. Mention any suggessions or
            issues in your feedback and we will try to improve based on your
            feedback.
          </p>
          <a
            class="btn btn-light"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd_rYSdhGGpXhDXlGBnj0YhmDyxsvbEiXVzQYvhRmVBHzHkNg/viewform?embedded=true"
          >
            Go to feedback page
          </a>
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
</template>

<script>
export default {
  name: "HomeCarousel",
  props: {
    srcList: Array
  },
  data: function() {
    return {
      carouselRef: null
    };
  },
  mounted: function() {
    console.log(this.srcList ? 1 : 0);
    this.carouselRef = new this.$bootstrap.Carousel(this.$refs.imageCarousel, {
      slide: "carousel",
      touch: true
    });
  },
  unmounted: function() {
    if (this.carouselRef) {
      this.carouselRef.dispose();
      this.carouselRef = null;
    }
  }
};
</script>
