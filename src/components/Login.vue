<template>
  <form class="mb-3" action="/api/auth/login" method="post">
    <input
      class="mb-3 form-control"
      type="text"
      name="username"
      placeholder="Username"
    />
    <input
      class="mb-3 form-control"
      type="password"
      name="password"
      placeholder="Password"
    />
    <button class="mb-3 btn btn-primary w-100" type="submit">Login</button>
    <p class="text-center">or</p>
    <a class="mb-3 btn btn-primary w-100" href="/api/auth/facebook">
      Login using Facebook
    </a>
    <a class="btn btn-primary w-100" href="/api/auth/google">
      Login using Google
    </a>
  </form>
</template>

<script>
export default {
  name: "Login"
};
</script>
