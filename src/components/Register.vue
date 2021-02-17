<template>
  <form
    class="mb-3 needs-validation"
    action="/api/auth/user/add"
    method="post"
    ref="formRegister"
    v-on:submit="handleValidate"
    novalidate
  >
    <div class="mb-3">
      <input
        class="form-control"
        type="text"
        name="username"
        placeholder="Username"
        required
        v-on:input="validateUsername"
      />
      <div class="invalid-feedback">
        Please choose a username. Username must be at least 6 characters long
        and cannot contain any white spaces. Username can only contain lowercase
        letters, numbers and underscores.
      </div>
    </div>
    <div class="mb-2">
      <input
        class="form-control"
        type="password"
        name="password"
        placeholder="Password"
        required
        v-model="password"
        v-on:input="validatePassword"
      />
      <div class="invalid-feedback">
        Please specify a password. password must be at least 6 characters and
        can should contain at least
        <div>- One uppercase letter (A-Z)</div>
        <div>- One uppercase letter (a-z)</div>
        <div>- One number (0-9)</div>
        <div>- One special character (!@#$%^&amp;*)</div>
      </div>
    </div>
    <div class="mb-3">
      <input
        class="form-control"
        type="password"
        name="passwordconfirm"
        placeholder="Confirm Password"
        required
        v-on:input="validatePasswordConfirm"
      />
      <div class="invalid-feedback">
        Passwords do not match each other.
      </div>
    </div>
    <div class="mb-2">
      <input
        class="form-control"
        type="text"
        name="firstname"
        placeholder="First Name"
        required
        v-on:input="validateName"
      />
      <div class="invalid-feedback">
        Please specify your first name. Names can only contain spaces, uppercase
        and lowercase letters.
      </div>
    </div>
    <div class="mb-3">
      <input
        class="form-control"
        type="text"
        name="lastname"
        placeholder="Last Name"
        required
        v-on:input="validateName"
      />
      <div class="invalid-feedback">
        Please specify your last name. Names can only contain spaces, uppercase
        and lowercase letters.
      </div>
    </div>
    <div class="mb-3">
      <input
        class="form-control"
        type="email"
        name="email"
        placeholder="Email"
        required
        v-on:input="validateEmail"
      />
      <div class="invalid-feedback">
        Please specify your email.
      </div>
    </div>
    <div class="mb-3">
      <input
        class="form-control"
        type="text"
        name="contact"
        placeholder="Contact No (Optional)"
        v-on:input="validateContact"
      />
      <div class="invalid-feedback">
        Contact no should be at most 32 digits and can contain only numbers.
        (with or without plus sign followed by country code).
      </div>
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="consent"
          true-value="1"
          false-value="0"
          id="flexCheckConsent"
          required
        />
        <label class="form-check-label" for="flexCheckConsent">
          I agree to the
          <a href="/terms">Terms and Conditions</a>
          and
          <a href="/privacy">Privacy Policy</a>
        </label>
        <div class="invalid-feedback">
          You need to check this field to continue.
        </div>
      </div>
    </div>
    <button class="btn btn-primary w-100" type="submit">
      Register
    </button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      usernameRegex: /^\w{6,}$/,
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      password: null,
      nameRegex: /^[A-Za-z ]+$/,
      emailRegex: /^.+@.+\..+$/,
      contactRegex: /^[0-9+]{0,32}$/
    };
  },
  methods: {
    handleValidate: function(event) {
      if (!this.$refs.formRegister.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.$refs.formRegister.classList.add("was-validated");
    },
    validateUsername: function(event) {
      if (this.usernameRegex.test(event.target.value)) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("invalid");
      }
    },
    validatePassword: function(event) {
      if (this.passwordRegex.test(event.target.value)) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("invalid");
      }
    },
    validatePasswordConfirm: function(event) {
      if (this.password == event.target.value) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("invalid");
      }
    },
    validateName: function(event) {
      if (this.nameRegex.test(event.target.value)) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("invalid");
      }
    },
    validateEmail: function(event) {
      if (this.emailRegex.test(event.target.value)) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("invalid");
      }
    },
    validateContact: function(event) {
      if (this.contactRegex.test(event.target.value)) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("invalid");
      }
    }
  }
};
</script>
