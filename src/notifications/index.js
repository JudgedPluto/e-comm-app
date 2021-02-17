export default [
  {
    id: "verify_notify",
    type: "danger",
    msg: `
    <p class="mb-2">
      Your account is not verified. To verify your account, click the button
      below to send a verification email.
    </p>
    <a class="btn btn-sm btn-primary" href="/api/auth/verify/request">
      Send Email
    </a>
    `
  },
  {
    id: "verify_sent",
    type: "success",
    msg: `
    <p class="mb-2">
      Verification email sent. Check your inbox.<br>
      Didn't receive one? You can send another by clicking the button below.
    </p>
    <a class="btn btn-sm btn-primary" href="/api/auth/verify/request">
      Send Email
    </a>
    `
  },
  {
    id: "verify_success",
    type: "success",
    msg: `
    <p class="mb-0">
      Congratulations! you have successfully verified your account.<br>
      Good luck on your first advertisement!
    </p>
    `
  },
  {
    id: "verify_failure",
    type: "danger",
    msg: `
    <p class="mb-0">
      Verification failed.<br>
      You might be already verified or you clicked on a verification link that
      have already been expired.
    </p>
    `
  },
  {
    id: "advert_add_error",
    type: "danger",
    msg: `
    <p class="mb-0">
      Error adding advertisement.<br>
      Check whether any mistakes you have made during ad creation.
    </p>
    `
  }
];
