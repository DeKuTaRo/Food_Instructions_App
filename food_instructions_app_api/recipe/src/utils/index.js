const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { APP_SECRET } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSaltSync(10);
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hashSync(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "5m" });
  } catch (error) {
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");

    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token expired");
          // res.json({ msg: "Account is expired, please log in again.", statusCode: 300 });
          return false;
        } else {
          console.log("Token invalid");
          // res.json({ msg: "Account is invalid, please log in again.", statusCode: 300 });
          return false;
        }
      } else {
        return true;
      }
    });
    if (payload) {
      req.user = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    }
    return payload;
  } catch (error) {
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.PublishAccountEvent = async (payload) => {
  axios.post(`http://localhost:8001/account/app-events`, {
    payload,
  });
};
