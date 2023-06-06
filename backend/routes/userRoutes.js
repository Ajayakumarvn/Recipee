import { Router } from "express";
import auth from "../controllers/authController.js";
import userControllers from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/signup").post(auth.signup);
userRouter.route("/login").post(auth.login);

userRouter.route("/viewChefs").get(auth.protect, userControllers.viewChefs);
userRouter.route("/viewCritics").get(auth.protect, userControllers.viewCritics);
userRouter
  .route("/waitingListChef")
  .get(auth.protect, userControllers.waitingListChef);

userRouter
  .route("/waitingListCritic")
  .get(auth.protect, userControllers.waitingListCritic);
userRouter.route("/viewUsers").get(auth.protect, userControllers.viewUsers);
userRouter
  .route("/viewMyProfile")
  .get(auth.protect, userControllers.viewMyProfile);

userRouter
  .route("/deleteAnyUser/:id")
  .delete(auth.protect, userControllers.deleteAnyUser);

userRouter.route("/rankChef/:id").patch(auth.protect, userControllers.rankChef);

userRouter
  .route("/favRecipes/:id")
  .patch(auth.protect, userControllers.favRecipes);

userRouter
  .route("/getUserFavoriteRecipes")
  .get(auth.protect, userControllers.getUserFavoriteRecipes);

userRouter
  .route("/verifyCritic_Chef/:id")
  .patch(auth.protect, userControllers.verifyCritic_Chef);
userRouter
  .route("/rejectCritic_Chef/:id")
  .patch(auth.protect, userControllers.rejectCritic_Chef);

export default userRouter;
