module.exports = {
    ingredientsRegister: (req, res, next) => {
      try {
        const username = req.body.username;
        const password = req.body.password;
  
        if (!username) {
          return res.status(200).json({
            status: false,
            statusCode: 200,
            msg: { en: "User account is required", vn: "Tài khoản đăng nhập là bắt buộc" },
          });
        }
        if (!password) {
          return res.status(200).json({
            status: false,
            statusCode: 200,
            msg: { en: "Password is required", vn: "Mật khẩu đăng nhập là bắt buộc" },
          });
        }
        if (username == "admin" && password == "admin123") {
          return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: { en: "Login successful", vn: "Đăng nhập thành công" },
          });
        } else {
          return res.status(200).json({
            status: false,
            statusCode: 200,
            msg: { en: "Account does not exist", vn: "Tài khoản không tồn tại" },
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: false,
          statusCode: 500,
          msg: { en: "Interal Server Error", vn: "Server bị lỗi" },
          error: error.message,
        });
      }
    },
  };
  