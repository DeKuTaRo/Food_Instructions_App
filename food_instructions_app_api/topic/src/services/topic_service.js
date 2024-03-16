const TopicRepository = require("../repository/topic_repository");
const { FormateData } = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class RecipeService {
  constructor() {
    this.repository = new TopicRepository();
  }

  async AddNewTopic(path, title, description, history, fills, type) {
    try {
      const topicResult = await this.repository.AddNewTopic(path, title, description, history, fills, type);
      return FormateData(topicResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetAllData(searchTopicDebounce) {
    try {
      const topics = await this.repository.GetAllData(searchTopicDebounce);
      return FormateData({ topics });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetDetailTopic(label) {
    try {
      const topics = await this.repository.GetDetailTopic(label);
      return FormateData({ topics });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetDetail(id) {
    try {
      const topics = await this.repository.GetDetail(id);
      return FormateData({ topics });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async UpdateTopic(file, title, description, history, fills, type, id) {
    try {
      const topicUpdate = await this.repository.UpdateTopic(file, title, description, history, fills, type, id);
      return FormateData(topicUpdate);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async RemoveTopic(id) {
    try {
      const topicDelete = await this.repository.RemoveTopic(id);
      return FormateData(topicDelete);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetTopics() {
    try {
      const topics = await this.repository.GetTopics();

      return FormateData({
        topics,
      });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }
}

module.exports = RecipeService;
