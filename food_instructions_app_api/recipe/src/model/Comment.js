const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  nameRecipe: String,
  username: String,
  content: String,
  rating: Number,
  liked: Number,
  timeComment: String,
  replies: [
    {
      username: { type: String },
      timeComment: { type: String },
      content: { type: String },
      liked: { type: Number },
    },
  ],
  listUserLikeComment: [
    {
      idUsername: { type: String },
      username: { type: String },
    },
  ],
});

module.exports = mongoose.model("comment", CommentSchema);
