const AccountService = require("../services/account_service");

module.exports = (app) => {
  const service = new AccountService();

  app.use("/account/app-events", async (req, res, next) => {
    const { payload } = req.body;
    service.SubscribeEvents(payload);

    console.log("==== Account Service Recieved Event =====");
    return res.status(200).json(payload);
  });
};
