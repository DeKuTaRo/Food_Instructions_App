const apiRoute = require("./api");

module.exports = function route(app) {
  app.use("/account/login", apiRoute);
};
