const foodModel = require("../../models/food");

module.exports = {
  foodRegister: async (req, res, next) => {
    try {
      const name = req.body.name;
      const original = req.body.original;
      const description = req.body.description;
      const instructions = req.body.instructions;
      const video = req.body.video;
      const image = req.body.image;

      if (!name) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: { en: "Name is required", vn: "Vui lòng nhập tên" },
        });
      }

      if (!original) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: { en: "Original is required", vn: "Vui lòng nhập nguồn gốc" },
        });
      }

      if (!description) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: { en: "Description is required", vn: "Vui lòng nhập mô tả" },
        });
      }

      if (!instructions) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: { en: "Instructions is required", vn: "Vui lòng nhập  hướng dẫn" },
        });
      }

      if (!video) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: { en: "Video is required", vn: "Vui lòng thêm video" },
        });
      }

      if (!image) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: { en: "Image is required", vn: "Vui lòng thêm hình ảnh" },
        });
      }

      const food = new foodModel({
        name,
        original,
        description,
        instructions,
        video,
        image,
      });
      await food.save();
      return res.status(200).json({
        status: true,
        statusCode: 200,
        msg: {
          en: `Food has been added successfully.`,
          vn: `Món ăn đã được thêm thành công.`,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        msg: { en: "Interal Server Error", vn: "Server bị lỗi" },
        error: error.message,
      });
    }
  },
  foodGetAll: async (req, res, next) => {
    try {
      const perPage = 10;

      const allDocuments = await foodModel.find({}).exec();
      if (allDocuments.length > 0) {
        const pageTotal = Math.ceil(allDocuments.length / perPage);
        return res.status(200).json({
          status: true,
          statusCode: 200,
          msg: { en: "Get list of all products.", vn: "Danh sách tất cả sản phẩm." },
          // currentPage: page,
          // totalProducts,
          pageTotal,
          result: {
            perPage: allDocuments.length,
            data: allDocuments,
          },
        });
      } else {
        return res.status(200).json({
          status: true,
          statusCode: 200,
          msg: { en: "There is no data.", vn: "Danh sách trống, không có dữ liệu nào." },
          result: [],
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        msg: { en: "Interal Server Error" },
        error: error.message,
      });
    }
  },
  foodGetDetail: async (req, res, next) => {
    try {
      const itemId = req.params.id;
      const item = await foodModel.findById(itemId);

      if (!itemId) {
        return res.status(200).json({
          status: false,
          statusCode: 200,
          msg: {
            en: "Id is required",
            vn: "Id là bắt buộc",
          },
        });
      }
      console.log("item = ", item);
      if (item) {
        return res.status(200).json({
          status: true,
          statusCode: 200,
          msg: {
            en: `Detail of food"`,
            vn: `Thông tin chi tiết của sản phẩm`,
          },
          result: {
            data: item,
            // related: {
            //   supplier: supplierQuery,
            //   productRefs: {
            //     total: productRefsList.length,
            //     data: productRefsList.length > 0 ? productRefsList : [],
            //   },
            // },
          },
        });
      }
    } catch (error) {}
  },
};
