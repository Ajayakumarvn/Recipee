import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
      type: String,
      trim: true,
    },
    by: {
      type: String,
      trim: true,
    },
    role:{
      type:String,
      trim:true,
    },
    createdBy:{
        type:String
    }
  });

  const Comment = mongoose.model("Comment", commentSchema);

export default Comment;