<template>
  <div class="py-2 sticky-top bg-light-variant">
    <nav-header
      v-on:login-click="$refs.auth.showModal()"
      v-on:query-input="
        $router.push('/search?query=' + encodeURIComponent($event))
      "
      v-on:more-click="$refs.sidenav.showSidenav()"
    />
  </div>
  <div class="flex-shrink-0">
    <div class="mb-3 py-3 container-lg">
      <h2>Terms and Conditions</h2>
      <hr />
      <div>
        <p>
          VendeeCeylon.com is a classified advertising platform which allows
          both sellers and buyers to publish classified ads to sell or buy
          products and services. All the users of VendeeCeylon.com (both buyers
          and sellers), should be read the following terms and conditions before
          using the site and abide by them.
        </p>
        <ul>
          <li>
            VendeeCeylon.com holds the right, whenever, to alter all or part of
            the Terms and Conditions. Buyers and sellers are encouraged to
            examine them thoroughly before they use the site.
          </li>
          <li>
            Buyers and Sellers are needed to present a legitimate email address,
            before they are permitted to publicize advertisements. The email
            address of the User will not be freely shown, and different users
            are allowed to send email to the User through VendeeCeylon.com.
          </li>
          <li>
            VendeeCeylon.com’s team has the privilege to Publish, not to
            distribute or Un-distribute an Advertisement, make any adjustment,
            edit, hinder or erase any user, ad, membership and content of the
            published advertisement or any assistance given by us without
            earlier notification or consent.
          </li>
          <li>
            Buyers and Sellers ought to guarantee that promoting content, text,
            pictures, and videography published for incorporation on
            VendeeCeylon.com do conform to all appropriate laws.
            VendeeCeylon.com and it's team won't assume any liability for any
            wrongdoing or any error of the Contents of published advertisements.
            It would be the Vendor's obligation to guarantee availability and
            readiness of the specific purpose behind the items and service they
            offer through the Site.
          </li>
          <li>
            VendeeCeylon.com vows to be as exact as could be expected under the
            circumstances. Nonetheless, VendeeCeylon.com doesn't warrant that
            the item portrayals given by the sellers or buyers of this Site is
            exact, finished, dependable, current, or free of errors. In the
            event that an item offered through the Site itself isn't as
            portrayed, and you are not happy with the purchase, your sole
            solution is to contact the seller directly to restore it, in its
            unused condition to the Vendor concerned. While VendeeCeylon.com
            will not be responsible in anyway as VendeeCeylon.com only acts as
            an intermediary between the buyer and the seller for the
            items/services listed on the site therefore not responsible for any
            of the items listed. VendeeCeylon.com also will not be responsible
            in refunds or returns involved.
          </li>
          <li>
            Stock of all items promoted on VendeeCeylon.com are not overseen or
            kept up by VendeeCeylon.com. VendeeCeylon.com just goes about as a
            mediator between the seller and the buyer for such items. These
            items may not be accessible (run unavailable) occasionally due to
            overselling by the providers, and VendeeCeylon.com will not be
            responsible in this regard.
          </li>
          <li>
            Buyers and Sellers should guarantee that publicized content doesn’t
            disregard any copyright, protected innovation rights or some other
            right of any individual or party. Buyers and Sellers consent to
            release VendeeCeylon.com and its team from all commitments,
            liabilities and entitlements emerging regarding infringement of said
            rights.
          </li>
          <li>
            Buyers and Sellers provide sole power to VendeeCeylon.com and its
            team to utilize, recreate, adjust or distribute the substance of
            commercials in any form.
          </li>
          <li>
            For editing purposes VendeeCeylon.com and its team maintain whatever
            authority is needed to change the title or the Content of an
            advertisement. Additionally, they hold the privilege not to publish
            pictures that are unrelated/unnecessary or pictures that abuse the
            VendeeCeylon.com rules or the common law.
          </li>
          <li>
            VendeeCeylon.com and Its team reserve the privilege to help out
            authorities in the event of infringement the law by any distributed
            publication. The character of seller or buyer might be revealed with
            the accessible data in such cases.
          </li>
          <li>
            Some data of buyers and sellers will be accessible before post their
            commercials. Buyers and sellers give their agreement to
            VendeeCeylon.com and its team to utilize those data for
            organization, advertising and examination purposes so as to improve
            the VendeeCeylon.com.
          </li>
          <li>
            VendeeCeylon.com utilizes cookies, which implies that you should
            have cookies enabled on your device all together for all usefulness
            on this site to work appropriately. A cookie is a little information
            record that is kept in touch with your device’s internal storage
            when you visit certain Web page. Cookies records contain certain
            data, for example, a random number, user ID, that the site allocates
            to a visitor to follow the pages visited. A cookie can't read
            information off your internal storage or read other cookies records
            made by different webpages. Cookies, without anyone else, can't be
            utilized to discover the any personal details of any user.
          </li>
          <li>
            VendeeCeylon.com and its team don't ensure constant or secure entree
            to the Web Site. The Web Site is given "with no guarantees" and as
            and when accessible.
          </li>
          <li>
            Buyers and sellers consent to repay VendeeCeylon.com and its team
            just as all other relevant entities from and against all
            misfortunes, costs, harms and costs, including lawyer's expenses,
            coming about because of any infringement of this Terms and
            Conditions. Buyers and Sellers consent to repay VendeeCeylon.com
            just as its officials, owners, managers, employees, from and against
            all misfortunes, costs, harms and costs, including lawyer's charges,
            coming about because of any infringement of this Terms and
            Conditions (counting careless or improper actions).
          </li>
        </ul>
        <p>
          VendeeCeylon.com maintains whatever authority is needed to alter these
          Terms and Conditions. Such adjustments will be taking effect as soon
          as they are posted on Vendee Ceylon. You are accountable for the
          inspecting of such changes. Your proceeded access or utilization of
          VendeeCeylon.com will be regarded your acknowledgment of the updated
          terms and conditions.
        </p>
        <p>
          VendeeCeylon.com is operated under the laws and regulations of
          Democratic Socialist Republic of Sri Lanka.
        </p>
      </div>
    </div>
  </div>
  <div class="mt-auto">
    <nav-footer />
  </div>
  <authentication ref="auth" />
  <sidenav ref="sidenav" v-on:login-click="$refs.auth.showModal()" />
</template>

<script>
import NavHeader from "../components/NavHeader.vue";
import NavFooter from "../components/NavFooter.vue";
import Authentication from "../components/Authentication.vue";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "Terms",
  components: {
    NavHeader,
    NavFooter,
    Authentication,
    Sidenav
  },
  beforeRouteEnter: function(to, from, next) {
    next(function(vm) {
      if (to.query.login) {
        vm.$refs.auth.showModal();
        let query = Object.assign({}, to.query);
        delete query.login;
        vm.$router.replace({ query: query });
      }
    });
  },
  beforeRouteUpdate: function(to) {
    if (to.query.login) {
      this.$refs.auth.showModal();
      let query = Object.assign({}, to.query);
      delete query.login;
      this.$router.replace({ query: query });
    }
  }
};
</script>
