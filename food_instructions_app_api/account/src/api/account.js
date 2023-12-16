const AccountService = require("../services/account_service");

const UserAuth = require("../middleware/auth");

module.exports = (app) => {
  const service = new AccountService();

  app.post("/account/signup", async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const { data } = await service.SignUp({ username, email, password });
      return res.json(data);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  });

  app.post("/account/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const { data } = await service.SignIn({ username, password });

      return res.json(data);
    } catch (err) {
      console.log(err);
      // next(err);
    }
  });

  app.post("/address", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;

      const { street, postalCode, city, country } = req.body;

      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/account/profile", UserAuth, async (req, res, next) => {
    try {
      console.log("req = ", req);
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/shoping-details", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetShopingDetails(_id);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/wishlist", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetWishList(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Account Service");
  });
};
