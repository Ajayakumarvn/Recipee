import { Router } from "express";
import recipeControllers from "../controllers/recipeController.js";
import auth from "../controllers/authController.js";

const recipeRouter = Router();

recipeRouter
  .route("/viewAllRecipe")
  .get(auth.protect, recipeControllers.viewAllRecipe);
recipeRouter
  .route("/addRecipe")
  .post(auth.protect, recipeControllers.addRecipe);

recipeRouter
  .route("/viewMyRecipes")
  .get(auth.protect, recipeControllers.viewMyRecipes);

recipeRouter
  .route("/viewOneRecipe/:id")
  .get(auth.protect, recipeControllers.viewOneRecipe);

recipeRouter
  .route("/viewChefRecipes/:id")
  .get(auth.protect, recipeControllers.viewChefRecipes);

recipeRouter
  .route("/updateRecipe/:id")
  .patch(auth.protect, recipeControllers.updateRecipe);

recipeRouter
  .route("/deleteRecipe/:id")
  .delete(auth.protect, recipeControllers.deleteRecipe);

recipeRouter
  .route("/addComment/:id")
  .patch(auth.protect, recipeControllers.addCommentToRecipe);

recipeRouter
  .route("/:recipeId/comments/:commentId")
  .delete(auth.protect, recipeControllers.deleteComment);

export default recipeRouter;
