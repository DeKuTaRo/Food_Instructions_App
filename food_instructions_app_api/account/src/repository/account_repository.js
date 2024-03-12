const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { ValidatePassword, GeneratePassword } = require("../utils");
const { APP_SECRET } = require("../config");

const { AccountModel, AddressModel, CommentModel } = require("../model");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");

class AccountRepository {
  async CreateAccount({ username, email, password, salt, tokenResetPassword, path }) {
    try {
      const account = new AccountModel({
        username,
        email,
        password,
        salt,
        path,
        isAdmin: false,
        role: "user",
        tokenResetPassword: tokenResetPassword,
        address: [],
        wishlist: [],
        orders: [],
        cart: [],
        comments: [],
      });
      const accountResult = await account.save();
      return accountResult;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Account");
    }
  }

  async Accounts() {
    try {
      return await AccountModel.find();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Accounts");
    }
  }

  async UpdateStatus(id, isChecked) {
    try {
      await AccountModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          isAdmin: isChecked,
        }
      );
      return await AccountModel.find();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Account Status");
    }
  }

  async CreateAddress({ _id, street, postalCode, city, country }) {
    try {
      const profile = await AccountModel.findById(_id);

      if (profile) {
        const newAddress = new AddressModel({
          street,
          postalCode,
          city,
          country,
        });

        await newAddress.save();

        profile.address.push(newAddress);
      }

      return await profile.save();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Error on Create Address");
    }
  }

  async FindAccount({ username, role }) {
    try {
      const existingAccount = await AccountModel.findOne({ username: username, role: role });
      return existingAccount;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Customer");
    }
  }

  async SaveTokenToModel({ username, role, token }) {
    try {
      const existingAccount = await AccountModel.findOne({ username: username, role: role });
      existingAccount.token = token;
      return existingAccount;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Customer");
    }
  }

  async FindCustomerById({ id }) {
    try {
      const existingAccount = await AccountModel.findById(id).populate("address");
      return existingAccount;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Customer");
    }
  }

  async Wishlist(_id, search) {
    try {
      const account = await AccountModel.findById(_id);

      if (search === "") {
        return account.wishlist;
      }

      const accountResult = [];
      account.wishlist.forEach((item) => {
        if (item.nameRecipe.toUpperCase().includes(search.toUpperCase())) {
          accountResult.push(item);
        }
      });

      return accountResult;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Wishlist ");
    }
  }

  async AddWishlistItem({ _id, nameRecipe, imageRecipe, linkRecipe }) {
    const recipe = {
      nameRecipe,
      imageRecipe,
      linkRecipe,
    };

    try {
      const account = await AccountModel.findById(_id);
      const checkNameExist = account.wishlist.some((item) => item.nameRecipe === nameRecipe);

      if (!checkNameExist) {
        account.wishlist.push(recipe);
      }
      const accountResult = await account.save();

      return accountResult.wishlist;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add to WishList");
    }
  }

  async Cart(_id, search) {
    try {
      const account = await AccountModel.findById(_id);

      if (search === "") {
        return account.cart;
      }

      const accountResult = [];
      account.cart.forEach((item) => {
        if (item.nameRecipe.toUpperCase().includes(search.toUpperCase())) {
          accountResult.push(item);
        }
      });

      return accountResult;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Cart ");
    }
  }

  async AddCartItem(
    accountId,
    username,
    nameRecipe,
    imageRecipe,
    linkRecipe,
    check,
    totalAmount,
    quantity,
    ingredientLines
  ) {
    const recipe = {
      accountName: username,
      nameRecipe,
      imageRecipe,
      linkRecipe,
      quantity: quantity,
      check: check,
      totalAmount: totalAmount,
      ingredientLines: ingredientLines,
    };
    try {
      const account = await AccountModel.findById(accountId);
      const checkNameExist = account.cart.findIndex((item) => item.nameRecipe === nameRecipe);
      if (checkNameExist !== -1) {
        account.cart[checkNameExist].quantity += 1;
      } else {
        account.cart.push(recipe);
      }
      await account.save();
      return account.cart;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add to Cart");
    }
  }

  async RemoveItemFromWishlist(accountId, recipeId) {
    try {
      const account = await AccountModel.findById(accountId);
      let removeRecipe = account.wishlist.filter((obj) => obj._id.toString() !== recipeId);
      account.wishlist = removeRecipe;
      await account.save();
      return account.wishlist;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add to Cart");
    }
  }

  async RemoveItemFromCart(accountId, recipeId) {
    try {
      const account = await AccountModel.findById(accountId);
      let removeRecipe = account.cart.filter((obj) => obj._id.toString() !== recipeId);
      account.cart = removeRecipe;
      await account.save();
      return account.cart;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add to Cart");
    }
  }

  async AddOrderToProfile(customerId, order) {
    try {
      const profile = await AccountModel.findById(customerId);

      if (profile) {
        if (profile.orders == undefined) {
          profile.orders = [];
        }
        profile.orders.push(order);

        profile.cart = [];

        const profileResult = await profile.save();

        return profileResult;
      }

      throw new Error("Unable to add to order!");
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Customer");
    }
  }

  async AddComments({ nameRecipe, imageRecipe, linkRecipe, comment }, userId) {
    const { content, rating, timeComment, _id } = comment;
    const newComments = {
      _id,
      nameRecipe,
      imageRecipe,
      linkRecipe,
      content,
      rating,
      timeComment,
    };
    const commentResult = new CommentModel(newComments);
    await commentResult.save();
    try {
      const account = await AccountModel.findById(userId);
      account.comments.push(newComments);

      return await account.save();
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add Comment");
    }
  }

  async DeleteComments(commentId, userId) {
    try {
      const deleteComment = await CommentModel.findByIdAndDelete(commentId);
      const checkExistAccount = await AccountModel.findOne({ _id: userId });
      const updateComments = checkExistAccount.comments.filter(
        (item) => item._id.toString() !== deleteComment._id.toString()
      );

      const updateAccountComment = await AccountModel.findOneAndUpdate(
        { _id: userId },
        { $set: { comments: updateComments } },
        { new: true }
      );
      return updateAccountComment;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Delete Comment");
    }
  }

  async ForgotPassword(email) {
    try {
      const checkExistAccount = await AccountModel.findOne({ email: email });

      if (!checkExistAccount) {
        return { error: "Không tìm thấy địa chỉ email hợp lệ", statusCode: 500 };
      }
      const fixedIssuedAt = 1672531200; // Unix timestamp for January 1, 2024
      const resetToken = await jwt.sign({ email, iat: fixedIssuedAt }, APP_SECRET, { expiresIn: "10m" });
      await checkExistAccount.save({ validateBeforeSave: false });

      const resetURL = `${process.env.URL_REACT_APP}/resetPassword/${resetToken}`;

      const message = `Bạn đã quên mật khẩu? Hãy nhập lại mật khẩu mới của bạn tại <a href="${resetURL}">đây</a>.<br>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.`;
      const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: process.env.EMAIL_HOST,
        port: 25,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });
      const emailOptions = {
        from: `food_instructions_app@gmail.com`,
        to: checkExistAccount.email,
        subject: "Mã đặt lại mật khẩu của bạn có giá trị trong 10 phút",
        text: message,
        html: message,
      };

      const emailReult = await transporter.sendMail(emailOptions);
      if (emailReult) {
        return { msg: "Vui lòng kiểm tra địa chỉ email của bạn", statusCode: 200 };
      }

      return { msg: "Có lỗi xảy ra khi gửi email.", statusCode: 500 };
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Send New Password To Email");
    }
  }

  async ResetPassword(password, token) {
    try {
      const checkExistAccount = await AccountModel.findOne({ tokenResetPassword: token });

      if (!checkExistAccount) {
        return { error: "Không tìm thấy địa chỉ email hợp lệ", statusCode: 500 };
      }

      const newPassword = await bcrypt.hash(password, checkExistAccount.salt);
      checkExistAccount.password = newPassword;
      await checkExistAccount.save();
      return { msg: "Đổi mật khẩu thành công", statusCode: 200 };
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Reset New Password");
    }
  }

  async UpdateProfile(_id, username, email, file) {
    try {
      const profile = await AccountModel.findById(_id);
      if (profile.path) {
        const imagePath = path.resolve(__dirname, "../../", profile.path);

        fs.unlinkSync(imagePath);
      }
      const updateProfile = await AccountModel.findByIdAndUpdate(
        _id,
        {
          username: username,
          email: email,
          path: file,
        },
        {
          new: true,
        }
      );
      return updateProfile;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Profile");
    }
  }

  async ChangePassword(_id, oldPassword, newPassword) {
    try {
      if (oldPassword === "" || newPassword === "") {
        return { msg: "Mật khẩu không được để trống", statusCode: 500 };
      }

      const profile = await AccountModel.findById(_id);
      const validPassword = await ValidatePassword(oldPassword, profile.password, profile.salt);
      if (!validPassword) {
        return { msg: "Mật khẩu đã nhập không chính xác", statusCode: 500 };
      }
      const userPassword = await GeneratePassword(newPassword, profile.salt);
      const updateProfile = await AccountModel.findByIdAndUpdate(
        _id,
        {
          password: userPassword,
        },
        {
          new: true,
        }
      );
      return updateProfile;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Change Password");
    }
  }
}

module.exports = AccountRepository;
