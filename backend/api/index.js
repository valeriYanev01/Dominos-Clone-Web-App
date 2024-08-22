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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);

app.post("/api/test", (req, res) => {
  res.json({ message: "Test seccessful!" });
});

mongoose
  .connect(URI, { retryWrites: false })
  .then(() => {
    app.listen(PORT, () => console.log(`App is connected to DB running on port: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
