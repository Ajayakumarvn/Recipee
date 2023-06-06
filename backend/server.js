import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app.js";

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

await mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on PORT:${port}`);
});
