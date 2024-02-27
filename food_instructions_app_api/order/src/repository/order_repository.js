const { OrderSchema } = require("../model"); // Assuming your order model is in the "models" directory
const { FormateData } = require("../utils");
const { APIError, STATUS_CODES } = require("../utils/app-errors");

class OrderRepository {
  async CreateOrder(orderDetails) {
    try {
      const newOrder = new OrderModel(orderDetails);
      const savedOrder = await newOrder.save();
      return savedOrder;
    } catch (err) {
      throw new Error("Unable to create order");
    }
  }

  async GetOrders() {
    try {
      const orders = await OrderSchema.find();
      return FormateData(orders);
    } catch (err) {
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

  async UpdateOrderStatus(orderId, newStatus) {
    try {
      const updatedOrder = await OrderSchema.findByIdAndUpdate(
        orderId,
        { status: newStatus },
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
}

module.exports = OrderRepository;
