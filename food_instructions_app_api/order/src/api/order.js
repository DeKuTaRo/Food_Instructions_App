const OrderService = require("../services/order_service");
const UserAuth = require("../middleware/auth");
const { PublishAccountEvent } = require("../utils");

module.exports = (app) => {
  const service = new OrderService();

  // Tạo đơn hàng
  app.post("/order/create", UserAuth, async (req, res, next) => {
    try {
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
      } = req.body;

      const { data } = await service.CreateOrder({
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
      return res.json(data);
    } catch (err) {
      console.log(`err api`, err);
      next(err);
    }
  });

  // Xem tất cả đơn hàng
  app.get("/order/all", UserAuth, async (req, res, next) => {
    try {
      const data = await service.GetAllOrders(); // Use the correct instance of OrderService

      if (data) {
        res.status(200).json(data); // Send data within an object for consistency
      } else {
        res.status(404).json({ msg: "Không tìm thấy đơn hàng nào." }); // Adjusted response message
      }
    } catch (err) {
      console.error("api", err); // Use console.error for error messages
      next(err);
    }
  });

  // Xem đơn hàng theo trạng thái
  app.get("/order/status/:status", UserAuth, async (req, res, next) => {
    try {
      const { status } = req.params;
      const { data } = await service.GetOrderByStatus(status);

      if (data) {
        res.status(200).json(data);
        return;
      }

      res.status(200).json({ msg: "Có lỗi xảy ra khi lấy đơn hàng theo trạng thái" });
    } catch (err) {
      next(err);
    }
  });

  // Cập nhật đơn hàng
  app.put("/order/update/:orderId", UserAuth, async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const orderUpdates = req.body;
      const { data } = await service.UpdateOrder(orderId, orderUpdates);

      if (data) {
        res.status(200).json({ statusCode: 200, msg: "Đơn hàng được cập nhật thành công" });
        return;
      }

      res.status(200).json({ msg: "Có lỗi xảy ra khi cập nhật đơn hàng" });
    } catch (err) {
      next(err);
    }
  });

  // Cập nhật đơn hàng đã được thanh toán
  app.put("/order/payment", UserAuth, async (req, res, next) => {
    try {
      const { idOrder } = req.body;
      const { data } = await service.UpdatePaymentOrder(idOrder);
      if (data) {
        return res.status(200).json({ msg: "Thanh toán thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Lỗi thanh toán đơn hàng, vui lòng thử lại sau", statusCode: 500 });
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.get("/order/getDetailOrder", UserAuth, async (req, res, next) => {
    try {
      const { idOrder } = req.body;
      const { data } = await service.GetDetailOrder(idOrder);
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(200).json({ msg: "Lỗi thanh toán đơn hàng, vui lòng thử lại sau", statusCode: 500 });
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Order Service");
  });
};
