import express from "express";
import recipeRouter from "./routes/recipeRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/recipes", recipeRouter);
app.use("/users", userRouter);

export default app;
