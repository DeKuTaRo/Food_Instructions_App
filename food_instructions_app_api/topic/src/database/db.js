const mongoose = require("mongoose");

const { MONGODB_URL } = require("../config");

const db = async () => {
  try {
    const con = await mongoose.connect(MONGODB_URL);
    console.log(`MONGODB_URL: ${MONGODB_URL} `);

    console.log(`mongodb connection: ${con.connection.host} `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
