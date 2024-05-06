import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (_id, expiration = "1h") => {
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

export const getAddresses = async (req, res) => {
  const { email } = req.query;

  try {
    const allAddresses = await UserModel.findOne({ email }).select("addresses");

    return res.status(200).json({ allAddresses });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getSingleAddress = async (req, res) => {
  const { name, email } = req.query;

  let address;

  try {
    const addresses = await UserModel.findOne({ email }).select("addresses");

    addresses.addresses.map((a) => {
      if (a.name === name) {
        address = a;
      }
    });

    return res.status(200).json({ address });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const addAddress = async (req, res) => {
  const {
    email,
    name,
    fullAddress,
    phoneNumber,
    doorBell = "",
    floor = "",
    block = "",
    apartment = "",
    entrance = "",
    coordinates,
  } = req.body;

  try {
    const addAddress = await UserModel.addAddress(
      email,
      name,
      fullAddress,
      phoneNumber,
      doorBell,
      floor,
      block,
      apartment,
      entrance,
      coordinates
    );

    return res.status(200).json({ addAddress });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  const { email, address } = req.query;

  try {
    await UserModel.updateOne({ email }, { $pull: { addresses: { name: address } } });

    return res.status(200).json({ success: "Address removed successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateAddress = async (req, res) => {
  const { id, email, name, fullAddress, phoneNumber, doorBell, floor, block, apartment, entrance, coordinates } =
    req.body;

  try {
    const newAddress = await UserModel.updateAddress(
      id,
      email,
      name,
      fullAddress,
      phoneNumber,
      doorBell,
      floor,
      block,
      apartment,
      entrance,
      coordinates
    );

    return res.status(200).json({ newAddress });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
