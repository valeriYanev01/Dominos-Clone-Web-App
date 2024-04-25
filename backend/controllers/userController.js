import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { UserModel } from "../models/UserModel.js";
import validator from "validator";

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

  if (!currentPassword && !newPassword && !confirmNewPassword && firstName && lastName) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { $set: { firstName: firstName, lastName: lastName } },
        { new: true }
      );

      return res.status(200).json({ updatedUser });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (currentPassword && newPassword && confirmNewPassword) {
    try {
      if (currentPassword === newPassword) {
        throw new Error("New password cannot be the same as the old password");
      }

      if (
        !validator.isStrongPassword(newPassword, {
          minLength: 8,
          minNumbers: 1,
          minLowercase: 0,
          minUppercase: 0,
          minSymbols: 0,
        })
      ) {
        throw new Error("New password needs to be at least 8 characters with at least 1 number.");
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirm password do not match");
      }

      const user = await UserModel.findOne({ email });

      const passwordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMatch) {
        throw Error("Old password is wrong");
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(newPassword, salt);

      const updatedUser = await UserModel.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });

      return res.status(200).json({ updatedUser });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
    return res.status(400).json({ error: "All password fields required to update the password" });
  }
};
