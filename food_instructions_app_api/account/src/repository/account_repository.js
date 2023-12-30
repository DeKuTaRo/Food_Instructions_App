const { AccountModel, AddressModel } = require("../model");
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

  async AddCartItem(customerId, { _id, name, price, banner }, qty, isRemove) {
    try {
      const profile = await AccountModel.findById(customerId).populate("cart");

      if (profile) {
        const cartItem = {
          product: {
            _id,
            name,
            price,
            banner,
          },
          unit: qty,
        };

        let cartItems = profile.cart;

        if (cartItems.length > 0) {
          let isExist = false;
          cartItems.map((item) => {
            if (item.product._id.toString() === product._id.toString()) {
              if (isRemove) {
                cartItems.splice(cartItems.indexOf(item), 1);
              } else {
                item.unit = qty;
              }
              isExist = true;
            }
          });

          if (!isExist) {
            cartItems.push(cartItem);
          }
        } else {
          cartItems.push(cartItem);
        }

        profile.cart = cartItems;

        const cartSaveResult = await profile.save();

        return cartSaveResult;
      }
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Customer");
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
}

module.exports = AccountRepository;
