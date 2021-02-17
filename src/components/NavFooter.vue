+++++++++++++++++++++++++<template>
  <div class="bg-light-variant text-black">
    <div class="py-3 container-lg">
      <div class="row g-2">
        <div class="col-lg d-none d-lg-block align-self-center">
          <router-link to="/">
            <img class="mb-3 navbar-logo" src="../assets/logo.png" />
          </router-link>
          <p>
            11/7 Sethsiri Pl, Pannipitiya 10230<br />
            <a href="tel:+94740443788">
              +94740443788
            </a>
          </p>
        </div>
        <div class="col-lg-auto">
          <div class="px-lg-4">
            <h6 class="mb-3">Learn More</h6>
            <dl>
              <dd class="mb-1">
                <a class="text-reset" target="_blank" href="/guide">
                  How to sell
                </a>
              </dd>
              <dd class="mb-1">
                <a
                  class="text-reset"
                  target="_blank"
                  href="https://vendee-ceylon.medium.com/"
                >
                  News
                </a>
              </dd>
            </dl>
          </div>
        </div>
        <div class="col-lg-auto">
          <div class="px-lg-4">
            <h6 class="mb-3">Help and Support</h6>
            <dl>
              <dd class="mb-1">
                <a class="text-reset" target="_blank" href="/support">
                  Contact us
                </a>
              </dd>
              <dd class="mb-1">
                <a
                  class="text-reset"
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd_rYSdhGGpXhDXlGBnj0YhmDyxsvbEiXVzQYvhRmVBHzHkNg/viewform?embedded=true"
                >
                  Feedback
                </a>
              </dd>
            </dl>
          </div>
        </div>
        <div class="col-lg-auto">
          <div class="px-lg-4">
            <h6 class="mb-3">Social</h6>
            <dl>
              <dd class="mb-1">
                <a
                  class="text-reset"
                  target="_blank"
                  href="https://www.facebook.com/vendeeceylon/"
                >
                  Facebook
                </a>
              </dd>
              <dd class="mb-1">
                <a
                  class="text-reset"
                  target="_blank"
                  href="https://www.instagram.com/vendee_ceylon/"
                >
                  Instagram
                </a>
              </dd>
              <dd class="mb-1">
                <a
                  class="text-reset"
                  target="_blank"
                  href="https://twitter.com/vendee_ceylon"
                >
                  Twitter
                </a>
              </dd>
            </dl>
          </div>
        </div>
        <div class="col-lg-auto">
          <div class="px-lg-4">
            <h6 class="mb-3">About us</h6>
            <dl>
              <dd class="mb-1">
                <a class="text-reset" target="_blank" href="/about">
                  About us
                </a>
              </dd>
              <dd class="mb-1">
                <a class="text-reset" target="_blank" href="/terms">
                  Terms and Conditions
                </a>
              </dd>
              <dd class="mb-1">
                <a class="text-reset" target="_blank" href="/privacy">
                  Privacy Policy
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-primary text-white">
    <div class="py-1 container-lg">
      <small
        v-text="
          'Copyright @ VendeeCeylon.com 2020 - ' +
            new Date().getFullYear() +
            '. All rights reserved.'
        "
      ></small>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavFooter"
};
</script>
