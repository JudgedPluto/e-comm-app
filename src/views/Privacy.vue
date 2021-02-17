<template>
  <div class="py-2 sticky-top bg-light-variant">
    <nav-header
      v-on:login-click="$refs.auth.showModal()"
      v-on:more-click="$refs.sidenav.showSidenav()"
      v-on:query-input="
        $router.push('/search?query=' + encodeURIComponent($event))
      "
    />
  </div>
  <div class="flex-shrink-0">
    <div class="mb-3 py-3 container-lg">
      <h2>Privacy Policy</h2>
      <hr />
      <div>
        <p>
          At Vendee Ceylon, we are committed to protecting and safeguarding the
          privacy of all our visitors. Our Privacy Policy applies to all the
          Customers and Users and to all the goods and services displayed on
          vendeeceylon.com.
        </p>

        <p>
          This Privacy Policy discloses what occurs to any personal information
          that you enclose to us, or that we gather from you while you visit our
          Site. We do revise this Policy every now and then.
        </p>

        <p>
          <span class="h6">Use of Cookies</span> - Cookies give data with
          respect to the device used by a visitor. We may use cookies where it
          is fitting to assemble data about your device so as to help us in
          improving our Website to provide a better service next time.
        </p>

        <p>
          We may assemble data about your overall web use by utilizing your
          cookies.
        </p>

        <p>
          Where used, these cookies are downloaded to your device and usually
          stored within your device’s internal storage. Such data won't
          recognize you by or contain any personally identifying information.
          However, It is measurable information.. You can change the settings on
          your device to decrease any cookies in the event that you wish to do
          so. Our third party marketing vendors may likewise cookies, over which
          we have no control, such cookies (whenever utilized) would be
          downloaded once you click on ads on our site.
        </p>

        <p>
          <span class="h6">Personal Data Storage</span> – While carrying our
          tasks, activities or functions on our Website, it might get important
          to move information that we gather from you to Third Parties. By
          giving your own information to us, you consent to this exchange,
          storage or preparation. We assure our utmost to guarantee that all
          necessary steps are taken to ensure that all your information is dealt
          with safely. Unfortunately, the transaction of data through the web
          isn't absolutely secure and every so often such data can be breaches
          or compromised. We can't ensure the security of information that you
          decide to send us electronically therefore the transference of such
          data is totally at your own responsibility.
        </p>

        <p>
          <span class="h6">Use of your information</span> – We may use your
          information for the following reasons but not limited to:
        </p>
        <ul>
          <li>Offer any types of assistance or service</li>
          <li>Resolve questions, gather expenses, and investigate issues</li>
          <li>
            Encourage secure exchanging and implementation of our regulations
          </li>
          <li>
            Tweak clients experience, measure your interest in our services
          </li>
          <li>
            Improve our services and advise users about changes and updates
          </li>
          <li>
            Implement advertising schemes, product recommendation according to
            your interests and limited time offers to you as indicated by your
            preferences
          </li>
          <li>
            Execute different things for clients as depicted when we gather the
            data
          </li>
          <li>
            To give data to you identifying with different items that might hold
            any significance with you. Such extra data might be given where you
            have agreed on getting such data.
          </li>
          <li>
            In the event that you have recently bought merchandise or
            administrations from a seller who publicized an advertisement on our
            site, we may give to you details of comparable products or services,
            or different merchandise and courses, which you might be keen on.
          </li>
          <li>
            Where your consent has been given ahead of time we may permit chosen
            Outsiders to utilize your information to empower them to furnish you
            with data in regards to inconsequential merchandise and enterprises
            which we accept may intrigue you. Where such assent has been given
            it tends to be removed by you whenever you would like.
          </li>
          <li>
            To give data to you identifying with different items that might bear
            some significance with you. Such extra data might be given where you
            have consented to get such data.
          </li>
        </ul>
        <p>
          <span class="h6">External Links</span> - Sometimes links to other
          external websites may be linked on our site. Where an external link
          provided on our site doesn't imply that we support or endorse that
          site's strategy towards user security. We Vendee Ceylon are not
          responsible in such a case. You should carefully review their consumer
          privacy policy prior to sending them any personal information.
        </p>

        <p>
          <span class="h6">Security</span> - We realize that it is so vital to
          have a need to know that you are safe when utilizing your credit/debit
          card on the web. This is the reason we have utilized the best
          encryption techniques accessible today. You can be sure about the
          security of your credit/debit card when shopping on our site. We use
          various tools (encryption, passwords) to ensure your own data against
          unapproved access and breach. All personal information will be kept
          hidden by the site aside from those that you wish to publicize.
        </p>

        <p>
          <span class="h6">Communications and Email Correspondence</span> - You
          consent to get showcasing correspondences about customer products and
          enterprises for our outsider publicizing accomplices except if you
          disclose to us that you lean toward not to get such interchanges. On
          the off chance that you don't wish to get promoting interchanges from
          us, just demonstrate your inclination by following headings furnished
          with the correspondence. You may not utilize our site or specialized
          instruments to collect locations, send spam or in any case penetrate
          our Terms of Use or Privacy Policy. We may naturally check and
          physically channel email messages sent through our specialized
          instruments for vindictive action or precluded content. In the event
          that you utilize our instruments to send substance to a companion, we
          don't forever store your companions' locations or utilize or reveal
          them for promoting purposes. To report spam from different clients, if
          it's not too much trouble contact client service.
        </p>

        <p>
          <span class="h6">Disclosure</span> - We don't sell or lease clients'
          very own data to outsiders for their showcasing purposes without
          clients' explicit consent. We may reveal individual data to react to
          legitimate prerequisites, implement our strategies, react to claims
          that a posting or other substance disregards other's privileges, or
          secure anybody's privileges, property, or wellbeing.
        </p>

        <p>
          Feel free to get in touch with us anytime with respect to any issue
          associating with this Privacy Policy.
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
  name: "Privacy",
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
