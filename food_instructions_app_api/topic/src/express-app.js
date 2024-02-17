const express = require("express");
const cors = require("cors");
const { topic, appEvents } = require("./api");
const HandleErrors = require("./utils/error-handler");
var logger = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  // app.use(express.static(__dirname + "/public"));
  app.use("/topic/addNew", express.static("uploads"));
  app.use(express.static("src"));
  app.use(logger("dev"));

  // Listen to events ///
  appEvents(app);

  //api
  topic(app);

  // error handling
  app.use(HandleErrors);
};
