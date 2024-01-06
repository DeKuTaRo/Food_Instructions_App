const { RecipeSchema } = require("../model");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");

class RecipeRepository {
  async AddCommentsRecipe({ nameRecipe, imageRecipe, linkRecipe, comments }) {
    try {
      const checkRecipeExist = await RecipeSchema.findOne({ nameRecipe: nameRecipe });
      if (checkRecipeExist) {
        checkRecipeExist.comments.push(comments);
        checkRecipeExist.totalComments += 1;
        return await checkRecipeExist.save();
      } else {
        const totalComments = 1;
        const recipe = new RecipeSchema({ nameRecipe, imageRecipe, linkRecipe, comments, totalComments });
        return await recipe.save();
      }
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Add Comments");
    }
  }

  async GetCommentsByName(recipeName) {
    try {
      const checkRecipeExist = await RecipeSchema.findOne({ nameRecipe: recipeName });
      return checkRecipeExist;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Comments");
    }
  }
}

module.exports = RecipeRepository;
