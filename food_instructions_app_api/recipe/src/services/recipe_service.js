const RecipeRepository = require("../repository/recipe_repository");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class RecipeService {
  constructor() {
    this.repository = new RecipeRepository();
  }

  async GetRecipes() {
    try {
      const recipes = await this.repository.Recipes();

      return FormateData({
        recipes,
      });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async AddCommentsToRecipe(recipeInputs) {
    try {
      const { nameRecipe, imageRecipe, linkRecipe, comments } = recipeInputs;
      const commentsResult = await this.repository.AddCommentsRecipe({
        nameRecipe,
        imageRecipe,
        linkRecipe,
        comments,
      });
      return FormateData(commentsResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetRecipePayload(userId, recipeInputs, event) {
    const payload = {
      event: event,
      data: recipeInputs,
      userId: userId,
    };
    return FormateData(payload);
  }
}

module.exports = RecipeService;
