import Recipe from "../models/recipeModel.js";

const addRecipe = async (req, res) => {
  try {
    req.body.creator = req.User.name;
    req.body.createdBy = req.User.id;
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: "created",
      newRecipe,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewAllRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      status: "success",
      recipes,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewMyRecipes = async (req, res) => {
  try {
    const myRecipes = await Recipe.find({ createdBy: req.User.id });
    res.status(200).json({
      status: "success",
      myRecipes,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).josn({
      error: err.message,
    });
  }
};

const viewOneRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.find({ _id: req.params.id });
    const currentUser=req.User.id;
    console.log(recipe);
    res.status(200).json({
      status: "success",
      recipe,
      currentUser
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewChefRecipes = async (req, res) => {
  try {
    console.log("ok");
    const chefRecipes = await Recipe.find({ createdBy: req.params.id });
    console.log(chefRecipes);
    res.status(200).json({
      status: "success",
      chefRecipes,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    console.log(updatedRecipe);
    res.status(200).json({ status: "success", updatedRecipe });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "Deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const addCommentToRecipe = async (req, res) => {
  try {
    console.log(req.body);
    const recipeId = req.params.id;
    req.body.createdBy = req.User.id;
    req.body.by=req.User.name;
    const commentData = req.body;

    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $push: { comments: commentData } },
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ status: "success", recipe });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};




const deleteComment = async (req, res) => {
  try {
    
    const recipeId = req.params.recipeId;
    const commentId = req.params.commentId;
console.log(recipeId,commentId);
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ status: "success", recipe });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};


// const addCmntReport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { comments, reports } = req.body;

//     const recipe = await Recipe.findById(id);
//     if (!recipe) {
//       return res.status(404).json({
//         error: "Recipe not found",
//       });
//     }

//     if (comments) {
//       recipe.comments.push(comments);
//     }

//     if (reports) {
//       recipe.reports.push(reports);
//     }

//     const updatedRecipe = await recipe.save();

//     res.status(200).json({
//       status: "success",
//       updatedRecipe,
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({
//       error: err.message,
//     });
//   }
// };

const recipeControllers = {
  addRecipe,
  viewAllRecipe,
  viewMyRecipes,
  viewOneRecipe,
  viewChefRecipes,
  updateRecipe,
  deleteRecipe,
  addCommentToRecipe,
  deleteComment
  // addCmntReport,
};

export default recipeControllers;
