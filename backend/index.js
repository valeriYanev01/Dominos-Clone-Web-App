import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const URI = process.env.URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log("Connected To Database!");
});
