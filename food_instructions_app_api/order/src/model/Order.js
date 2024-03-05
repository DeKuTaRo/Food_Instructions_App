const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    paymentMethod: {
      type: String,
    },
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
    // NotPayment: Chưa thanh toán, PaymentSuccess: Đặt thành công, Delivered: Đang giao, Completed: Giao thành công,  Cancelled: Đã hủy
    status: {
      type: String,
      enum: ["NotPayment", "PaymentSuccess", "Delivered", "Completed", "Cancelled"],
      default: "NotPayment",
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
    timeCreate: {
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

module.exports = mongoose.model("order", OrderSchema);
