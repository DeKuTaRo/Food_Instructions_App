const { OrderSchema } = require("../model"); // Assuming your order model is in the "models" directory
const { FormateData } = require("../utils");
const { APIError, STATUS_CODES } = require("../utils/app-errors");

class OrderRepository {
  async CreateOrder(orderDetails) {
    try {
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
      } = orderDetails;

      const orders = [];
      orders.push({
        productName,
        productImage,
        productLink,
        quantity,
        instructions,
      });

      const newOrder = new OrderSchema({
        accountId: _id,
        accountName: username,
        customerName,
        phoneNumber,
        address,
        status,
        orders,
        totalAmount,
        timeCreate,
      });
      return await newOrder.save();
    } catch (err) {
      console.log(`err repo `, err);
      throw new Error("Unable to create order");
    }
  }

  async CreateOrders(orderDetails) {
    try {
      const { _id, username, customerName, phoneNumber, address, status, orders, totalAmount, timeCreate } =
        orderDetails;

      const newOrders = orders.map((item) => ({
        productName: item.nameRecipe,
        productImage: item.imageRecipe,
        productLink: item.linkRecipe,
        quantity: item.quantity,
        instructions: item.ingredientLines,
      }));

      const newOrder = new OrderSchema({
        accountId: _id,
        accountName: username,
        customerName,
        phoneNumber,
        address,
        status,
        orders: newOrders,
        totalAmount,
        timeCreate,
      });
      return await newOrder.save();
    } catch (err) {
      console.log(`err repo `, err);
      throw new Error("Unable to create order");
    }
  }

  async GetOrders() {
    try {
      const orders = await OrderSchema.find();
      return FormateData(orders);
    } catch (err) {
      console.log("res", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Orders");
    }
  }

  async GetOrderByStatus(status) {
    try {
      const orders = await OrderSchema.find({ status });
      return FormateData(orders);
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Orders by Status");
    }
  }

  async GetOrderById(id) {
    try {
      const orders = await OrderSchema.findOne({ _id: id });
      return FormateData(orders);
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Orders by Status");
    }
  }

  async UpdateOrder(orderId, type) {
    try {
      const updatedOrder = await OrderSchema.findByIdAndUpdate(orderId, { status: type }, { new: true });
      return FormateData(updatedOrder);
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Order Status");
    }
  }

  async UpdatePaymentOrder(idOrder) {
    try {
      const updatedOrder = await OrderSchema.findByIdAndUpdate(idOrder, { status: "PaymentSuccess" }, { new: true });
      return updatedOrder;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Payment Order Success");
    }
  }

  async GetDetailOrder(idOrder) {
    try {
      const detailOrder = await OrderSchema.find({ _id: ObjectId(idOrder) });
      return detailOrder;
    } catch (err) {
      console.log("err repo = ", err);
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Detail Order");
    }
  }
}

module.exports = OrderRepository;
