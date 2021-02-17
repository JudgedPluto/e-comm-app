const mysql = require("mysql2/promise");

const options = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "vendeece_main"
};

module.exports = mysql.createPool(options);
