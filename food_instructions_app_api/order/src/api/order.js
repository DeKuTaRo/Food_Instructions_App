const OrderService = require("../services/order_service");
const UserAuth = require("../middleware/auth");
const { PublishAccountEvent } = require("../utils");

module.exports = (app) => {
  const service = new OrderService();

  // Tạo đơn hàng
  app.post("/order/create", UserAuth, async (req, res, next) => {
    try {
      const { _id, username } = req.user;

      const {
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
      } = req.body;

      const { data } = await service.CreateOrder({
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
      if (data) {
        return res.status(200).json({ msg: "Tạo hóa đơn thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Tạo hóa đơn thất bại", statusCode: 500 });
    } catch (err) {
      console.log(`err api`, err);
      next(err);
    }
  });

  app.post("/order/creates", UserAuth, async (req, res, next) => {
    try {
      const { _id, username } = req.user;
      const { customerName, phoneNumber, address, status, orders, totalAmount, timeCreate } = req.body;

      const { data } = await service.CreateOrders({
        _id,
        username,
        customerName,
        phoneNumber,
        address,
        status,
        orders: JSON.parse(orders),
        totalAmount,
        timeCreate,
      });
      if (data) {
        return res.status(200).json({ msg: "Tạo hóa đơn thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Tạo hóa đơn thất bại", statusCode: 500 });
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

  app.get("/order/id/:id", UserAuth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await service.GetOrderById(id);
      console.log("sss", data);
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
      const { type } = req.body;
      const { data } = await service.UpdateOrder(orderId, type);

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
  app.post("/order/payment", UserAuth, async (req, res, next) => {
    try {
      const { idOrder } = req.body;
      console.log("req.body = ", req.body);
      const { data } = await service.UpdatePaymentOrder(idOrder);
      if (data) {
        return res.status(200).json({ msg: "Thanh toán thành công", statusCode: 200 });
      }
      return res.status(200).json({
        msg: "Lỗi thanh toán đơn hàng, vui lòng thử lại sau",
        statusCode: 500,
      });
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
      return res.status(200).json({
        msg: "Lỗi thanh toán đơn hàng, vui lòng thử lại sau",
        statusCode: 500,
      });
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.post("/order/updateStatusOrder", async (req, res, next) => {
    try {
      console.log("req.body = ", req.body);
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });
  app.get("/", (req, res, next) => {
    res.send("Order Service");
  });
};
