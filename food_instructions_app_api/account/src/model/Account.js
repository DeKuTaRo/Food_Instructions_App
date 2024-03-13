const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    path: {
      type: String,
    },
    role: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    tokenResetPassword: String,
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
    wishlist: [
      {
        accountName: { type: String },
        nameRecipe: { type: String },
        imageRecipe: { type: String },
        linkRecipe: { type: String },
        quantity: { type: Number },
        check: { type: Boolean },
        totalAmount: { type: Number },
        ingredientLines: { type: Object },
      },
    ],
    comments: [{ type: Object, ref: "comment", required: true }],
    orders: [
      {
        _id: { type: String, required: true },
        amount: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
    cart: [
      {
        accountName: { type: String },
        nameRecipe: { type: String },
        imageRecipe: { type: String },
        linkRecipe: { type: String },
        quantity: { type: Number },
        check: { type: Boolean },
        totalAmount: { type: Number },
        ingredientLines: { type: Object },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("account", AccountSchema);
