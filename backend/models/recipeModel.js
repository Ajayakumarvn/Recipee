import mongoose from "mongoose";
import Comment from "./commentModel.js";

// const reportSchema = new mongoose.Schema({
//   report: {
//     type: String,
//     trim: true,
//   },
//   by: {
//     type: String,
//     trim: true,
//   },
// });

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients is required"],
    trim: true,
  },
  directions: {
    type: String,
    required: [true, "Directions are required"],
    trim: true,
  },
  creator: {
    type: String,
    required: [true, "Creator is Required"],
    trim: true,
  },
  createdBy: {
    type: String,
    required: [true, "CreatedById is Required"],
    trim: true,
  },
  comments: [Comment.schema],
    // Using the commentSchema as the type for the comments field
  
  // report: {
  //   type: [reportSchema],
  // },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
