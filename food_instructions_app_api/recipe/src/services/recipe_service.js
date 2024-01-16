const RecipeRepository = require("../repository/recipe_repository");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class RecipeService {
  constructor() {
    this.repository = new RecipeRepository();
  }

  async GetRecipesByName(recipeName) {
    try {
      const recipes = await this.repository.GetCommentsByName(recipeName);

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

  async AddLikeToComment(userInfo, recipeComment) {
    const { _id, username } = userInfo;
    const { _idComment, isLiked, idRecipe } = recipeComment;
    try {
      const likeComment = await this.repository.SetLikeToComment({ _id, username }, { _idComment, isLiked, idRecipe });
      return FormateData(likeComment);
    } catch (err) {
      console.log("err service = ", err);
      throw new APIError("Data Not found");
    }
  }

  async AddReplyToComment({ timeComment, content, liked, _idComment, idRecipe, username }) {
    try {
      const replyComment = await this.repository.AddReplyComment({ timeComment, content, liked, _idComment, idRecipe, username });
      return FormateData(replyComment);
    } catch (err) {
      console.log("err service = ", err);
      throw new APIError("Data Not found");
    }
  }
}

module.exports = RecipeService;
