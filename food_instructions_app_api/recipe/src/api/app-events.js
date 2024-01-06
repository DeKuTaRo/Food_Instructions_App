module.exports = (app) => {
  app.use("/recipe/app-events", async (req, res, next) => {
    const { payload } = req.body;

    console.log("==== Recipe Service Received Event =====");
    return res.status(200).json(payload);
  });
};