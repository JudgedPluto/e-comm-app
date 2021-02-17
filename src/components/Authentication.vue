<template>
  <div
    class="modal fade"
    ref="authModal"
    tabindex="-1"
    aria-labelledby="authModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered  modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-body">
          <div class="mb-3 row g-2 align-items-center">
            <div class="col">
              <nav class="nav nav-pills nav-fill" id="tab" role="tablist">
                <a
                  class="nav-link active"
                  id="login-tab"
                  data-bs-toggle="pill"
                  href="#login-nav"
                  role="tab"
                  aria-controls="login-nav"
                  aria-selected="true"
                  >Login</a
                >
                <a
                  class="nav-link"
                  id="register-tab"
                  data-bs-toggle="pill"
                  href="#register-nav"
                  role="tab"
                  aria-controls="register-nav"
                  aria-selected="false"
                  >Register</a
                >
              </nav>
            </div>
            <div class="col-auto">
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div class="tab-content" id="tab-content">
            <div
              class="tab-pane fade show active"
              id="login-nav"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <login />
            </div>
            <div
              class="tab-pane fade"
              id="register-nav"
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              <register />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  name: "Authentication",
  components: { Login, Register },
  data: function() {
    return {
      jsInstance: null
    };
  },
  methods: {
    showModal: function() {
      if (!this.jsInstance) {
        this.newInstance();
      }
      this.jsInstance.show();
    },
    hideModal: function() {
      if (!this.jsInstance) {
        this.newInstance();
      }
      this.jsInstance.hide();
    },
    newInstance: function() {
      this.jsInstance = new this.$bootstrap.Modal(this.$refs.authModal);
    },
    destroyInstance: function() {
      this.jsInstance.dispose();
      this.jsInstance = null;
    }
  }
};
</script>
