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
      paymentMethod,
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
      timeCreate
    } = paymentInfo;
    try {
      const newOrder = await this.repository.CreateOrder({
        paymentMethod,
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
        timeCreate
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
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async UpdateOrder(orderId, orderUpdates) {
    try {
      const updatedOrder = await this.repository.UpdateOrder(orderId, orderUpdates);
      return FormateData(updatedOrder);
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
    return FormateData(payload);
  }

  async UpdatePaymentOrder(idOrder) {
    try {
      const payment = await this.repository.UpdatePaymentOrder(idOrder);
      return FormateData(payment);
    } catch (err) {
      console.log("err ser = ", err);
      throw new APIError("Data Not found", err);
    }
  }

  async GetDetailOrder(idOrder) {
    try {
      const detailOrder = await this.repository.GetDetailOrder(idOrder);
      return FormateData(detailOrder);
    } catch (err) {
      console.log("err ser = ", err);
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = OrderService;
