const express = require("express");
const cors = require("cors");
const { account } = require("./api");
const HandleErrors = require("./utils/error-handler");
var logger = require("morgan");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  app.use(logger("dev"));

  // Listen to events ///
  // appEvent(app);

  //api
  account(app);

  // error handling
  app.use(HandleErrors);
};