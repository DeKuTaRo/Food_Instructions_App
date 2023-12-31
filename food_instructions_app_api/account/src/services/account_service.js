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
          const token = await GenerateSignature({ username: existingAccount.username, _id: existingAccount._id });
          return FormateData({
            id: existingAccount._id,
            token,
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

      const existingCustomer = await this.repository.CreateAccount({ username, email, password: userPassword, salt });

      const token = await GenerateSignature({ username: username, _id: existingCustomer._id });

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

  async AddComments(recipeInputs, userId) {
    const { nameRecipe, imageRecipe, linkRecipe, comments } = recipeInputs;
    try {
      const commentsResult = await this.repository.AddComments(
        {
          nameRecipe,
          imageRecipe,
          linkRecipe,
          comments,
        },
        userId
      );
      return FormateData(commentsResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data, userId } = payload.data;
    switch (event) {
      case "ADD_COMMENTS_TO_RECIPES":
        this.AddComments(data, userId);
        break;
      default:
        break;
    }
  }
}

module.exports = AccountService;
