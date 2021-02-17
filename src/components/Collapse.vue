<template>
  <div class="collapse" ref="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  props: {
    lockToggle: Boolean,
    modelValue: Boolean
  },
  data: function() {
    return {
      shown: this.modelValue,
      prop: true,
      allowed: true,
      jsInstance: null
    };
  },
  mounted: function() {
    this.$watch(
      "shown",
      function(newValue) {
        if (this.prop) {
          if (newValue) {
            this.$refs.collapse.classList.add("show");
          } else {
            this.$refs.collapse.classList.remove("show");
          }
        } else {
          if (newValue) {
            this.expand();
          } else {
            this.collapse();
          }
          this.$emit("update:modelValue", newValue);
        }
      }.bind(this),
      { immediate: true }
    );
  },
  methods: {
    expand: function() {
      if (!this.jsInstance) {
        this.newInstance();
      }
      this.jsInstance.show();
    },
    collapse: function() {
      if (!this.jsInstance) {
        this.newInstance();
      }
      this.jsInstance.hide();
    },
    newInstance: function() {
      this.jsInstance = new this.$bootstrap.Collapse(this.$refs.collapse);
      this.addEvents(["show.bs.collapse", "hide.bs.collapse"], this.disable);
      this.addEvents(["shown.bs.collapse", "hidden.bs.collapse"], this.enable);
    },
    destroyInstance: function() {
      this.removeEvents(["show.bs.collapse", "hide.bs.collapse"], this.disable);
      this.removeEvents(
        ["shown.bs.collapse", "hidden.bs.collapse"],
        this.enable
      );
      this.jsInstance.dispose();
      this.jsInstance = null;
    },
    addEvents: function(events, callback) {
      events.forEach(
        function(item) {
          this.$refs.collapse.addEventListener(item, callback);
        }.bind(this)
      );
    },
    removeEvents: function(events, callback) {
      events.forEach(
        function(item) {
          this.$refs.collapse.removeEventListener(item, callback);
        }.bind(this)
      );
    },
    enable: function() {
      this.allowed = true;
    },
    disable: function() {
      this.allowed = false;
    },
    toggle: function() {
      if (!this.lockToggle & this.allowed) {
        this.prop = false;
        this.shown = !this.shown;
      }
    }
  },
  watch: {
    modelValue: function(newValue) {
      this.prop = true;
      this.shown = newValue;
    }
  }
};
</script>
