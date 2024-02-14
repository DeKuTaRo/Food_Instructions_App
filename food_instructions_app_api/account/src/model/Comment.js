const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  nameRecipe: { type: String },
  imageRecipe: { type: String },
  linkRecipe: { type: String },
  content: { type: String },
  rating: { type: Number },
  timeComment: { type: String },
});

module.exports = mongoose.model("comment", CommentSchema);
