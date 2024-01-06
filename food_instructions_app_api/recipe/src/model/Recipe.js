const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    nameRecipe: {
      type: String,
      required: true,
    },
    imageRecipe: {
      type: String,
      required: true,
    },
    linkRecipe: {
      type: String,
      required: true,
    },
    comments: [
      {
        username: { type: String },
        content: { type: String },
        rating: { type: Number },
        liked: { type: Number },
        timeComment: { type: String },
        replies: [
          {
            username: { type: String },
            timeReply: { type: String },
            content: { type: String },
            liked: { type: String },
          },
        ],
      },
    ],
    totalComments: { type: Number },
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
