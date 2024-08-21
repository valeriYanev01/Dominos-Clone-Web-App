import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "../routes/userRoutes.js";
import { paymentRouter } from "../routes/paymentRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

const corsOptions = {
  origin: ["https://dominos-clone-app.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);

const connectToDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected To Database!");
  } catch (err) {
    console.log(err);
  }
};

app.listen(PORT, () => {
  connectToDB();
});
