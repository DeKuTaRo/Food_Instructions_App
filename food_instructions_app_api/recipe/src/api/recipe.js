const RecipeService = require("../services/recipe_service");

const UserAuth = require("../middleware/auth");
const { PublishAccountEvent } = require("../utils");

module.exports = (app) => {
  const service = new RecipeService();

  app.post("/recipe/comments", UserAuth, async (req, res, next) => {
    const recipeInputs = req.body;
    const { _id } = req.user;
    try {
      // get payload // to send account service
      const dataPayload = await service.GetRecipePayload(_id, recipeInputs, "ADD_COMMENTS_TO_RECIPES");
      PublishAccountEvent(dataPayload);

      const { data } = await service.AddCommentsToRecipe(recipeInputs);
      if (data) {
        res.status(200).json({ statusCode: 200, msg: "Bình luận thành công" });
      }
      res.status(200).json({ msg: "Có lỗi xảy ra" });
    } catch (err) {
      next(err);
    }
  });

  app.get("/recipe/getComments", UserAuth, async (req, res, next) => {
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
      console.log("err api = ", err);
      next(err);
    }
  });

  app.post("/recipe/replyComments", UserAuth, async (req, res, next) => {
    const { timeComment, content, liked, rating, _idComment, idRecipe, nameRecipe, imageRecipe, linkRecipe } = req.body;
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
      // get payload // to send account service
      const dataPayload = await service.GetRecipePayload(_id, recipeInputs, "ADD_COMMENTS_TO_RECIPES");
      PublishAccountEvent(dataPayload);

      const { data } = await service.AddReplyToComment({ timeComment, content, liked, _idComment, idRecipe, username });
      if (data) {
        res.status(200).json({ statusCode: 200, msg: "Bình luận thành công" });
      }
      res.status(200).json({ msg: "Có lỗi xảy ra" });
    } catch (err) {
      console.log("err api = ", err);
      next(err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Recipe Service");
  });
};
