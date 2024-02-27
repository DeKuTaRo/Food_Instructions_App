const OrderService = require("../services/order_service");

module.exports = (app) => {
  const service = new OrderService();

  app.use("/order/app-events", async (req, res, next) => {
    const { payload } = req.body;
    service.SubscribeEvents(payload);

    console.log("==== Order Service Recieved Event =====");
    return res.status(200).json(payload);
  });
};
