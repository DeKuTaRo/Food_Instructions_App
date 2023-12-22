const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    linkImage: {
      type: String,
      required: true,
    },
    diet: {
      type: String,
    },
    health: {
      type: String,
    },
    cuisine: {
      type: String,
    },
    meal: {
      type: String,
    },
    dish: {
      type: String,
    },
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

module.exports = mongoose.model("recipe", RecipeSchema);
