const OrderService = require("../services/order_service");
const UserAuth = require("../middleware/auth");
const { APP_SECRET } = require("../config");
const crypto = require("crypto");

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
        return res.status(200).json({ msg: "Tạo hóa đơn thành công", statusCode: 200, idOrder: data.newOrder._id });
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
        return res.status(200).json({ msg: "Tạo hóa đơn thành công", statusCode: 200, idOrder: data.newOrder._id });
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
      const {
        partnerCode,
        orderId,
        requestId,
        amount,
        orderInfo,
        orderType,
        transId,
        resultCode,
        message,
        payType,
        responseTime,
        extraData,
        signature,
      } = req.body;
      const { data } = await service.UpdatePaymentOrder(
        partnerCode,
        orderId,
        requestId,
        amount,
        orderInfo,
        orderType,
        transId,
        resultCode,
        message,
        payType,
        responseTime,
        extraData,
        signature
      );
      if (data) {
        return res.status(200).json({ msg: "Thanh toán thành công", statusCode: 200 });
      }
      return res.status(200).json({
        msg: "Lỗi thanh toán đơn hàng, vui lòng thử lại sau",
        statusCode: 500,
      });
    } catch (err) {
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
      next(err);
    }
  });

  app.post("/order/paymentMoMo", async (req, res, next) => {
    try {
      const { priceGlobal, orderId, orderInfo } = req.body;
      var partnerCode = "MOMO";
      var accessKey = "F8BBA842ECF85";
      var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

      var requestId = partnerCode + new Date().getTime() + "id";

      var redirectUrl = "http://localhost:3000/thankyou";
      var ipnUrl = "http://localhost:3000/thankyou";
      var amount = priceGlobal * 100;
      var requestType = "payWithATM";
      var extraData = "";

      var rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;

      var signature = crypto.createHmac("sha256", secretkey).update(rawSignature).digest("hex");

      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Food Instructions App",
        storeId: "Website cung cấp nguyên liệu và hướng dẫn nấu ăn",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        requestType: requestType,
        extraData: extraData,
        lang: "en",
        signature: signature,
      });

      const https = require("https");
      const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      };
      const reqq = https.request(options, (resMom) => {
        console.log(`Status: ${resMom.statusCode}`);
        console.log(`Headers: ${JSON.stringify(resMom.headers)}`);
        resMom.setEncoding("utf8");
        resMom.on("data", (body) => {
          console.log(JSON.parse(body));
          return res.json(JSON.parse(body));
        });
        resMom.on("end", () => {
          console.log("No more data in response.");
        });
      });

      reqq.on("error", (e) => {
        console.log(`problem with request: ${e.message}`);
      });
      console.log("Sending....");
      reqq.write(requestBody);
      reqq.end();
    } catch (err) {
    }
  });

  app.post("/order/updateStatus", UserAuth, async (req, res, next) => {
    try {
      const { idOrder, type } = req.body;
      const { data } = await service.UpdateStatus(idOrder, type);

      if (data) {
        return res.json(data);
      }

      res.status(200).json({ msg: "Có lỗi xảy ra khi cập nhật đơn hàng" });
    } catch (err) {
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Order Service");
  });
};
