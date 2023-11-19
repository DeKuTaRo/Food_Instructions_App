const Router = require("express").Router();

const { accountLogin, accountRegister } = require("./modules/accounts");

/**
 * Account ================================================================
 */

Router.post("/", accountLogin);

module.exports = Router;
