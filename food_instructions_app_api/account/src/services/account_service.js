const AccountRepository = require("../repository/account_repository");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  SetRequestUser,
} = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class AccountService {
  constructor() {
    this.repository = new AccountRepository();
  }

  async SignIn(userInputs) {
    const { username, password } = userInputs;
    try {
      const existingAccount = await this.repository.FindAccount({ username });
      if (existingAccount) {
        const validPassword = await ValidatePassword(password, existingAccount.password, existingAccount.salt);

        const token = await GenerateSignature({
          _id: existingAccount._id,
          username: existingAccount.username,
          email: existingAccount.email,
        });

        if (validPassword) {
          return FormateData({
            token: token,
            statusCode: 200,
            isAdmin: existingAccount.isAdmin,
            msg: "Login successfully",
          });
        }
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUp(userInputs) {
    const { username, email, password, path } = userInputs;
    try {
      // create salt
      let salt = await GenerateSalt();

      let isAdmin = username === process.env.USERNAME_ADMIN && password === process.env.PASSWORD_ADMIN ? true : false;
      let role = username === process.env.USERNAME_ADMIN && password === process.env.PASSWORD_ADMIN ? "admin" : "user";

      let userPassword = await GeneratePassword(password, salt);
      const fixedIssuedAt = 1672531200; // Unix timestamp for January 1, 2024
      const tokenResetPassword = await GenerateSignature({ email: email, iat: fixedIssuedAt });

      const existingCustomer = await this.repository.CreateAccount({
        username,
        email,
        password: userPassword,
        salt,
        tokenResetPassword,
        path,
        isAdmin,
        role,
      });
      return FormateData(existingCustomer);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetAccounts() {
    try {
      const accounts = await this.repository.Accounts();

      return FormateData({
        accounts,
      });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async UpdateAccountStatusAdmin(id, isChecked) {
    try {
      const accounts = await this.repository.UpdateStatus(id, isChecked);
      if (!accounts) {
        return new APIError("Some error has been occurred");
      }
      return FormateData({
        accounts,
      });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async AddNewAddress(_id, userInputs) {
    const { street, postalCode, city, country } = userInputs;

    try {
      const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country });
      return FormateData(addressResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProfile(id) {
    try {
      const existingCustomer = await this.repository.FindCustomerById({ id });
      return FormateData(existingCustomer);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetWishList(_id, search) {
    try {
      const wishListItems = await this.repository.Wishlist(_id, search);
      return FormateData(wishListItems);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async AddToWishlist(recipeInputs) {
    try {
      const { _id, username, nameRecipe, imageRecipe, linkRecipe, check, totalAmount, quantity, ingredientLines } =
        recipeInputs;
      const wishlistResult = await this.repository.AddWishlistItem({
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
      return FormateData(wishlistResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async ManageCart(customerId, product, qty, isRemove) {
    try {
      const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);

      return FormateData(cartResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async ManageOrder(customerId, order) {
    try {
      const orderResult = await this.repository.AddOrderToProfile(customerId, order);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async AddComments(recipeInputs, userId, comment) {
    const { nameRecipe, imageRecipe, linkRecipe } = recipeInputs;
    try {
      const commentsResult = await this.repository.AddComments(
        {
          nameRecipe,
          imageRecipe,
          linkRecipe,
          comment,
        },
        userId
      );
      return FormateData(commentsResult);
    } catch (err) {
      console.log("err service = ", err);
      throw new APIError("Data Not found", err);
    }
  }

  async AddToCart(
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
    try {
      const cartLists = await this.repository.AddCartItem(
        accountId,
        username,
        nameRecipe,
        imageRecipe,
        linkRecipe,
        check,
        totalAmount,
        quantity,
        ingredientLines
      );
      return FormateData(cartLists);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetCart(_id, search) {
    try {
      const cartItems = await this.repository.Cart(_id, search);
      return FormateData(cartItems);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async RemoveWishlist(accountId, recipeId) {
    try {
      const wishlistItems = await this.repository.RemoveItemFromWishlist(accountId, recipeId);
      return FormateData(wishlistItems);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async RemoveCart(accountId, recipeId) {
    try {
      const cartItems = await this.repository.RemoveItemFromCart(accountId, recipeId);
      return FormateData(cartItems);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async DeleteComments(commentId, userId) {
    try {
      const deleteComment = await this.repository.DeleteComments(commentId, userId);
      return FormateData(deleteComment);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SubscribeEvents(payload) {
    console.log("payload = ", payload);
    const { event, data, comment, userId, commentId } = payload.data;
    switch (event) {
      case "ADD_COMMENTS_TO_RECIPES":
        this.AddComments(data, userId, comment);
        break;
      case "DELETE_COMMENTS_FROM_RECIPES":
        this.DeleteComments(commentId, userId);
        break;
      default:
        break;
    }
  }

  async ForgotPassword(email) {
    try {
      const password = await this.repository.ForgotPassword(email);
      return FormateData(password);
    } catch (err) {
      console.log("err ser : ", err);
      throw new APIError("Data Not found", err);
    }
  }

  async ResetPassword(password, token) {
    try {
      const resetPassword = await this.repository.ResetPassword(password, token);
      return FormateData(resetPassword);
    } catch (err) {
      console.log("err ser : ", err);
      throw new APIError("Data Not found", err);
    }
  }

  async UpdateProfile(_id, username, email, file) {
    try {
      const updateProfile = await this.repository.UpdateProfile(_id, username, email, file);
      return FormateData(updateProfile);
    } catch (err) {
      console.log("err ser : ", err);
      throw new APIError("Data Not found", err);
    }
  }

  async ChangePassword(_id, oldPassword, newPassword) {
    try {
      const changePassword = await this.repository.ChangePassword(_id, oldPassword, newPassword);
      return FormateData(changePassword);
    } catch (err) {
      console.log("err ser : ", err);
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = AccountService;
