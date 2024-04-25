import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, JWT_SECRET);

    req.user = await UserModel.findOne({ _id }).select("_id");

    next();
  } catch (err) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};
