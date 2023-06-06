import React, { Fragment } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AllRecipes from "./pages/AllRecipes";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import Chefs from "./pages/Chefs";
import Critics from "./pages/Critics";
import Users from "./pages/Users";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import EditRecipe from "./pages/EditRecipe";
import MyRecipe from "./pages/MyRecipe";
import CriticApproval from "./pages/CriticApproval";
import ChefApproval from "./pages/ChefApproval";
import ViewChefRecipes from "./pages/ViewChefRecipes";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/critics" element={<Critics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editrecipe/:id" element={<EditRecipe />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/approve_chef" element={<ChefApproval />} />
        <Route path="/approve_critic" element={<CriticApproval />} />
        <Route path="/chefrecipes/:id" element={<ViewChefRecipes />} />
      </Routes>
    </Fragment>
  );
};

export default App;
