const OrderRepository = require("../repository/order_repository");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");
const OrderModel = require("../model");
class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }

  async CreateOrder(paymentInfo) {
    const {
      customerId,
      accountName,
      email,
      customerName,
      phoneNumber,
      address,
      quantity,
      totalAmount,
      status,
      productName,
      productLink,
      productImage,
    } = paymentInfo;
    try {
      const newOrder = await this.repository.CreateOrder({
        customerId,
        accountName,
        email,
        customerName,
        phoneNumber,
        address,
        quantity,
        totalAmount,
        status,
        productName,
        productLink,
        productImage,
      });
      return FormateData({
        newOrder,
      });
    } catch (err) {
      console.log(`err service`, err);
      throw new APIError("Data Not found", err);
    }
  }

  async GetAllOrders() {
    try {
      const orders = await this.repository.GetOrders();
      const formattedOrders = FormateData(orders);

      return formattedOrders;
    } catch (error) {
      console.error("Error in GetAllOrders service:", error);
      throw new APIError("Error retrieving orders", error);
    }
  }

  async GetOrderByStatus(status) {
    try {
      const orders = await this.repository.GetOrderByStatus(status);
      return FormatData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async UpdateOrder(orderId, orderUpdates) {
    try {
      const updatedOrder = await this.repository.UpdateOrder(
        orderId,
        orderUpdates
      );
      return FormatData(updatedOrder);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrderPayload(userId, orderInputs, data, event) {
    const payload = {
      event: event,
      data: orderInputs,
      order: data,
      userId: userId,
    };
    return FormatData(payload);
  }
}

module.exports = OrderService;
