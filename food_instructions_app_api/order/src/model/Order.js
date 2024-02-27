const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer", // Thay "Customer" bằng tên mô hình khách hàng nếu có
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
    // Thêm các trường mới cho đơn hàng
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("order", OrderSchema);
