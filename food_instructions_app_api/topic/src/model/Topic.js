const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TopicSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    history: {
      type: String,
    },
    fills: {
      type: String,
    },
    type: {
      type: String,
    },
    mainImage: {
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

module.exports = mongoose.model("topic", TopicSchema);
