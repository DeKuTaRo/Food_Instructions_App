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
      console.log("data = ", data);
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

  app.post("/order/paymentMoMo", async (req, res, next) => {
    try {
      const { priceGlobal, orderId } = req.body;
      // const { priceGlobal } = req.body;
      var partnerCode = "MOMO";
      var accessKey = "F8BBA842ECF85";
      var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      // chuỗi ngẫu nhiên để phân biệt cái request
      var requestId = partnerCode + new Date().getTime() + "id";
      // mã đặt đơn
      // var orderId = new Date().getTime() + ":0123456778";
      //
      var orderInfo = "Thanh toán qua ví MoMo";
      // cung cấp họ về một cái pages sau khi thanh toán sẽ trở về trang nớ
      var redirectUrl = "http://localhost:3000/thankyou";
      // Trang thank you
      var ipnUrl = "http://localhost:3000/thankyou";
      // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
      // số tiền
      var amount = priceGlobal * 100;
      // var requestType = "payWithATM";
      // show cái thông tin thẻ, cái dưới quét mã, cái trên điền form
      var requestType = "captureWallet";
      var extraData = ""; //pass empty value if your merchant does not have stores

      //before sign HMAC SHA256 with format
      //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
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
      // thư viện node js , model tích họp ,liên quan đến mã hóa, giải mã và bảo mật, cung cấp chức năng và phương thức sử lý dữ liệu liên quan đến mật mã
      console.log("rawSignature = ", rawSignature);

      var signature = crypto
        // thuật toán tạo ra mới với tham số là secretkey
        .createHmac("sha256", secretkey)
        // thêm biến rawSignature vào băm
        .update(rawSignature)
        // tạo chữ kí và chuyển sang mã hex
        .digest("hex");

      console.log("signature = ", signature);
      //json object send to MoMo endpoint, gửi cái aip của momo
      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        // accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: "en",
      });

      //Create the HTTPS objects, tạo sever, https để call cái aip khác, call tới momo
      const https = require("https");
      // yêu cầu truyền đi
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
      //Send the request and get the response
      const reqq = https.request(options, (resMom) => {
        console.log(`Status: ${resMom.statusCode}`);
        console.log(`Headers: ${JSON.stringify(resMom.headers)}`);
        resMom.setEncoding("utf8");
        // trả về body là khi mình call momo
        resMom.on("data", (body) => {
          // url dẫn đến tranh toán của momo
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
      // write data to request body
      console.log("Sending....");
      reqq.write(requestBody);
      reqq.end();
    } catch (err) {
      console.log("err api = ", err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Order Service");
  });
};
