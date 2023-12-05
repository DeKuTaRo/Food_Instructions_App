const Router = require("express").Router();

const { accountLogin, accountRegister } = require("./modules/accounts");
const { foodRegister, foodGetAll, foodGetDetail } = require("./modules/foods");
/**
 * Account ================================================================
 */

Router.post("/account/login", accountLogin);

/**
 * Food ================================================================
 */
Router.post("/food/register",  foodRegister);
Router.get("/food/getAll", foodGetAll);
Router.get("/food/getDetail/:id", foodGetDetail);
module.exports = Router;
