const path = require("path");
const multer = require("multer");

const advertStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "images/i_advert/");
  },
  filename: function(req, file, callback) {
    callback(null, "advert-" + Date.now() + path.extname(file.originalname));
  }
});

const profileStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "images/i_profile/");
  },
  filename: function(req, file, callback) {
    callback(null, "profile-" + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function(req, file, callback) {
  if (!file.mimetype.match(/(jpeg|png|webp)$/)) {
    // TODO: Error handling at non-image uploading.
    return callback("Error Shown Here!", false);
  }
  callback(null, true);
};

module.exports = {
  advert: {
    storage: advertStorage,
    fileFilter: imageFilter
  },
  profile: {
    storage: profileStorage,
    fileFilter: imageFilter
  }
};
