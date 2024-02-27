const OrderService = require("../services/order_service");
const UserAuth = require("../middleware/auth");
const { PublishAccountEvent } = require("../utils");

module.exports = (app) => {
  const service = new OrderService();

  // Tạo đơn hàng
  app.post("/order/create", async (req, res, next) => {
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
      next(err);
    }
  });



  // Xem tất cả đơn hàng
  app.get("/order/all", UserAuth, async (req, res, next) => {
    try {
      const { data } = await orderService.GetAllOrders();

      if (data) {
        res.status(200).json(data);
        return;
      }

      res.status(200).json({ msg: "Có lỗi xảy ra khi lấy tất cả đơn hàng" });
    } catch (err) {
      next(err);
    }
  });

  // Xem đơn hàng theo trạng thái
  app.get("/order/status/:status", UserAuth, async (req, res, next) => {
    try {
      const { status } = req.params;
      const { data } = await orderService.GetOrderByStatus(status);

      if (data) {
        res.status(200).json(data);
        return;
      }

      res
        .status(200)
        .json({ msg: "Có lỗi xảy ra khi lấy đơn hàng theo trạng thái" });
    } catch (err) {
      next(err);
    }
  });

  // Cập nhật đơn hàng
  app.put("/order/update/:orderId", UserAuth, async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const orderUpdates = req.body;
      const { data } = await orderService.UpdateOrder(orderId, orderUpdates);

      if (data) {
        res
          .status(200)
          .json({ statusCode: 200, msg: "Đơn hàng được cập nhật thành công" });
        return;
      }

      res.status(200).json({ msg: "Có lỗi xảy ra khi cập nhật đơn hàng" });
    } catch (err) {
      next(err);
    }
  });

  // Thêm các định tuyến khác theo yêu cầu của ứng dụng

  app.get("/", (req, res, next) => {
    res.send("Order Service");
  });
};