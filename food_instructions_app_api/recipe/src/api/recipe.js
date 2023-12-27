const RecipeService = require("../services/recipe_service");

const UserAuth = require("../middleware/auth");

module.exports = (app) => {
  const service = new RecipeService();

  app.put("/recipe/wishlist", (req, res, next) => {
    try {
      console.log("req.body = ", req.body); 
    } catch (err) {
      next(err);
    }
  });

  app.post("/recipe/add", async (req, res, next) => {
    try {
      const { name, link, linkImage, diet, health, cuisine, meal, dish } = req.body;
      const { data } = await service.CreateRecipe({ name, link, linkImage, diet, health, cuisine, meal, dish });
      return res.json(data);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  });

  app.get("/recipe/getAll", async (req, res, next) => {
    try {
      const { data } = await service.GetRecipes();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/", (req, res, next) => {
    res.send("Recipe Service");
  });
};
