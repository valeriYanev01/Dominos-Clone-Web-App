import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (_id, expiration) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: expiration });
};

export const userSignup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, img } = req.body;

  try {
    const user = await UserModel.signup(email, password, confirmPassword, firstName, lastName, img);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password, keepLoggedIn } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id, keepLoggedIn);

    res.status(200).json({ email, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserModel.findOne({ email });
    res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { email, firstName, lastName, currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    const updatedUser = await UserModel.updateUser(
      email,
      firstName,
      lastName,
      currentPassword,
      newPassword,
      confirmNewPassword
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
