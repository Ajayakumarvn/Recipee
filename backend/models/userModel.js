import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "provide valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [3, "password must have a min of 3 characters"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Role is Required"],
    enum: {
      values: ["Admin", "Critic", "Chef", "User"],
      message: "possible values are Admin,Critic,Chef&User",
    },
  },
  favRecipes: [String],
  status: {
    type: String,
    default: "NA",
  },
  ranks: [Number],
  finalRank: { type: Number },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
