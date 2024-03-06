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

  async AddCommentsToRecipe(recipeInputs, username) {
    try {
      const { nameRecipe, imageRecipe, linkRecipe, comments, pathAvatar } = recipeInputs;
      const commentsResult = await this.repository.AddCommentsRecipe(
        {
          pathAvatar,
          nameRecipe,
          imageRecipe,
          linkRecipe,
          comments,
        },
        username
      );
      return FormateData(commentsResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetRecipePayloadAddComment(userId, recipeInputs, comment, event) {
    const payload = {
      event: event,
      data: recipeInputs,
      comment: comment,
      userId: userId,
    };
    return FormateData(payload);
  }

  async GetRecipePayloadDeleteComment(userId, commentId, event) {
    const payload = {
      event: event,
      commentId: commentId,
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
      throw new APIError("Data Not found");
    }
  }

  async AddReplyToComment({ pathAvatar, timeComment, content, liked, _idComment, idRecipe, username }) {
    try {
      const replyComment = await this.repository.AddReplyComment({
        pathAvatar,
        timeComment,
        content,
        liked,
        _idComment,
        idRecipe,
        username,
      });
      return FormateData(replyComment);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async RemoveComment(_idComment, idRecipe) {
    try {
      const deleteComment = await this.repository.RemoveComment(_idComment, idRecipe);
      return FormateData(deleteComment);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async RemoveReplyComment(_idReplyComment, _idComment, idRecipe) {
    try {
      const deleteComment = await this.repository.RemoveReplyComment(_idReplyComment, _idComment, idRecipe);
      return FormateData(deleteComment);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }
}

module.exports = RecipeService;
