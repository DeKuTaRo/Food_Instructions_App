const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const TopicService = require("../services/topic_service");

module.exports = (app) => {
  const service = new TopicService();

  app.post("/topic/addNew", upload.single("file"), async (req, res, next) => {
    try {
      let path = "";
      if (req.file) {
        path = req.file.path;
      }
      const { title, description, history, fills, type } = req.body;
      const { data } = await service.AddNewTopic(path, title, description, history, fills, type);
      if (data) {
        return res.status(200).json({ msg: "Thêm dữ liệu thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra", statusCode: 200 });
    } catch (err) {
      next(err);
    }
  });

  app.get("/topic/getData", async (req, res, next) => {
    try {
      const searchTopicDebounce = req.query.searchTopicDebounce;
      const { data } = await service.GetAllData(searchTopicDebounce);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/uploads/:filename", (req, res) => {
    try {
      const { filename } = req.params;
      const imagePath = path.resolve(__dirname, "../../uploads", filename);
      res.sendFile(imagePath);
    } catch (err) {
      next(err);
    }
  });

  app.get("/topic/getDetailTopic", async (req, res, next) => {
    try {
      const label = req.query.label;
      const { data } = await service.GetDetailTopic(label);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/topic/getDetail", async (req, res, next) => {
    try {
      const id = req.query.id;
      const { data } = await service.GetDetail(id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/topic/updateTopic", upload.single("file"), async (req, res, next) => {
    try {
      const { file, title, description, history, fills, type, id } = req.body;

      if (req.file) {
        file = req.file.path;
      }
      const { data } = await service.UpdateTopic(file, title, description, history, fills, type, id);

      if (data) {
        return res.status(200).json({ msg: "Cập nhật dữ liệu thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra", statusCode: 200 });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/topic/deleteTopic", async (req, res, next) => {
    try {
      const id = req.query.id;
      const { data } = await service.RemoveTopic(id);
      if (data) {
        return res.status(200).json({ msg: "Xóa dữ liệu thành công", statusCode: 200 });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra", statusCode: 200 });
    } catch (err) {
      next(err);
    }
  });

  app.get("/topic/getAllData", async (req, res, next) => {
    try {
      const { data } = await service.GetTopics();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Topic Service");
  });
};
