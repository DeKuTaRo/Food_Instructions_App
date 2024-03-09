const { OrderSchema } = require("../model"); // Assuming your order model is in the "models" directory
const { FormateData } = require("../utils");
const { APIError, STATUS_CODES } = require("../utils/app-errors");

class OrderRepository {
  async CreateOrder(orderDetails) {
    try {
      const newOrder = new OrderSchema(orderDetails);
      const savedOrder = await newOrder.save();
      return savedOrder;
    } catch (err) {
      console.log(`err respon `, err);
      throw new Error("Unable to create order");
    }
  }

  async GetOrders() {
    try {
      const orders = await OrderSchema.find();
      return FormateData(orders);
    } catch (err) {
      console.log("res", err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Orders"
      );
    }
  }

  async GetOrderByStatus(status) {
    try {
      const orders = await OrderSchema.find({ status });
      return FormateData(orders);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Orders by Status"
      );
    }
  }

  async GetOrderById(id) {
    try {
      const orders = await OrderSchema.findOne({ _id: id });
      return FormateData(orders);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Orders by Status"
      );
    }
  }

  async UpdateOrder(orderId, type) {
    try {
      const updatedOrder = await OrderSchema.findByIdAndUpdate(
        orderId,
        { status: type },
        { new: true }
      );
      return FormateData(updatedOrder);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update Order Status"
      );
    }
  }

  async UpdatePaymentOrder(idOrder) {
    try {
      const updatedOrder = await OrderSchema.findByIdAndUpdate(
        idOrder,
        { status: "PaymentSuccess" },
        { new: true }
      );
      return updatedOrder;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update Payment Order Success"
      );
    }
  }

  async GetDetailOrder(idOrder) {
    try {
      const detailOrder = await OrderSchema.find({ _id: ObjectId(idOrder) });
      return detailOrder;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Detail Order"
      );
    }
  }
}

module.exports = OrderRepository;
