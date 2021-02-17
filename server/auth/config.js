module.exports = {
  google: {
    clientID:
      "476409480149-1tmb4rnmp572ijt9slhtlnl4cnjl7rmt.apps.googleusercontent.com",
    clientSecret: "OYom0RvfUcUXg84MyVZBHEUn",
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  facebook: {
    clientID: "1290503891290817",
    clientSecret: "d1b429ca63c47b440de70c8fef7f8192",
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileFields: ["id", "email", "first_name", "last_name"]
  }
};
