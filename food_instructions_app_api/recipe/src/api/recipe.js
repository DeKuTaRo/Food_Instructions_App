const RecipeService = require("../services/recipe_service");

const UserAuth = require("../middleware/auth");
const { PublishAccountEvent } = require("../utils");

module.exports = (app) => {
  const service = new RecipeService();

  app.post("/recipe/comments", UserAuth, async (req, res, next) => {
    const recipeInputs = req.body;
    const { _id, username } = req.user;
    try {
      const { data } = await service.AddCommentsToRecipe(recipeInputs, username);
      // get payload // to send account service
      // const dataPayload = await service.GetRecipePayloadAddComment(_id, recipeInputs, data, "ADD_COMMENTS_TO_RECIPES");
      // PublishAccountEvent(dataPayload);
      if (data) {
        return res.status(200).json({ statusCode: 200, msg: "Comment successfully added" });
      }
      return res.status(200).json({ msg: "An error occurred, please try again later" });
    } catch (err) {
      next(err);
    }
  });

  app.get("/recipe/getComments", async (req, res, next) => {
    const recipeName = req.query.recipeName;

    try {
      const { data } = await service.GetRecipesByName(recipeName);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/recipe/liked", UserAuth, async (req, res, next) => {
    const { _id, username } = req.user;
    const { _idComment, isLiked, idRecipe } = req.body;
    try {
      const { data } = await service.AddLikeToComment({ _id, username }, { _idComment, isLiked, idRecipe });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/recipe/replyComments", UserAuth, async (req, res, next) => {
    const {
      pathAvatar,
      timeComment,
      content,
      liked,
      rating,
      _idComment,
      idRecipe,
      nameRecipe,
      imageRecipe,
      linkRecipe,
    } = req.body;
    const { _id, username } = req.user;
    const comments = {
      content,
      timeComment,
      rating,
    };
    const recipeInputs = {
      nameRecipe,
      imageRecipe,
      linkRecipe,
      comments,
    };
    try {
      if (content === "") {
        return res.status(200).json({ msg: "Comment is required" });
      }
      // get payload // to send account service
      // const dataPayload = await service.GetRecipePayloadAddComment(_id, recipeInputs, "ADD_COMMENTS_TO_RECIPES");
      // PublishAccountEvent(dataPayload);

      const { data } = await service.AddReplyToComment({
        pathAvatar,
        timeComment,
        content,
        liked,
        _idComment,
        idRecipe,
        username,
      });
      if (data) {
        return res.status(200).json({ statusCode: 200, msg: "Comment successfully added" });
      }
      return res.status(200).json({ msg: "An error occurred, please try again later" });
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.delete("/recipe/removeComment", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;

      const { _idComment, idRecipe } = req.body;
      const { data } = await service.RemoveComment(_idComment, idRecipe);

      // get payload to send account service
      // const dataPayload = await service.GetRecipePayloadDeleteComment(_id, _idComment, "DELETE_COMMENTS_FROM_RECIPES");
      // console.log("dataPayload: ", dataPayload);
      // PublishAccountEvent(dataPayload);
      if (data) {
        return res.status(200).json({ statusCode: 200, msg: "Delete succesfully" });
      }
      return res.status(200).json({ msg: "An error occurred, please try again later" });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/recipe/removeReplyComment", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;

      const { _idReplyComment, _idComment, idRecipe } = req.body;
      const { data } = await service.RemoveReplyComment(_idReplyComment, _idComment, idRecipe);

      // get payload to send account service
      // const dataPayload = await service.GetRecipePayloadDeleteComment(_id, _idComment, "DELETE_COMMENTS_FROM_RECIPES");
      // PublishAccountEvent(dataPayload);
      if (data) {
        return res.status(200).json({ statusCode: 200, msg: "Delete succesfully" });
      }
      return res.status(200).json({ msg: "Có lỗi xảy ra" });
    } catch (err) {
      next(err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Recipe Service");
  });
};
