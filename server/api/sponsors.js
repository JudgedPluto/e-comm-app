const dbPool = require("../db/connection");

module.exports.findAll = async function() {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindSponsors =
      "SELECT link, image_location AS img, background as bg " +
      "FROM sponsors " +
      "WHERE active = 1";
    let [rows] = await dbConnection.execute(sqlFindSponsors);

    let data = false;
    if (rows && rows.length != 0) {
      data = rows;
    }

    await dbConnection.release();

    return {
      error: null,
      result: data
    };
  } catch (error) {
    await dbConnection.release();

    return {
      error: error,
      data: null
    };
  }
};
