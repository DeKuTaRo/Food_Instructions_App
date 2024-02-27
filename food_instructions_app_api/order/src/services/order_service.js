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
         const existingCustomer = await this.repository.CreateAccount({
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
    } catch (err) {
     throw new APIError("Data Not found", err);
    }
  }

  async GetAllOrders() {
    try {
      const orders = await this.repository.GetAllOrders();
      return FormatData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
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
