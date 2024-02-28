const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer", // Thay "Customer" bằng tên mô hình khách hàng nếu có
    },
    accountName: {
      type: String,
    },
    customerName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Ordered"],
      default: "Pending",
    },
    // Thêm các trường mới cho đơn hàng
    productName: {
      type: String,
    },
    productImage: {
      type: String,
    },
    productLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("order", OrderSchema);
