const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    accountId: {
      type: String,
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
    orders: [
      {
        productName: { type: String },
        productImage: { type: String },
        productLink: { type: String },
        quantity: { type: Number },
        instructions: {
          type: Object,
        },
      },
    ],
    timeCreate: {
      type: String,
    },
    partnerCode: {
      type: String,
    },
    requestId: {
      type: String,
    },
    amount: {
      type: String,
    },
    orderInfo: {
      type: String,
    },
    orderType: {
      type: String,
    },
    transId: {
      type: String,
    },
    resultCode: {
      type: String,
    },
    message: {
      type: String,
    },
    payType: {
      type: String,
    },
    responseTime: {
      type: String,
    },
    extraData: {
      type: String,
    },
    signature: {
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
