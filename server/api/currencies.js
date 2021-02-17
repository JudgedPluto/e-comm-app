const dbPool = require("../db/connection");

module.exports.findAll = async function() {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindCurrencies = "SELECT id, name FROM currencies";
    let [rows] = await dbConnection.execute(sqlFindCurrencies);

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
