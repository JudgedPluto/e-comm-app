const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStratergy = require("passport-facebook").Strategy;
const GoogleStratergy = require("passport-google-oauth2").Strategy;

const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const authConfig = require("./auth/config");
const mailConfig = require("./mail/config");
const imageConfig = require("./images/config");

const users = require("./auth/users");
const currencies = require("./api/currencies");
const categories = require("./api/categories");
const districts = require("./api/districts");
const adverts = require("./api/adverts");
const sponsors = require("./api/sponsors");

passport.use(
  new LocalStrategy(async function(username, password, callback) {
    let userId = await users.checkUserByCredentials(username, password);
    if (userId.error) {
      return callback(userId.error);
    }
    if (!userId.result.found) {
      // TODO: Error handling at local authentication level.
      return callback(null, false);
    }

    let user = await users.getUser(userId.result.id);
    callback(user.error, user.result);
  })
);

passport.use(
  new FacebookStratergy(authConfig.facebook, async function(
    accessToken,
    refreshToken,
    profile,
    callback
  ) {
    let userId = await users.checkUserByProvider(profile.id, "facebook");
    if (userId.error) {
      return callback(userId.error);
    }

    let id;
    if (!userId.result.found) {
      let userData = {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      };

      let newUserId = await users.addUserByProvider(
        userData,
        profile.id,
        "facebook"
      );
      if (newUserId.error) {
        return callback(newUserId.error);
      }

      id = newUserId.result.id;
    } else {
      id = userId.result.id;
    }

    let user = await users.getUser(id);
    callback(user.error, user.result);
  })
);

passport.use(
  new GoogleStratergy(authConfig.google, async function(
    accessToken,
    refreshToken,
    profile,
    callback
  ) {
    let userId = await users.checkUserByProvider(profile.id, "google");
    if (userId.error) {
      return callback(userId.error);
    }

    let id;
    if (!userId.result.found) {
      let userData = {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      };

      let newUserId = await users.addUserByProvider(
        userData,
        profile.id,
        "google"
      );
      if (newUserId.error) {
        return callback(newUserId.error);
      }

      id = newUserId.result.id;
    } else {
      id = userId.result.id;
    }

    let user = await users.getUser(id);
    callback(user.error, user.result);
  })
);

passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(async function(id, callback) {
  let user = await users.getUser(id);
  callback(user.error, user.result);
});

const transporter = nodemailer.createTransport(mailConfig.noReply);

const app = express();
const sessionParser = require("express-session")({
  secret: "vendee ceylon secret",
  resave: false,
  saveUninitialized: false
});

app.use("/images", express.static("images"));
app.use(express.static("public"));

nunjucks.configure("mail", {
  autoescape: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessionParser);

app.use(passport.initialize());
app.use(passport.session());

let authRoute = express.Router();
let apiRoute = express.Router();
let viewRoute = express.Router();

authRoute.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/error?code=login"
  }),
  function(req, res) {
    res.redirect("/success?code=login");
  }
);

authRoute.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/error?code=login"
  }),
  function(req, res) {
    res.redirect("/success?code=login");
  }
);

authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error?code=login"
  }),
  function(req, res) {
    res.redirect("/success?code=login");
  }
);

authRoute.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

authRoute.get("/user/find", function(req, res) {
  res.send(req.isAuthenticated() ? req.user : false);
});

authRoute.post("/user/add", async function(req, res, next) {
  let userData = {
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    contact: req.body.contact
  };

  let newUserId = await users.addUserByCredentials(
    userData,
    req.body.username,
    req.body.password
  );
  if (newUserId.error) {
    return next(newUserId.error);
  }

  let user = await users.getUser(newUserId.result.id);
  if (user.error) {
    return next(user.error);
  }

  req.login(user.result, function(error) {
    if (error) {
      return next(error);
    }
    res.redirect("/success?code=user_add");
  });
});

authRoute.post("/user/edit", async function(req, res, next) {
  let userData = {
    firstName:
      req.body.firstname && req.body.firstname.length != 0
        ? req.body.firstname
        : undefined,
    lastName:
      req.body.lastname && req.body.lastname.length != 0
        ? req.body.lastname
        : undefined,
    contact:
      req.body.contact && req.body.contact.length != 0
        ? req.body.contact
        : undefined
  };

  let userId = req.user.id;

  let editUserStatus = await users.editUser(userId, userData);
  if (editUserStatus.error) {
    return next(editUserStatus.error);
  }

  // TODO: Error handling at user edit level.
  if (!editUserStatus.result.success) {
    return res.redirect("/error?code=user_edit");
  }

  res.redirect("/success?code=user_edit");
});

authRoute.get("/user/meta/find", async function(req, res, next) {
  let result = false;

  if (req.isAuthenticated()) {
    let authData = await users.getAuthenticationData(req.user.id);
    if (authData.error) {
      return next(authData.error);
    }

    result = authData.result;
  }

  res.send(result);
});

authRoute.post("/user/meta/add", async function(req, res, next) {
  let addCredentialStatus = await users.addCredentials(
    req.user.id,
    req.body.username,
    req.body.password
  );
  if (addCredentialStatus.error) {
    return next(addCredentialStatus.error);
  }

  // TODO: Error handling at add credentials level.
  if (!addCredentialStatus.result.success) {
    return res.redirect("/error?code=meta_add");
  }

  res.redirect("/success?code=meta_add");
});

authRoute.post("/user/meta/edit", async function(req, res, next) {
  let authData = {
    username:
      req.body.username && req.body.username.length != 0
        ? req.body.username
        : undefined,
    password:
      req.body.password && req.body.password.length != 0
        ? req.body.password
        : undefined
  };

  let editCredentialsStatus = await users.editCredentials(
    req.user.id,
    authData,
    req.body.passwordcurrent
  );
  if (editCredentialsStatus.error) {
    next(editCredentialsStatus.error);
  }

  // TODO: Error handling at edit credentials level.
  if (!editCredentialsStatus.result.success) {
    return res.redirect("/error?code=meta_edit");
  }

  res.redirect("/success?code=meta_edit");
});

authRoute.get("/verify", async function(req, res, next) {
  let verifiedUserId = await users.checkVerification(
    req.query.id,
    req.query.key
  );
  if (verifiedUserId.error) {
    return next(verifiedUserId.error);
  }

  if (!verifiedUserId.result.verified) {
    return res.redirect("/error?code=verify");
  }

  let user = await users.getUser(verifiedUserId.result.id);
  if (user.error) {
    return next(user.error);
  }

  req.login(user.result, function(error) {
    if (error) {
      return next(error);
    }
    res.redirect("/success?code=verify");
  });
});

authRoute.get("/verify/request", async function(req, res, next) {
  let user = req.user;

  let verifyData = await users.addVerification(user.id);
  if (verifyData.error) {
    return next(verifyData.error);
  }

  let response = nunjucks.render("verify.njk", {
    link: mailConfig.verifyHost.concat(
      "/api/auth/verify?id=",
      verifyData.result.id,
      "&key=",
      verifyData.result.key
    )
  });

  await transporter.sendMail({
    from: "Vendee Ceylon <noreply@vendeeceylon.com>",
    to: user.email,
    subject: "Verify your email",
    html: response
  });

  res.redirect("/success?code=verify_request");
});

apiRoute.get("/categories/all", async function(req, res, next) {
  let categoryList;

  if (parseInt(req.query.summary)) {
    categoryList = await categories.findAllSummary();
  } else {
    categoryList = await categories.findAll();
  }
  if (categoryList && categoryList.error) {
    return next(categoryList.error);
  }

  res.send(categoryList.result);
});

apiRoute.get("/districts/all", async function(req, res, next) {
  let districtList;

  if (parseInt(req.query.summary)) {
    districtList = await districts.findAllSummary();
  } else {
    districtList = await districts.findAll();
  }
  if (districtList && districtList.error) {
    return next(districtList.error);
  }

  res.send(districtList.result);
});

apiRoute.get("/currencies/all", async function(req, res, next) {
  let currencyList = await currencies.findAll();
  if (currencyList.error) {
    return next(currencyList.error);
  }

  res.send(currencyList.result);
});

apiRoute.get("/adverts/all", async function(req, res, next) {
  let minPrices = {
    0: undefined,
    1: undefined,
    2: 1000,
    3: 5000,
    4: 10000
  };

  let maxPrices = {
    0: undefined,
    1: 999,
    2: 4999,
    3: 9999,
    4: undefined
  };

  let sorts = {
    1: {
      column: "boosted",
      reverse: true
    },
    2: {
      column: "dateCreated",
      reverse: true
    },
    3: {
      column: "dateCreated",
      reverse: false
    },
    4: {
      column: "priceAdj",
      reverse: false
    },
    5: {
      column: "priceAdj",
      reverse: true
    }
  };

  let options = {
    exclude:
      req.query.exclude && !isNaN(parseInt(req.query.exclude))
        ? req.query.exclude
        : undefined,
    user:
      req.query.user && req.query.user.length != 0 ? req.query.user : undefined,
    query:
      req.query.query && req.query.query.length != 0
        ? req.query.query
        : undefined,
    category:
      req.query.category && !isNaN(parseInt(req.query.category))
        ? parseInt(req.query.category)
        : 0,
    district:
      req.query.district && !isNaN(parseInt(req.query.district))
        ? parseInt(req.query.district)
        : 0,
    overseas:
      req.query.overseas && !isNaN(parseInt(req.query.overseas))
        ? parseInt(req.query.overseas)
        : 0,
    currency:
      req.query.currency && !isNaN(parseInt(req.query.currency))
        ? parseInt(req.query.currency)
        : 1,
    minPrice:
      req.query.price && !isNaN(parseInt(req.query.price))
        ? minPrices[parseInt(req.query.price)]
        : minPrices[0],
    maxPrice:
      req.query.price && !isNaN(parseInt(req.query.price))
        ? maxPrices[parseInt(req.query.price)]
        : maxPrices[0],
    sort:
      req.query.sort && !isNaN(parseInt(req.query.sort))
        ? sorts[parseInt(req.query.sort)]
        : sorts[1],
    limit:
      req.query.limit && !isNaN(parseInt(req.query.limit))
        ? parseInt(req.query.limit)
        : undefined,
    offset:
      req.query.offset && !isNaN(parseInt(req.query.offset))
        ? parseInt(req.query.offset)
        : undefined
  };
  let advertList;

  if (parseInt(req.query.summary)) {
    advertList = await adverts.findAll(options, true);
  } else {
    advertList = await adverts.findAll(options, false);
  }
  if (advertList && advertList.error) {
    return next(advertList.error);
  }

  res.send(advertList.result);
});

apiRoute.get("/adverts/find", async function(req, res, next) {
  let advertData;

  if (parseInt(req.query.summary)) {
    advertData = await adverts.find(req.query.id, true);
  } else {
    advertData = await adverts.find(req.query.id, false);
  }
  if (advertData && advertData.error) {
    return next(advertData.error);
  }

  res.send(advertData.result);
});

apiRoute.post("/adverts/add", async function(req, res, next) {
  if (req.isAuthenticated() && req.user.verifyStatus) {
    let advertData = {
      title: req.body.title || null,
      description: req.body.description || null,
      price: req.body.price || null,
      currencyId: req.body.currency || null,
      categoryId: req.body.category || null,
      districtId: req.body.district || null,
      userId: req.user.id || null,
      negotiable: req.body.negotiable && parseInt(req.body.negotiable) ? 1 : 0,
      overseas: req.body.overseas && parseInt(req.body.overseas) ? 1 : 0,
      images: req.body.images || null
    };

    let addAdvertStatus = await adverts.add(advertData);
    if (addAdvertStatus.error) {
      return next(addAdvertStatus.error);
    }

    res.send(addAdvertStatus.result);
  } else {
    res.status(401).send("Cannot post adverts without verification.");
  }
});

apiRoute.post("/adverts/edit", async function(req, res, next) {
  if (req.isAuthenticated() && req.user.verifyStatus) {
    let advertData = {
      title: req.body.title || null,
      description: req.body.description || null,
      price: req.body.price || null,
      currencyId: req.body.currency || null,
      districtId: req.body.district || null,
      negotiable: req.body.negotiable && parseInt(req.body.negotiable) ? 1 : 0,
      overseas: req.body.overseas && parseInt(req.body.overseas) ? 1 : 0,
      images: req.body.images || null
    };

    let editAdvertStatus = await adverts.edit(req.body.id, advertData);
    if (editAdvertStatus.error) {
      return next(editAdvertStatus.error);
    }

    res.send(editAdvertStatus.result);
  } else {
    res.status(401).send("Cannot edit adverts without verification.");
  }
});

apiRoute.post("/adverts/boost", async function(req, res, next) {
  if (req.isAuthenticated() && req.user.verifyStatus) {
    let boostAdvertStatus = await adverts.boost(req.body.id);
    if (boostAdvertStatus.error) {
      return next(boostAdvertStatus.error);
    }

    res.send(boostAdvertStatus.result);
  } else {
    res.status(401).send("Cannot boost adverts without verification.");
  }
});

apiRoute.get("/sponsors/all", async function(req, res, next) {
  let sponsorsList = await sponsors.findAll();
  if (sponsorsList.error) {
    return next(sponsorsList.error);
  }

  res.send(sponsorsList.result);
});

apiRoute.post(
  "/images/add",
  multer(imageConfig.advert).single("image"),
  function(req, res) {
    res.send({ path: "/" + req.file.destination + req.file.filename });
  }
);

apiRoute.post("/images/delete", function(req, res) {
  let imagePath = req.body.path.slice(1);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  res.send({ success: true });
});

viewRoute.get("*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.use("/api/auth", authRoute);
app.use("/api", apiRoute);
app.use(viewRoute);

module.exports.app = app;
