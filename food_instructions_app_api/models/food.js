const mongoose = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const FoodSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    original: {
      type: String,
    },
    description: {
      type: String,
    },
    instructions: {
      type: String,
    },
    video: {
      type: Object,
    },
    image: {
      type: Object,
    },

  },
  {
    timestamps: true,
  }
);

// FoodSchema.plugin(mongooseDelete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });

module.exports = mongoose.model("Food", FoodSchema);
