import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "../routes/userRoutes.js";
import { paymentRouter } from "../routes/paymentRoutes.js";

process.env.NODE_ENV = "production";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err);
  }
};
app.use(express.json());
app.use(
  cors({
    origin: "https://dominos-clone-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("/api/users/login", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://dominos-clone-app.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log("Connected To Database!");
});
