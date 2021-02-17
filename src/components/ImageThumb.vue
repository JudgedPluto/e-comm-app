<template>
  <div class="mb-3">
    <div
      class="spinner-border thumb-size"
      v-if="status == 'fetch'"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="status-icon thumb-size"
      v-if="status == 'empty'"
      v-html="
        $octicons['image'].toSVG({
          width: 32,
          height: 32,
          class: 'thumb-size'
        })
      "
    ></div>
    <img
      class="img-thumbnail object-fit-cover thumb-size"
      v-show="status == 'default'"
      v-bind:src="src"
      v-on:load="status = 'default'"
      v-on:error="status = 'empty'"
    />
  </div>
</template>

<script>
export default {
  name: "ImageThumb",
  props: {
    src: String
  },
  data: function() {
    return {
      status: this.src ? "fetch" : "empty"
    };
  }
};
</script>
