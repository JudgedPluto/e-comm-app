<template>
  <div
    class="p-3 toast-container position-fixed bottom-0 start-0"
    aria-live="polite"
    aria-atomic="true"
  >
    <div
      class="toast text-white border-0"
      v-bind:class="'bg-' + (item.type ? item.type : 'primary')"
      v-for="item in notifyList"
      v-bind:key="item.id"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-bind:ref="item.id"
    >
      <div class="d-flex align-items-center">
        <div class="toast-body" v-html="item.msg"></div>
        <button
          class="me-2 btn-close btn-close-white ms-auto"
          type="button"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import Notifications from "../notifications";

export default {
  name: "Notification",
  data: function() {
    return {
      notifyList: [],
      notifyToast: []
    };
  },
  mounted: function() {
    let has = function(list, checkItem) {
      return !!(
        list &&
        list.find(function(item) {
          return checkItem.id == item.id;
        })
      );
    };
    this.$watch(
      "notifyList",
      function(newValue, oldValue) {
        let added = newValue
          ? newValue.filter(function(item) {
              return has(newValue, item) && !has(oldValue, item);
            })
          : [];
        let removed = oldValue
          ? oldValue.filter(function(item) {
              return has(oldValue, item) && !has(newValue, item);
            })
          : [];

        added.forEach(
          function(item) {
            let ref = this.$refs[item.id];
            let toast = new this.$bootstrap.Toast(ref, {
              autohide: false
            });
            ref.addEventListener(
              "hidden.bs.toast",
              function() {
                this.notifyList = this.notifyList.filter(
                  function(checkItem) {
                    return checkItem.id != item.id;
                  }.bind(this)
                );
              }.bind(this)
            );
            this.notifyToast.push({
              id: item.id,
              toastRef: toast
            });
            toast.show();
          }.bind(this)
        );

        this.notifyToast
          .filter(function(toast) {
            return has(removed, toast);
          })
          .forEach(function(toast) {
            toast.toastRef.dispose();
          });
        this.notifyToast = this.notifyToast.filter(function(toast) {
          return !has(removed, toast);
        });
      },
      { immediate: true, flush: "post" }
    );
  },
  methods: {
    add: function(id) {
      let notify = Notifications.filter(function(notification) {
        return notification.id == id;
      });
      let hasRef = this.notifyList.find(function(item) {
        return item.id == id;
      });
      if (!hasRef) {
        let notifyListCopy = this.notifyList.slice(0);
        notifyListCopy.push(notify[0]);
        this.notifyList = notifyListCopy;
      }
    },
    remove: function() {}
  }
};
</script>
