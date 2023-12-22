const { RecipeSchema } = require("../model");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");

class RecipeRepository {
  async CreateRecipe({ name, link, linkImage, diet, health, cuisine, meal, dish }) {
    try {
      const recippe = new RecipeSchema({ name, link, linkImage, diet, health, cuisine, meal, dish });
      const recippeResult = await recippe.save();
      return recippeResult;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Recipe");
    }
  }

  async Recipes() {
    try {
      return await RecipeSchema.find();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Recipes");
    }
  }
}

module.exports = RecipeRepository;
