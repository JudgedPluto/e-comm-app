<template>
  <router-view v-on:notfication-add="$refs.notification.add($event)" />
  <notification ref="notification" />
  <whatsapp-button />
</template>

<script>
import Notification from "./components/Notification.vue";
import WhatsappButton from "./components/WhatsappButton.vue";

export default {
  name: "App",
  components: { Notification, WhatsappButton },
  mounted: function() {
    this.$router.beforeEach(
      async function(to, from) {
        try {
          let response = await this.$api.authUserFind();
          this.$store.commit("setAuth", response.data ? response.data : null);
          if (to.meta.requiresAuth && !this.$store.state.auth) {
            return {
              path: from.path,
              query: Object.assign({}, from.query, { login: 1 })
            };
          }
          if (this.$store.state.auth && to.path == "/add") {
            if (!this.$store.state.auth.verifyStatus) {
              this.$refs.notification.add("verify_notify");
              return false;
            }
          }
          if (to.path == "/success") {
            switch (to.query.code) {
              case "login":
              case "user_add":
              case "advert_add": {
                return {
                  path: "/"
                };
              }
              case "user_edit":
              case "meta_add":
              case "meta_edit": {
                return {
                  path: "/settings"
                };
              }
              case "verify_request": {
                this.$refs.notification.add("verify_sent");
                return {
                  path: "/"
                };
              }
              case "verify": {
                this.$refs.notification.add("verify_success");
                return {
                  path: "/"
                };
              }
              case "advert_edit": {
                return {
                  path: "/user"
                };
              }
            }
          }
          if (to.path == "/error") {
            switch (to.query.code) {
              case "verify": {
                this.$refs.notification.add("verify_failure");
                return {
                  path: "/"
                };
              }
            }
          }
        } catch (error) {
          console.error(error);
          this.$store.commit("setAuth", null);
        }
      }.bind(this)
    );
  }
};
</script>
