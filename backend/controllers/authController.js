import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res) => {
  console.log("okkkkk");
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    let message = "User created successfully";

    if (req.body.role === "Critic" || req.body.role === "Chef") {
      if (newUser.status === "NA") {
        message = "Verification is under process";
        return res.status(200).json({ message });
      }
    }

    const token = signToken(newUser._id);
    const role = req.body.role;
    const name = req.body.name;

    res.status(201).json({
      status: "Created",
      token,
      role,
      name,
      message,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Incorrect Email or Password");
    }

    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      throw new Error("Incorrect Email or Password");
    }

    if (user.role === "Critic" || user.role === "Chef") {
      if (user.status === "Accepted") {
        const token = signToken(user._id);
        const role = user.role;
        const name = user.name;
        const status = user.status;
        return res.status(200).json({
          message: "Verified",
          token,
          role,
          name,
          status,
        });
      } else if (user.status === "Rejected") {
        return res.status(400).json({ message: "Rejected" });
      } else {
        return res.status(200).json({ message: "Not Yet Verified" });
      }
    }

    const token = signToken(user._id);
    const role = user.role;
    const name = user.name;
    const status = user.status;
    return res.status(200).json({
      message: "Verified",
      token,
      role,
      name,
      status,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      error: err.message,
    });
  }
};

const protect = async (req, res, next) => {
  try {
    // 1.getting token and check if its there

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not logged in!");
    }

    // 2.verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error(
        "The user belonging to this token does no longer exists."
      );
    }

    req.User = currentUser;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const auth = {
  signup,
  login,
  protect,
};

export default auth;
