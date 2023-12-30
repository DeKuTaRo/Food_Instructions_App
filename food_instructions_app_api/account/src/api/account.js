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
      const { username, password, role } = req.body;

      const { data } = await service.SignIn({ username, password, role });

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

  app.get("/account/getAllAccounts", async (req, res, next) => {
    try {
      const { data } = await service.GetAccounts();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.put("/account/changeAdminStatus/:id", UserAuth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { isChecked } = req.body;
      const { data } = await service.UpdateAccountStatusAdmin(id, isChecked);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/account/addToWishList", async (req, res, next) => {
    try {
      const { _id, nameRecipe, imageRecipe, linkRecipe } = req.body;
      const { data } = await service.AddToWishlist({ _id, nameRecipe, imageRecipe, linkRecipe });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/account/getWishlist", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const search = req.query.search;
      const { data } = await service.GetWishList(_id, search);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};
