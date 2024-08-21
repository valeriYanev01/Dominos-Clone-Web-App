import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { UserModel } from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_RECAPTCHA_SECRET_KEY = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
const MY_EMAIL = process.env.MY_EMAIL;
const APP_EMAIL = process.env.APP_EMAIL;
const GOOGLE_AUTH_PASS = process.env.GOOGLE_AUTH_PASS;

const createToken = (_id, expiration = "1h") => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: expiration });
};

export const userSignup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    img,
    addresses,
    orders,
    consents,
    coupons,
    more,
    invoices,
  } = req.body;

  try {
    const user = await UserModel.signup(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      img,
      addresses,
      orders,
      consents,
      coupons,
      more,
      invoices
    );
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
    console.log(user);
    const token = createToken(user._id, keepLoggedIn);

    res.status(200).json({ email, token });
  } catch (err) {
    console.log(err);
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
    store,
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
      store,
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
  const { id, email, name, fullAddress, store, phoneNumber, doorBell, floor, block, apartment, entrance, coordinates } =
    req.body;

  try {
    const newAddress = await UserModel.updateAddress(
      id,
      email,
      name,
      fullAddress,
      store,
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

export const deleteAccount = async (req, res) => {
  const { email } = req.query;

  try {
    await UserModel.findOneAndDelete({ email });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateConsent = async (req, res) => {
  const { email, delivery, confidentiality, termsOfUse, deals, updates, more } = req.body;

  try {
    const newConsents = await UserModel.updateConsents(
      email,
      delivery,
      confidentiality,
      termsOfUse,
      deals,
      updates,
      more
    );

    return res.status(200).json({ newConsents });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const googleLogin = async (req, res) => {
  const { email, firstName, lastName, img, password, addresses, orders, consents, more } = req.body;

  try {
    const user = await UserModel.googleLogin(
      email,
      firstName,
      lastName,
      img,
      password,
      addresses,
      orders,
      consents,
      more
    );
    const token = createToken(user._id);

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const newOrder = async (req, res) => {
  const {
    email,
    products,
    address,
    store,
    deliveryTime,
    phoneNumber = "",
    floor,
    doorBell,
    comments,
    paymentMethod,
    invoice,
    finalPrice,
    orderType,
    start,
    finish,
  } = req.body;
  try {
    const user = await UserModel.newOrder(
      email,
      products,
      address,
      store,
      deliveryTime,
      phoneNumber,
      floor,
      doorBell,
      comments,
      paymentMethod,
      invoice,
      finalPrice,
      orderType,
      start,
      finish
    );

    return res.status(200).json({ user, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  const { email } = req.query;

  try {
    const allOrders = await UserModel.findOne({ email }).select("orders");

    return res.status(200).json({ allOrders });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const addCoupon = async (req, res) => {
  const { email, coupon, validity, used, usedDate } = req.body;

  try {
    const newCoupon = await UserModel.addCoupon(email, coupon, validity, used, usedDate);

    return res.status(200).json({ newCoupon });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getCoupons = async (req, res) => {
  const { email } = req.query;

  try {
    const coupons = await UserModel.findOne({ email }).select("coupons");

    return res.status(200).json({ coupons });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const verifyGoogleRecaptchaToken = async (req, res) => {
  const { recaptchaToken } = req.body;

  try {
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: { secret: GOOGLE_RECAPTCHA_SECRET_KEY, response: recaptchaToken },
    });

    const data = response.data;

    if (data.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, "error-codes": data["error-codes"] });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const apply = async (req, res) => {
  const { file } = req;
  const { name, city, number, birthDate, email, position } = req.body;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!file) {
    return res.status(400).send({ success: false, message: "No file uploaded" });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: APP_EMAIL,
      pass: GOOGLE_AUTH_PASS,
    },
  });

  const mailOptionsForMe = {
    from: APP_EMAIL,
    to: MY_EMAIL,
    subject: `Job Application ${name} - CV Attached`,
    text: `
          Name: ${name}
          City: ${city}
          Phone Number: ${number}
          Birth Date: ${birthDate}
          Email: ${email}
          Position: ${position}
    `,
    attachments: [
      {
        filename: file.originalname,
        path: path.join(__dirname, "..", file.path),
      },
    ],
  };

  const mailOptionsForApplier = {
    from: APP_EMAIL,
    to: email,
    subject: `Job Application - Successfully Applied`,
    text: `
      Hello,

      ${name}, You successfully applied for ${position}.

      We will get back to you soon!

      Br!
    `,
  };

  try {
    transporter.sendMail(mailOptionsForMe, (error) => {
      if (error) {
        return res.status(500).send({ success: false, message: "Failed to send email" });
      }

      fs.unlink(`uploads/${file.filename}`, (err) => {
        if (err) {
          return console.log(err);
        }
      });

      return res.status(200).send({ success: true, message: "Application submitted successfully" });
    });

    if (email) {
      transporter.sendMail(mailOptionsForApplier, (error) => {
        if (error) {
          return res.status(500).send({ success: false, message: "Failed to send email" });
        }

        return res.status(200).send({ success: true, message: "Email send successfully" });
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const addInvoice = async (req, res) => {
  const { email, companyName, companyAddress, companyActivity, companyVAT, companyOwner } = req.body;

  try {
    const newInvoice = await UserModel.newInvoice(
      email,
      companyName,
      companyAddress,
      companyActivity,
      companyVAT,
      companyOwner
    );

    return res.status(200).json({ newInvoice });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getInvoices = async (req, res) => {
  const { email } = req.query;

  try {
    const invoices = await UserModel.findOne({ email }).select("invoices");

    return res.status(200).json({ invoices });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  const { email, companyVAT } = req.query;

  console.log(email, companyVAT);

  try {
    const invoice = await UserModel.updateOne({ email }, { $pull: { invoices: { companyVAT: companyVAT } } });

    return res.status(200).json({ invoice });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateInvoice = async (req, res) => {
  const { email, companyName, companyAddress, companyActivity, companyVAT, companyOwner } = req.body;

  try {
    const invoice = await UserModel.updateInvoice(
      email,
      companyName,
      companyAddress,
      companyActivity,
      companyVAT,
      companyOwner
    );

    return res.status(200).json({ invoice });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateActiveOrder = async (req, res) => {
  const { email } = req.body;

  try {
    await UserModel.findOneAndUpdate(
      { email },
      { $set: { "activeOrder.isActive": false, "activeOrder.start": 0, "activeOrder.finish": 0 } }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateDominosMore = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user && user.more === 6) {
      await UserModel.findOneAndUpdate(
        { email },
        {
          $push: {
            coupons: {
              name: "Dominos More",
              validity: new Date().setMonth(new Date().getMonth() + 6),
              used: false,
            },
          },
          $inc: { more: -6 },
        },
        { new: true }
      );

      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateCouponUsed = async (req, res) => {
  const { email, _id } = req.body;

  try {
    const updatedUser = await UserModel.updateCouponUsed(email, _id);

    return res.status(200).json({ success: true, updatedUser });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateCouponExpired = async (req, res) => {
  const { email, _id } = req.body;

  try {
    const updatedUser = await UserModel.updateCouponExpired(email, _id);

    return res.status(200).json({ success: true, updatedUser });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await UserModel.forgotPassword(email);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    await UserModel.verifyPasswordResetToken(token);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  try {
    await UserModel.resetPassword(password, confirmPassword, token);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
