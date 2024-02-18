const fs = require("fs");
const path = require("path");

const { TopicSchema } = require("../model");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");
class TopicRepository {
  async AddNewTopic(path, title, description, history, fills, type) {
    try {
      const newTopic = new TopicSchema({
        mainImage: path,
        title: title,
        description: description,
        history: history,
        fills: fills,
        type: type,
      });
      return await newTopic.save();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add New Topic");
    }
  }

  async GetAllData(searchTopicDebounce) {
    try {
      if (searchTopicDebounce !== "") {
        return await TopicSchema.find({ title: { $regex: searchTopicDebounce, $options: "i" } });
      }
      return await TopicSchema.find();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Datas");
    }
  }

  async GetDetailTopic(label) {
    try {
      const detailTopic = await TopicSchema.findOne({ title: label });
      return detailTopic;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Topic Detail");
    }
  }

  async GetDetail(id) {
    try {
      const detailTopic = await TopicSchema.findById({ _id: id });
      return detailTopic;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Topic Detail");
    }
  }

  async UpdateTopic(file, title, description, history, fills, type, id) {
    try {
      const updateTopic = await TopicSchema.findByIdAndUpdate(
        id,
        {
          mainImage: file,
          title: title,
          description: description,
          history: history,
          type: type,
          fills: fills,
        },
        {
          new: true,
        }
      );
      return updateTopic;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Topic Detail");
    }
  }

  async RemoveTopic(id) {
    try {
      const item = await TopicSchema.findById(id);
      if (item.mainImage) {
        const imagePath = path.resolve(__dirname, "../../", item.mainImage);

        fs.unlinkSync(imagePath);
      }
      const deleteTopic = await TopicSchema.findByIdAndDelete(id);
      return deleteTopic;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Delete Topic");
    }
  }
}

module.exports = TopicRepository;
