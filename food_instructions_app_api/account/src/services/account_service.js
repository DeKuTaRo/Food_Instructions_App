const AccountRepository = require("../repository/account_repository");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class AccountService {
  constructor() {
    this.repository = new AccountRepository();
  }

  async SignIn(userInputs) {
    const { username, password, role } = userInputs;
    try {
      const existingAccount = await this.repository.FindAccount({ username, role });
      if (existingAccount) {
        const validPassword = await ValidatePassword(password, existingAccount.password, existingAccount.salt);
        if (validPassword) {
          return FormateData({
            id: existingAccount._id,
            token: existingAccount.token,
            status: true,
            isAdmin: existingAccount.isAdmin,
            username: existingAccount.username,
          });
        }
      }

      return FormateData(null);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUp(userInputs) {
    const { username, email, password } = userInputs;
    try {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);
      const fixedIssuedAt = 1672531200; // Unix timestamp for January 1, 2024
      const token = await GenerateSignature({ email: email, iat: fixedIssuedAt });

      const existingCustomer = await this.repository.CreateAccount({
        username,
        email,
        password: userPassword,
        salt,
        token,
      });

      return FormateData({ id: existingCustomer._id, token, status: true });
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

  async GetShopingDetails(id) {
    try {
      const existingCustomer = await this.repository.FindCustomerById({ id });

      if (existingCustomer) {
        return FormateData(existingCustomer);
      }
      return FormateData({ msg: "Error" });
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
      const { _id, nameRecipe, imageRecipe, linkRecipe } = recipeInputs;
      const wishlistResult = await this.repository.AddWishlistItem({ _id, nameRecipe, imageRecipe, linkRecipe });
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

  async AddToCart(accountId, nameRecipe, imageRecipe, linkRecipe) {
    try {
      const cartLists = await this.repository.AddCartItem(accountId, nameRecipe, imageRecipe, linkRecipe);
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
}

module.exports = AccountService;
