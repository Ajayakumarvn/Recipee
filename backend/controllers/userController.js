import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";

const viewChefs = async (req, res) => {
  try {
    const chefs = await User.find({ role: "Chef", status: "Accepted" });
    console.log(chefs);
    res.status(200).json({
      status: "success",
      chefs,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const viewCritics = async (req, res) => {
  try {
    const critics = await User.find({ role: "Critic", status: "Accepted" });
    console.log(critics);
    res.status(200).json({
      status: "success",
      critics,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const waitingListChef = async (req, res) => {
  try {
    const waitingChefs = await User.find({ role: "Chef", status: "NA" });
    console.log(waitingChefs);
    res.status(200).json({
      status: "success",
      waitingChefs,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const waitingListCritic = async (req, res) => {
  try {
    const waitingCritics = await User.find({ role: "Critic", status: "NA" });
    console.log(waitingCritics);
    res.status(200).json({
      status: "success",
      waitingCritics,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const viewUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" });
    console.log(users);
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const viewMyProfile = async (req, res) => {
  try {
    const myProfile = await User.find({ _id: req.User.id });
    console.log(myProfile);
    res.status(200).json({
      status: "success",
      myProfile,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const deleteAnyUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const rankChef = async (req, res) => {
  try {
    const chef = await User.findById(req.params.id);
    if (!chef) {
      throw new Error("Chef not found");
    }

    const newRank = req.body.rank * 1; // Assuming ranks is a single rank value in req.body

    chef.ranks.push(newRank); // Pushing new rank into existing ranks array

    // Calculate average rank
    const averageRank =
      chef.ranks.reduce((acc, rank) => acc + rank, 0) / chef.ranks.length;

    chef.finalRank = averageRank; // Update finalRank with the average rank

    await chef.save();
    console.log(chef);
    res.status(200).json({
      status: "success",
      chef,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const favRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.User.id);
    if (!user) {
      throw new Error("User not found");
    }

    const recipeId = req.params.id;
    if (!user.favRecipes.includes(recipeId)) {
      user.favRecipes.push(recipeId);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const getUserFavoriteRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.User.id);

    if (!user) {
      throw new Error("User not found");
    }

    const favoriteRecipeIds = user.favRecipes;
    const favoriteRecipes = await Recipe.find({
      _id: { $in: favoriteRecipeIds },
    });

    res.status(200).json({
      status: "success",
      favoriteRecipes,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const verifyCritic_Chef = async (req, res) => {
  req.body.status = "Accepted";
  console.log(req.body);
  try {
    const verified = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "Accepted",

      verified,
    });
    console.log(verified);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const rejectCritic_Chef = async (req, res) => {
  req.body.status = "Rejected";
  try {
    const rejected = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      rejected,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const userControllers = {
  viewChefs,
  viewCritics,
  waitingListChef,
  waitingListCritic,
  viewUsers,
  viewMyProfile,
  deleteAnyUser,
  rankChef,
  favRecipes,
  getUserFavoriteRecipes,
  verifyCritic_Chef,
  rejectCritic_Chef,
};

export default userControllers;
