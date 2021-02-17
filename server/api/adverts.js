const dbPool = require("../db/connection");

module.exports.findAll = async function(searchData, summary) {
  let dbConnection = await dbPool.getConnection();
  try {
    let queryDataFlat = [];
    let sqlFindAdverts;

    if (summary) {
      sqlFindAdverts =
        "SELECT a.id, a.title, UNIX_TIMESTAMP(a.created_at) AS dateCreated, " +
        "IF(DATE_ADD(a.boosted_at, INTERVAL 7 DAY) > CURDATE(), TRUE, FALSE) AS boosted " +
        "FROM adverts a " +
        "LEFT JOIN (" +
        "SELECT ad.advert_id, ad.district_id, d.name " +
        "FROM adverts_district ad, districts d " +
        "WHERE ad.district_id = d.id" +
        ") sq1 " +
        "ON sq1.advert_id = a.id " +
        "LEFT JOIN (" +
        "SELECT ai.advert_id, ai.image_location " +
        "FROM adverts_image ai " +
        "WHERE ai.id IN (" +
        "SELECT min(id) " +
        "FROM adverts_image " +
        "GROUP BY advert_id" +
        ")" +
        ") sq2 " +
        "ON sq2.advert_id = a.id, " +
        "categories c, users u, currencies r " +
        "WHERE a.category_id = c.id " +
        "AND a.user_id = u.id " +
        "AND a.currency_id = r.id ";
    } else {
      sqlFindAdverts =
        "SELECT a.id, a.title, UNIX_TIMESTAMP(a.created_at) AS dateCreated, " +
        "IF(DATE_ADD(boosted_at, INTERVAL 7 DAY) > CURDATE(), TRUE, FALSE) AS boosted, " +
        "JSON_OBJECT('fname', u.fname, 'lname', u.lname) AS seller, " +
        "CAST(a.price AS DECIMAL(13, 2)) AS price, r.name AS currency, r.locale, " +
        "r.factor, a.negotiable, a.overseas, " +
        "c.name AS category, sq1.name AS district, sq2.image_location AS image " +
        "FROM adverts a " +
        "LEFT JOIN (" +
        "SELECT ad.advert_id, ad.district_id, d.name " +
        "FROM adverts_district ad, districts d " +
        "WHERE ad.district_id = d.id" +
        ") sq1 " +
        "ON sq1.advert_id = a.id " +
        "LEFT JOIN (" +
        "SELECT ai.advert_id, ai.image_location " +
        "FROM adverts_image ai " +
        "WHERE ai.id IN (" +
        "SELECT min(id) " +
        "FROM adverts_image " +
        "GROUP BY advert_id" +
        ")" +
        ") sq2 " +
        "ON sq2.advert_id = a.id, " +
        "categories c, users u, currencies r " +
        "WHERE a.category_id = c.id " +
        "AND a.user_id = u.id " +
        "AND a.currency_id = r.id ";
    }

    if (searchData.exclude) {
      queryDataFlat.push(searchData.exclude);
      sqlFindAdverts = sqlFindAdverts.concat("AND a.id != ? ");
    }

    if (searchData.query) {
      sqlFindAdverts = sqlFindAdverts.concat("AND (");
      searchData.query
        .trim()
        .split(" ")
        .forEach(function(word) {
          if (word.length != 0) {
            queryDataFlat.push("%" + word.toLowerCase() + "%");
            sqlFindAdverts += "LOWER(a.title) LIKE ? OR ";
          }
        });
      sqlFindAdverts = sqlFindAdverts
        .substring(0, sqlFindAdverts.length - 4)
        .concat(") ");
    }

    if (searchData.district) {
      queryDataFlat.push(searchData.district);
      sqlFindAdverts = sqlFindAdverts.concat("AND sq1.district_id = ? ");
    }

    if (searchData.category) {
      queryDataFlat.push(searchData.category);
      sqlFindAdverts = sqlFindAdverts.concat("AND a.category_id = ? ");
    }

    if (searchData.user) {
      queryDataFlat.push(searchData.user);
      sqlFindAdverts = sqlFindAdverts.concat("AND a.user_id = ? ");
    }

    if (searchData.overseas) {
      sqlFindAdverts = sqlFindAdverts.concat("AND a.overseas = TRUE ");
    }

    sqlFindAdverts = sqlFindAdverts.trim();
    sqlFindAdverts = "".concat(
      "SELECT main.*, ROUND(main.price / main.factor * r.factor, 2) AS priceAdj,",
      " r.name AS currencyAdj, r.locale AS localeAdj FROM (",
      sqlFindAdverts,
      ") main, currencies r WHERE 1 "
    );

    if (searchData.currency) {
      queryDataFlat.push(searchData.currency);
      sqlFindAdverts = sqlFindAdverts.concat("AND r.id = ? ");
    }

    sqlFindAdverts = sqlFindAdverts.concat("HAVING 1 ");

    if (searchData.minPrice) {
      queryDataFlat.push(searchData.minPrice);
      sqlFindAdverts = sqlFindAdverts.concat("AND priceAdj >= ? ");
    }

    if (searchData.maxPrice) {
      queryDataFlat.push(searchData.maxPrice);
      sqlFindAdverts = sqlFindAdverts.concat("AND priceAdj <= ? ");
    }

    let sortableColumns = ["priceAdj", "dateCreated", "boosted"];

    if (searchData.sort && sortableColumns.includes(searchData.sort.column)) {
      sqlFindAdverts = sqlFindAdverts.concat("ORDER BY ");

      sqlFindAdverts = sqlFindAdverts.concat(
        searchData.sort.column,
        searchData.sort.reverse ? " DESC " : " ASC "
      );
    }

    if (searchData.limit) {
      queryDataFlat.push(searchData.limit);
      sqlFindAdverts = sqlFindAdverts.concat("LIMIT ? ");

      if (searchData.offset) {
        queryDataFlat.push(searchData.offset);
        sqlFindAdverts = sqlFindAdverts.concat("OFFSET ? ");
      }
    }

    sqlFindAdverts = sqlFindAdverts.trim();

    let [rows] = await dbConnection.execute(sqlFindAdverts, queryDataFlat);

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

module.exports.find = async function(id, summary) {
  let dbConnection = await dbPool.getConnection();
  try {
    let sqlFindAdvert;

    if (summary) {
      sqlFindAdvert =
        "SELECT a.id, a.title, a.description, " +
        "JSON_OBJECT('fname', u.fname, 'lname', u.lname, 'email', u.email, 'contact', u.contact) " +
        "AS seller, " +
        "CAST(a.price AS DECIMAL(13, 2)) AS price, r.id AS currency, r.locale, " +
        "a.negotiable, a.overseas, " +
        "c.id AS category, " +
        "sq1.district_id AS district, " +
        "IF(COUNT(sq2.advert_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(sq2.image_location)) AS images " +
        "FROM adverts a " +
        "LEFT JOIN (" +
        "SELECT ad.*, d.name " +
        "FROM adverts_district ad, districts d " +
        "WHERE ad.district_id = d.id" +
        ") sq1 " +
        "ON sq1.advert_id = a.id " +
        "LEFT JOIN (" +
        "SELECT ai.advert_id, ai.image_location " +
        "FROM adverts_image ai " +
        ") sq2 " +
        "ON sq2.advert_id = a.id, " +
        "categories c, users u, currencies r " +
        "WHERE a.category_id = c.id " +
        "AND a.user_id = u.id " +
        "AND a.currency_id = r.id " +
        "AND a.id = ? " +
        "GROUP BY a.id " +
        "LIMIT 1";
    } else {
      sqlFindAdvert =
        "SELECT a.id, a.title, a.description, UNIX_TIMESTAMP(a.created_at) AS dateCreated, " +
        "IF(DATE_ADD(boosted_at, INTERVAL 7 DAY) > CURDATE(), TRUE, FALSE) AS boosted, " +
        "JSON_OBJECT('fname', u.fname, 'lname', u.lname, 'email', u.email, 'contact', u.contact) " +
        "AS seller, " +
        "CAST(a.price AS DECIMAL(13, 2)) AS price, r.name AS currency, r.locale, " +
        "a.negotiable, a.overseas, " +
        "c.name AS category, " +
        "sq1.name AS district, " +
        "IF(COUNT(sq2.advert_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(sq2.image_location)) AS images " +
        "FROM adverts a " +
        "LEFT JOIN (" +
        "SELECT ad.*, d.name " +
        "FROM adverts_district ad, districts d " +
        "WHERE ad.district_id = d.id" +
        ") sq1 " +
        "ON sq1.advert_id = a.id " +
        "LEFT JOIN (" +
        "SELECT ai.advert_id, ai.image_location " +
        "FROM adverts_image ai " +
        ") sq2 " +
        "ON sq2.advert_id = a.id, " +
        "categories c, users u, currencies r " +
        "WHERE a.category_id = c.id " +
        "AND a.user_id = u.id " +
        "AND a.currency_id = r.id " +
        "AND a.id = ? " +
        "GROUP BY a.id " +
        "LIMIT 1";
    }
    let [rows] = await dbConnection.execute(sqlFindAdvert, [id]);

    let data = false;
    if (rows && rows.length != 0) {
      data = rows[0];
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

module.exports.add = async function(advertData) {
  let dbConnection = await dbPool.getConnection();
  try {
    await dbConnection.beginTransaction();

    const sqlAddAdvert =
      "INSERT INTO adverts " +
      "(title, description, price, user_id, currency_id, category_id, negotiable, overseas) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let [rows] = await dbConnection.execute(sqlAddAdvert, [
      advertData.title,
      advertData.description,
      advertData.price,
      advertData.userId,
      advertData.currencyId,
      advertData.categoryId,
      advertData.negotiable,
      advertData.overseas
    ]);
    let id = rows.insertId;

    if (!advertData.overseas) {
      const sqlAssignDistrict =
        "INSERT INTO adverts_district (advert_id, district_id) " +
        "VALUES (?, ?)";
      await dbConnection.execute(sqlAssignDistrict, [
        id,
        advertData.districtId
      ]);
    }

    if (advertData.images && advertData.images.length != 0) {
      let imageDataFlat = [];

      let sqlAssignImages =
        "INSERT INTO adverts_image (advert_id, image_location) VALUES ";
      advertData.images.forEach(function(image) {
        imageDataFlat.push(id, image);
        sqlAssignImages += "(?, ?), ";
      });

      sqlAssignImages = sqlAssignImages.substring(
        0,
        sqlAssignImages.length - 2
      );

      await dbConnection.execute(sqlAssignImages, imageDataFlat);
    }

    await dbConnection.commit();
    await dbConnection.release();

    return {
      error: null,
      result: {
        success: true
      }
    };
  } catch (error) {
    await dbConnection.rollback();
    await dbConnection.release();

    return {
      error: error,
      result: null
    };
  }
};

module.exports.edit = async function(id, advertData) {
  let dbConnection = await dbPool.getConnection();
  try {
    await dbConnection.beginTransaction();

    const sqlEditAdvert =
      "UPDATE adverts " +
      "SET title = ?, description = ?, price = ?, currency_id = ?, negotiable = ?, overseas = ? " +
      "WHERE id = ?";
    await dbConnection.execute(sqlEditAdvert, [
      advertData.title,
      advertData.description,
      advertData.price,
      advertData.currencyId,
      advertData.negotiable,
      advertData.overseas,
      id
    ]);

    const sqlResetDistrict = "DELETE FROM adverts_district WHERE advert_id = ?";
    await dbConnection.execute(sqlResetDistrict, [id]);

    if (!advertData.overseas) {
      const sqlEditDistrict =
        "INSERT INTO adverts_district (advert_id, district_id) " +
        "VALUES (?, ?)";
      await dbConnection.execute(sqlEditDistrict, [id, advertData.districtId]);
    }

    const sqlResetImages = "DELETE FROM adverts_image WHERE advert_id = ?";
    await dbConnection.execute(sqlResetImages, [id]);

    if (advertData.images && advertData.images.length != 0) {
      let imageDataFlat = [];

      let sqlAssignImages =
        "INSERT INTO adverts_image (advert_id, image_location) VALUES ";
      advertData.images.forEach(function(image) {
        imageDataFlat.push(id, image);
        sqlAssignImages += "(?, ?), ";
      });

      sqlAssignImages = sqlAssignImages.substring(
        0,
        sqlAssignImages.length - 2
      );

      await dbConnection.execute(sqlAssignImages, imageDataFlat);
    }

    await dbConnection.commit();
    await dbConnection.release();

    return {
      error: null,
      result: {
        success: true
      }
    };
  } catch (error) {
    await dbConnection.rollback();
    await dbConnection.release();

    return {
      error: error,
      result: null
    };
  }
};

module.exports.boost = async function(id) {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlBoostAdvert =
      "UPDATE adverts SET boosted_at = CURRENT_TIMESTAMP WHERE id = ?";
    await dbConnection.execute(sqlBoostAdvert, [id]);

    await dbConnection.release();

    return {
      error: null,
      result: {
        success: true
      }
    };
  } catch (error) {
    await dbConnection.release();

    return {
      error: error,
      result: null
    };
  }
};
