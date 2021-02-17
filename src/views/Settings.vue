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
      <h2>Settings</h2>
      <hr />
      <h4 class="mb-3">General</h4>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h6>Email</h6>
            <span v-text="$store.state.auth && $store.state.auth.email"></span>
          </li>
          <li class="list-group-item">
            <div class="row g-2 align-items-center">
              <div class="col-lg">
                <div v-bind:class="{ 'text-muted': showNameForm }">
                  <h6>Display Name</h6>
                  <span
                    v-text="
                      $store.state.auth &&
                        $store.state.auth.firstName +
                          ' ' +
                          $store.state.auth.lastName
                    "
                  ></span>
                </div>
              </div>
              <div class="col-lg-auto">
                <button
                  class="btn btn-sm"
                  v-bind:class="showNameForm ? 'btn-light' : 'btn-primary'"
                  type="button"
                  v-on:click="$refs.nameForm.toggle()"
                >
                  <span
                    v-html="
                      $octicons[showNameForm ? 'x' : 'pencil'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="showNameForm ? 'Close' : 'Edit'"
                  ></span>
                </button>
              </div>
            </div>
            <collapse ref="nameForm" id="nameForm" v-model="showNameForm">
              <form
                class="mt-3 d-flex flex-column"
                action="/api/auth/user/edit"
                method="post"
              >
                <h6>Change Display Name</h6>
                <input
                  class="mb-2 form-control form-control-sm"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  v-bind:value="
                    $store.state.auth && $store.state.auth.firstName
                  "
                />
                <input
                  class="mb-3 form-control form-control-sm"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  v-bind:value="$store.state.auth && $store.state.auth.lastName"
                />
                <button
                  class="mt-auto btn btn-sm btn-primary align-self-end"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </collapse>
          </li>
          <li class="list-group-item">
            <div class="row g-2 align-items-center">
              <div class="col-lg">
                <div v-bind:class="{ 'text-muted': showContactForm }">
                  <h6>Contact No</h6>
                  <span
                    v-text="
                      ($store.state.auth && $store.state.auth.contact) ||
                        'Not Set'
                    "
                  ></span>
                </div>
              </div>
              <div class="col-lg-auto">
                <button
                  class="btn btn-sm"
                  v-if="$store.state.auth && $store.state.auth.contact"
                  v-bind:class="showContactForm ? 'btn-light' : 'btn-primary'"
                  type="button"
                  v-on:click="$refs.contactForm.toggle()"
                >
                  <span
                    v-html="
                      $octicons[showContactForm ? 'x' : 'pencil'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="showContactForm ? 'Close' : 'Edit'"
                  ></span>
                </button>
                <button
                  class="btn btn-sm"
                  v-else
                  v-bind:class="showContactForm ? 'btn-light' : 'btn-primary'"
                  type="button"
                  v-on:click="$refs.contactForm.toggle()"
                >
                  <span
                    v-html="
                      $octicons[showContactForm ? 'x' : 'plus'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="showContactForm ? 'Close' : 'Set Up'"
                  ></span>
                </button>
              </div>
            </div>
            <collapse
              ref="contactForm"
              id="contactForm"
              v-model="showContactForm"
            >
              <form
                class="mt-3 d-flex flex-column"
                action="/api/auth/user/edit"
                method="post"
              >
                <h6>Set Up / Change Contact No</h6>
                <input
                  class="mb-3 form-control form-control-sm"
                  type="text"
                  name="contact"
                  placeholder="Contact No"
                  v-bind:value="$store.state.auth && $store.state.auth.contact"
                />
                <button
                  class="mt-auto btn btn-sm btn-primary align-self-end"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </collapse>
          </li>
        </ul>
      </div>
      <hr />
      <h4>Authentication</h4>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="row g-2 align-items-center">
              <div class="col-lg">
                <div v-bind:class="{ 'text-muted': showCredentialForm }">
                  <h6>Login Credentials</h6>
                  <span
                    v-text="
                      (meta &&
                        meta.credentials &&
                        'Username: ' + meta.credentials.username) ||
                        'Not Set'
                    "
                  ></span>
                </div>
              </div>
              <div class="col-lg-auto">
                <button
                  class="btn btn-sm"
                  v-bind:class="
                    showCredentialForm ? 'btn-light' : 'btn-primary'
                  "
                  v-if="meta && meta.credentials"
                  type="button"
                  v-on:click="$refs.credentialForm.toggle()"
                >
                  <span
                    v-html="
                      $octicons[showCredentialForm ? 'x' : 'pencil'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="showCredentialForm ? 'Close' : 'Edit'"
                  ></span>
                </button>
                <button
                  class="btn btn-sm"
                  v-bind:class="
                    showCredentialForm ? 'btn-light' : 'btn-primary'
                  "
                  v-else
                  type="button"
                  v-on:click="$refs.credentialForm.toggle()"
                >
                  <span
                    v-html="
                      $octicons[showCredentialForm ? 'x' : 'plus'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="showCredentialForm ? 'Close' : 'Set Up'"
                  ></span>
                </button>
              </div>
            </div>
            <collapse
              ref="credentialForm"
              id="credentialForm"
              v-model="showCredentialForm"
            >
              <div class="d-lg-flex" v-if="meta && meta.credentials">
                <form
                  class="mt-3 flex-grow-1 d-flex flex-column"
                  action="api/auth/user/meta/edit"
                  method="post"
                >
                  <h6>Change Username</h6>
                  <input
                    class="mb-3 form-control form-control-sm"
                    type="text"
                    name="username"
                    placeholder="Username"
                    v-bind:value="
                      meta && meta.credentials && meta.credentials.username
                    "
                  />
                  <input
                    class="mb-3 form-control form-control-sm"
                    type="password"
                    name="passwordcurrent"
                    placeholder="Current Password"
                  />
                  <button
                    class="mt-auto btn btn-sm btn-primary align-self-end"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
                <div class="mx-2"></div>
                <form
                  class="mt-3 flex-grow-1 d-flex flex-column"
                  action="api/auth/user/meta/edit"
                  method="post"
                >
                  <h6>Change Password</h6>
                  <input
                    class="mb-2 form-control form-control-sm"
                    type="password"
                    name="password"
                    placeholder="New Password"
                  />
                  <input
                    class="mb-3 form-control form-control-sm"
                    type="password"
                    name="passwordconfirm"
                    placeholder="Confirm New Password"
                  />
                  <input
                    class="mb-3 form-control form-control-sm"
                    type="password"
                    name="passwordcurrent"
                    placeholder="Current Password"
                  />
                  <button
                    class="mt-auto btn btn-sm btn-primary align-self-end"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <form
                class="mt-3 d-flex flex-column"
                v-else
                action="api/auth/user/meta/add"
                method="post"
              >
                <h6>Create Login Credentials</h6>
                <input
                  class="mb-3 form-control form-control-sm"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  class="mb-2 form-control form-control-sm"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <input
                  class="mb-3 form-control form-control-sm"
                  type="password"
                  name="passwordconfirm"
                  placeholder="Confirm Password"
                />
                <button
                  class="mt-auto btn btn-sm btn-primary align-self-end"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </collapse>
          </li>
          <li class="list-group-item">
            <div class="row g-2 align-items-center">
              <div class="col-lg">
                <h6 class="mb-0">Facebook</h6>
              </div>
              <div class="col-lg-auto">
                <button
                  class="btn btn-sm"
                  v-bind:class="
                    hasProvider('facebook') ? 'btn-light' : 'btn-primary'
                  "
                  type="button"
                  v-bind:disabled="hasProvider('facebook')"
                >
                  <span
                    v-html="
                      $octicons['plug'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="hasProvider('facebook') ? 'Connected' : 'Connect'"
                  ></span>
                </button>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row g-2 align-items-center">
              <div class="col-lg">
                <h6 class="mb-0">Google</h6>
              </div>
              <div class="col-lg-auto">
                <button
                  class="btn btn-sm"
                  v-bind:class="
                    hasProvider('google') ? 'btn-light' : 'btn-primary'
                  "
                  type="button"
                  v-bind:disabled="hasProvider('google')"
                >
                  <span
                    v-html="
                      $octicons['plug'].toSVG({
                        width: 16,
                        height: 16,
                        class: 'd-inline-block align-text-bottom'
                      })
                    "
                  ></span>
                  <span
                    class="ms-1"
                    v-text="hasProvider('google') ? 'Connected' : 'Connect'"
                  ></span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="mt-auto">
    <nav-footer />
  </div>
  <sidenav ref="sidenav" />
</template>

<script>
import NavHeader from "../components/NavHeader.vue";
import Collapse from "../components/Collapse.vue";
import NavFooter from "../components/NavFooter.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Settings",
  components: {
    NavHeader,
    Collapse,
    NavFooter,
    Sidenav
  },
  data: function() {
    return {
      meta: null,
      showNameForm: false,
      showContactForm: false,
      showCredentialForm: false
    };
  },
  beforeMount: function() {
    this.$api
      .authUserMetaFind()
      .then(
        function(response) {
          this.meta = response.data;
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error(error);
          this.meta = null;
        }.bind(this)
      );
  },
  methods: {
    hasProvider: function(provider) {
      return (
        this.meta &&
        this.meta.providers &&
        this.meta.providers.find(function(item) {
          return item.name == provider;
        })
      );
    }
  }
};
</script>
