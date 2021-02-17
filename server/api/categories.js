const dbPool = require("../db/connection");

module.exports.findAllSummary = async function() {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindCategories = "SELECT id, name FROM categories";
    let [rows] = await dbConnection.execute(sqlFindCategories);

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
    const sqlFindCategories =
      "SELECT c.id, c.name, COUNT(a.id) AS count, c.description, c.image_location as image " +
      "FROM categories c LEFT JOIN adverts a ON a.category_id = c.id " +
      "GROUP BY id";
    let [rows] = await dbConnection.execute(sqlFindCategories);

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
