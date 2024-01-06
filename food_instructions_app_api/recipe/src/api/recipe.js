const RecipeService = require("../services/recipe_service");

const UserAuth = require("../middleware/auth");
const { PublishAccountEvent } = require("../utils");

module.exports = (app) => {
  const service = new RecipeService();

  app.post("/recipe/comments", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const recipeInputs = req.body;
    try {
      // get payload // to send account service
      const dataPayload = await service.GetRecipePayload(_id, recipeInputs, "ADD_COMMENTS_TO_RECIPES");
      PublishAccountEvent(dataPayload);

      const { data } = await service.AddCommentsToRecipe(recipeInputs);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Recipe Service");
  });
};
