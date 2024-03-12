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
      _id,
      username,
      customerName,
      phoneNumber,
      address,
      status,
      quantity,
      productName,
      productImage,
      productLink,
      instructions,
      totalAmount,
      timeCreate,
    } = paymentInfo;
    try {
      const newOrder = await this.repository.CreateOrder({
        _id,
        username,
        customerName,
        phoneNumber,
        address,
        status,
        quantity,
        productName,
        productImage,
        productLink,
        instructions,
        totalAmount,
        timeCreate,
      });
      return FormateData({
        newOrder,
      });
    } catch (err) {
      console.log(`err service`, err);
      throw new APIError("Data Not found", err);
    }
  }

  async CreateOrders(paymentInfo) {
    const { _id, username, customerName, phoneNumber, address, status, orders, totalAmount, timeCreate } = paymentInfo;
    try {
      const newOrder = await this.repository.CreateOrders({
        _id,
        username,
        customerName,
        phoneNumber,
        address,
        status,
        orders,
        totalAmount,
        timeCreate,
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

  async GetOrderById(id) {
    try {
      const orders = await this.repository.GetOrderById(id);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async UpdateOrder(orderId, type) {
    try {
      const updatedOrder = await this.repository.UpdateOrder(orderId, type);
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
