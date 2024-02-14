const { AccountModel, AddressModel, CommentModel } = require("../model");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");

class AccountRepository {
  async CreateAccount({ username, email, password, salt }) {
    try {
      const account = new AccountModel({
        username,
        email,
        password,
        salt,
        isAdmin: false,
        role: "user",
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

  async AddCartItem(accountId, nameRecipe, imageRecipe, linkRecipe) {
    const recipe = {
      nameRecipe,
      imageRecipe,
      linkRecipe,
      unit: 1,
    };
    try {
      const account = await AccountModel.findById(accountId);

      const checkNameExist = account.cart.findIndex((item) => item.nameRecipe === nameRecipe);

      if (checkNameExist !== -1) {
        account.cart[checkNameExist].unit += 1;
      } else {
        account.cart.push(recipe);
      }
      await account.save();
      return account.cart;
    } catch (err) {
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
}

module.exports = AccountRepository;
