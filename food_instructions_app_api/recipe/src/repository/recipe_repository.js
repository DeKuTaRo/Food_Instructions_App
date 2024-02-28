const { RecipeSchema, CommentSchema } = require("../model");
const { APIError, BadRequestError, STATUS_CODES } = require("../utils/app-errors");
const mongoose = require("mongoose");
class RecipeRepository {
  async AddCommentsRecipe({ nameRecipe, imageRecipe, linkRecipe, comments }, username) {
    try {
      const checkRecipeExist = await RecipeSchema.findOne({ nameRecipe: nameRecipe });
      comments.listUserLikeComment = [];
      comments.nameRecipe = nameRecipe;
      comments.username = username;
      const newComment = new CommentSchema(comments);
      if (checkRecipeExist) {
        checkRecipeExist.comments.push(newComment);
        checkRecipeExist.totalComments += 1;
        await checkRecipeExist.save();
      } else {
        const totalComments = 1;
        const recipe = new RecipeSchema({ nameRecipe, imageRecipe, linkRecipe, comments: newComment, totalComments });
        await recipe.save();
      }
      return await newComment.save();
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

  async SetLikeToComment(userInfo, recipeComment) {
    const { _id, username } = userInfo;
    const { _idComment, isLiked, idRecipe } = recipeComment;

    const newUserInfo = { idUsername: _id, username: username };

    try {
      const checkExistRecipe = await RecipeSchema.findOne({ _id: idRecipe });
      const checkExistComment = await CommentSchema.findOne({ _id: _idComment });

      if (isLiked) {
        const checkUserLikeComment = checkExistComment.listUserLikeComment.some((item) => item.idUsername === _id);

        if (!checkUserLikeComment) {
          checkExistComment.listUserLikeComment.push(newUserInfo);
        }
        checkExistComment.liked += 1;
        await checkExistComment.save();
      } else {
        const indexComment = checkExistComment.listUserLikeComment.findIndex((obj) => obj.idUsername === _id);
        if (indexComment !== -1) {
          checkExistComment.listUserLikeComment.splice(indexComment, 1);
        }
        checkExistComment.liked -= 1;
        await checkExistComment.save();
      }

      const indexCommentRecipe = checkExistRecipe.comments.findIndex((item) => item._id.toString() === _idComment);
      if (indexCommentRecipe !== -1) {
        checkExistRecipe.comments[indexCommentRecipe] = checkExistComment;
      }
      return await checkExistRecipe.save();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Like This Comment");
    }
  }

  async AddReplyComment({ timeComment, content, liked, _idComment, idRecipe, username }) {
    try {
      const checkExistRecipe = await RecipeSchema.findOne({ _id: idRecipe });

      const checkExistComment = await CommentSchema.findOne({ _id: _idComment });
      if (checkExistComment) {
        const replyComment = {
          username: username,
          timeComment: timeComment,
          content: content,
          liked: liked,
        };
        checkExistComment.replies.push(replyComment);
        await checkExistComment.save();
      }

      const indexCommentRecipe = checkExistRecipe.comments.findIndex((item) => item._id.toString() === _idComment);
      if (indexCommentRecipe !== -1) {
        checkExistRecipe.comments[indexCommentRecipe] = checkExistComment;
      }
      checkExistRecipe.totalComments += 1;
      return await checkExistRecipe.save();
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Reply This Comment");
    }
  }

  async RemoveComment(_idComment, idRecipe) {
    try {
      const deleteComment = await CommentSchema.findByIdAndDelete(_idComment);
      const checkExistRecipe = await RecipeSchema.findOne({ _id: idRecipe });
      const updateComments = checkExistRecipe.comments.filter(
        (item) => item._id.toString() !== deleteComment._id.toString()
      );

      const updateRecipe = await RecipeSchema.findOneAndUpdate(
        { _id: idRecipe },
        { $set: { comments: updateComments, totalComments: updateComments.length } },
        { new: true }
      );
      return updateRecipe;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Reply This Comment");
    }
  }
}

module.exports = RecipeRepository;
