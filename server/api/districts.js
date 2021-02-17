const dbPool = require("../db/connection");

module.exports.findAllSummary = async function() {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindDistricts = "SELECT id, name FROM districts";
    let [rows] = await dbConnection.execute(sqlFindDistricts);

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
      result: null
    };
  }
};

module.exports.findAll = async function() {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindDistricts =
      "SELECT d.id, d.name, COUNT(ad.advert_id) AS count " +
      "FROM districts d LEFT JOIN adverts_district ad ON ad.district_id = d.id " +
      "GROUP BY d.id";
    let [rows] = await dbConnection.execute(sqlFindDistricts);

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
