const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const AccountService = require("../services/account_service");

const UserAuth = require("../middleware/auth");

module.exports = (app) => {
  const service = new AccountService();

  app.post("/account/signup", upload.single("file"), async (req, res, next) => {
    try {
      let path = "";
      if (req.file) {
        path = req.file.path; // avatar
      }
      const { username, email, password } = req.body;
      const { data } = await service.SignUp({ username, email, password, path });
      return res.json(data);
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.get("/uploads/:filename", (req, res) => {
    try {
      const { filename } = req.params;
      const imagePath = path.resolve(__dirname, "../../uploads", filename);
      res.sendFile(imagePath);
    } catch (err) {
      next(err);
    }
  });

  app.post("/account/login", async (req, res, next) => {
    try {
      const { username, password, role } = req.body;

      const { data } = await service.SignIn({ username, password, role });

      return res.json(data);
    } catch (err) {
      next(err);
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

  app.post("/account/addToWishList", UserAuth, async (req, res, next) => {
    try {
      const { _id, username } = req.user;
      const { nameRecipe, imageRecipe, linkRecipe, check, totalAmount, quantity, ingredientLines } = req.body;
      const { data } = await service.AddToWishlist({
        _id,
        username,
        nameRecipe,
        imageRecipe,
        linkRecipe,
        check,
        totalAmount,
        quantity,
        ingredientLines,
      });
      if (data) {
        return res.status(200).json({ msg: "Thêm yêu thích thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra, vui lòng thử lại sau", statusCode: 500 });
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
      next(err);
    }
  });

  app.post("/account/addToCart", UserAuth, async (req, res, next) => {
    try {
      const { _id, username } = req.user;
      const { nameRecipe, imageRecipe, linkRecipe, check, totalAmount, quantity, ingredientLines } = req.body;
      const { data } = await service.AddToCart(
        _id,
        username,
        nameRecipe,
        imageRecipe,
        linkRecipe,
        check,
        totalAmount,
        quantity,
        ingredientLines
      );
      if (data) {
        return res.status(200).json({ msg: "Thêm vào giỏ hàng thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra, vui lòng thử lại sau", statusCode: 500 });
    } catch (err) {
      next(err);
    }
  });

  app.get("/account/getCart", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const search = req.query.search;
      const { data } = await service.GetCart(_id, search);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/account/removeItemWishlist", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const idRecipe = req.query.idRecipe;
      const { data } = await service.RemoveWishlist(_id, idRecipe);
      if (data) {
        return res.status(200).json({ statusCode: 200, msg: "Xóa thành công" });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra" });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/account/removeItemCart", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const idRecipe = req.query.idRecipe;
      const { data } = await service.RemoveCart(_id, idRecipe);
      if (data) {
        return res.status(200).json({ statusCode: 200, msg: "Xóa thành công" });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/account/forgotPassword", async (req, res, next) => {
    try {
      const { email } = req.body;
      const { data } = await service.ForgotPassword(email);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/account/resetPassword", async (req, res, next) => {
    try {
      const { password, token } = req.body.params;
      const { data } = await service.ResetPassword(password, token);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/account/updateProfile", upload.single("file"), UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { username, email } = req.body;
      let file;
      if (req.file) {
        file = req.file.path;
      }

      const { data } = await service.UpdateProfile(_id, username, email, file);
      if (data) {
        return res.status(200).json({ msg: "Cập nhật thông tin thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Cập nhật thông tin thất bại", statusCode: 500 });
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.post("/account/changePassword", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { oldPassword, newPassword } = req.body;

      const { data } = await service.ChangePassword(_id, oldPassword, newPassword);
      if (data) {
        return res.status(200).json({ msg: "Đổi mật khẩu thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Đổi mật khẩu thất bại", statusCode: 500 });
    } catch (err) {
      console.log("err = ", err);
      next(err);
    }
  });
};
