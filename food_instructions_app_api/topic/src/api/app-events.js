module.exports = (app) => {
  app.use("/topic/app-events", async (req, res, next) => {
    const { payload } = req.body;

    console.log("==== Topic Service Received Event =====");
    return res.status(200).json(payload);
  });
};