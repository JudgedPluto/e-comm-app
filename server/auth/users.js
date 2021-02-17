const crypto = require("crypto");
const dbPool = require("../db/connection");

module.exports.getUser = async function(id) {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindUser =
      "SELECT id, email, role, fname, lname, contact, image_location, verify_status " +
      "FROM users " +
      "WHERE id = ? " +
      "LIMIT 1";
    let [rows] = await dbConnection.execute(sqlFindUser, [id]);

    let data = false;
    if (rows && rows.length != 0) {
      data = {
        id: rows[0].id,
        email: rows[0].email,
        role: rows[0].role,
        firstName: rows[0].fname,
        lastName: rows[0].lname,
        contact: rows[0].contact,
        pictuteLocation: rows[0].picture_location,
        verifyStatus: rows[0].verify_status
      };
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

module.exports.getAuthenticationData = async function(id) {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindCredentials =
      "SELECT username FROM users_oauth WHERE user_id = ? AND provider = 'local' LIMIT 1";
    let [credentialRows] = await dbConnection.execute(sqlFindCredentials, [id]);

    let credentials = false;
    if (credentialRows && credentialRows.length != 0) {
      credentials = {
        username: credentialRows[0].username
      };
    }

    const sqlFindProviders =
      "SELECT provider FROM users_oauth WHERE user_id = ? AND provider != 'local'";
    let [providerRows] = await dbConnection.execute(sqlFindProviders, [id]);

    let providers = false;
    if (providerRows && providerRows.length != 0) {
      providers = [];
      providerRows.forEach(function(item) {
        providers.push({ name: item.provider });
      });
    }

    await dbConnection.release();

    return {
      error: null,
      result: {
        credentials: credentials,
        providers: providers
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

module.exports.editUser = async function(id, userData) {
  let dbConnection = await dbPool.getConnection();
  try {
    if (userData.firstName && userData.lastName) {
      const sqlEditUser = "UPDATE users SET fname = ?, lname = ? WHERE id = ?";
      await dbConnection.execute(sqlEditUser, [
        userData.firstName,
        userData.lastName,
        id
      ]);
    }

    if (userData.contact) {
      const sqlEditUser = "UPDATE users SET contact = ? WHERE id = ?";
      await dbConnection.execute(sqlEditUser, [userData.contact, id]);
    }

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

module.exports.addProvider = async function() {};

module.exports.addCredentials = async function(id, username, password) {
  let dbConnection = await dbPool.getConnection();
  try {
    await dbConnection.beginTransaction();

    const sqlAddUsername =
      "INSERT INTO users_oauth (user_id, username, provider) " +
      "VALUES (?, ?, 'local')";
    await dbConnection.execute(sqlAddUsername, [id, username]);

    const sqlAddPassword =
      "INSERT INTO users_password (user_id, password) " + "VALUES (?, ?)";
    await dbConnection.execute(sqlAddPassword, [id, password]);

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

module.exports.addUserByProvider = async function(
  userData,
  username,
  provider
) {
  let dbConnection = await dbPool.getConnection();
  try {
    await dbConnection.beginTransaction();

    const sqlCreateUser =
      "INSERT INTO users (email, fname, lname, role, verify_status) " +
      "VALUES (?, ?, ?, 'user', 0)";
    let [rows] = await dbConnection.execute(sqlCreateUser, [
      userData.email,
      userData.firstName,
      userData.lastName
    ]);
    let id = rows.insertId;

    const sqlAssignProvider =
      "INSERT INTO users_oauth (user_id, username, provider) " +
      "VALUES (?, ?, ?)";
    await dbConnection.execute(sqlAssignProvider, [id, username, provider]);

    await dbConnection.commit();
    await dbConnection.release();

    return {
      error: null,
      result: {
        id: id
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

module.exports.addUserByCredentials = async function(
  userData,
  username,
  password
) {
  let dbConnection = await dbPool.getConnection();
  try {
    await dbConnection.beginTransaction();

    const sqlCreateUser =
      "INSERT INTO users (email, fname, lname, contact, role, verify_status) " +
      "VALUES (?, ?, ?, ?, 'user', 0)";
    let [rows] = await dbConnection.execute(sqlCreateUser, [
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.contact
    ]);
    let id = rows.insertId;

    const sqlAssignProvider =
      "INSERT INTO users_oauth (user_id, username, provider) " +
      "VALUES (?, ?, 'local')";
    await dbConnection.execute(sqlAssignProvider, [id, username]);

    const sqlAssignPassword =
      "INSERT INTO users_password (user_id, password) " + "VALUES (?, ?)";
    await dbConnection.execute(sqlAssignPassword, [id, password]);

    await dbConnection.commit();
    await dbConnection.release();

    return {
      error: null,
      result: {
        id: id
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

module.exports.checkUserByProvider = async function(username, provider) {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindUser =
      "SELECT user_id " +
      "FROM users_oauth " +
      "WHERE username = ? AND provider = ? " +
      "LIMIT 1";
    let [rows] = await dbConnection.execute(sqlFindUser, [username, provider]);

    let checkStatus = {
      found: false,
      id: null
    };
    if (rows && rows.length != 0) {
      checkStatus = {
        found: true,
        id: rows[0].user_id
      };
    }

    await dbConnection.release();

    return {
      error: null,
      result: checkStatus
    };
  } catch (error) {
    await dbConnection.release();

    return {
      error: error,
      result: null
    };
  }
};

module.exports.checkUserByCredentials = async function(username, password) {
  let dbConnection = await dbPool.getConnection();
  try {
    const sqlFindUser =
      "SELECT uo.user_id, up.password " +
      "FROM users_oauth uo, users_password up " +
      "WHERE uo.user_id = up.user_id AND uo.username = ? AND uo.provider = 'local' " +
      "LIMIT 1";
    let [rows] = await dbConnection.execute(sqlFindUser, [username]);

    let checkStatus = {
      found: false,
      id: null
    };
    if (rows && rows.length != 0 && rows[0].password == password) {
      checkStatus = {
        found: true,
        id: rows[0].user_id
      };
    }

    await dbConnection.release();

    return {
      error: null,
      result: checkStatus
    };
  } catch (error) {
    await dbConnection.release();

    return {
      error: error,
      status: null
    };
  }
};

module.exports.removeProvider = async function() {};

module.exports.editCredentials = async function(id, authData, password) {
  let dbConnection = await dbPool.getConnection();
  let isInTransaction = false;
  try {
    const sqlFindCurrentPassword =
      "SELECT password FROM users_password WHERE user_id = ?";
    let [rows] = await dbConnection.execute(sqlFindCurrentPassword, [id]);

    let status = { success: false };
    if (rows && rows.length != 0 && rows[0].password == password) {
      await dbConnection.beginTransaction();
      isInTransaction = true;

      if (authData.username) {
        const sqlEditUsername =
          "UPDATE users_oauth SET username = ? WHERE user_id = ? AND provider = 'local'";
        await dbConnection.execute(sqlEditUsername, [authData.username, id]);
      }

      if (authData.password) {
        const sqlEditPassword =
          "UPDATE users_password SET password = ? WHERE user_id = ?";
        await dbConnection.execute(sqlEditPassword, [authData.password, id]);
      }

      await dbConnection.commit();
      isInTransaction = false;
      await dbConnection.release();

      status = { success: true };
    }

    return {
      error: null,
      result: status
    };
  } catch (error) {
    if (isInTransaction) {
      await dbConnection.rollback();
    }
    await dbConnection.release();

    return {
      error: error,
      result: null
    };
  }
};

module.exports.addVerification = async function(id) {
  let dbConnection = await dbPool.getConnection();
  try {
    await dbConnection.beginTransaction();

    const sqlDeleteVerification =
      "DELETE FROM users_verify " + "WHERE user_id = ? LIMIT 1";
    await dbConnection.execute(sqlDeleteVerification, [id]);

    let key = crypto.randomBytes(32).toString("hex");

    const sqlAddVerification =
      "INSERT INTO users_verify (user_id, secret_key) " + "VALUES (?, ?)";
    await dbConnection.execute(sqlAddVerification, [id, key]);

    await dbConnection.commit();
    await dbConnection.release();

    return {
      error: null,
      result: {
        id: id,
        key: key
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

module.exports.checkVerification = async function(id, key) {
  let dbConnection = await dbPool.getConnection();
  let isInTransaction = false;
  try {
    const sqlSecretKey =
      "SELECT secret_key " + "FROM users_verify " + "WHERE user_id = ? LIMIT 1";
    let [rows] = await dbConnection.execute(sqlSecretKey, [id]);

    let status = {
      verified: false,
      id: null
    };
    if (rows && rows.length != 0 && rows[0].secret_key == key) {
      await dbConnection.beginTransaction();
      isInTransaction = true;

      const sqlModifyStatus =
        "UPDATE users " + "SET verify_status = 1 " + "WHERE id = ?";
      await dbConnection.execute(sqlModifyStatus, [id]);

      const sqlDeleteRecord = "DELETE FROM users_verify " + "WHERE user_id = ?";
      await dbConnection.execute(sqlDeleteRecord, [id]);

      await dbConnection.commit();
      isInTransaction = false;
      await dbConnection.release();

      status = {
        verified: true,
        id: id
      };
    }

    return {
      error: null,
      result: status
    };
  } catch (error) {
    if (isInTransaction) {
      await dbConnection.rollback();
    }
    await dbConnection.release();

    return {
      error: error,
      result: null
    };
  }
};
