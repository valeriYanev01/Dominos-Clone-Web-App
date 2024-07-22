import dotenv from "dotenv";
import Stripe from "stripe";
import { UserModel } from "../models/UserModel.js";
dotenv.config();

const STRIPE_PK_TEST = process.env.STRIPE_PK_TEST;
const STRIPE_SK_TEST = process.env.STRIPE_SK_TEST;

const stripe = new Stripe(STRIPE_SK_TEST);

export const getPKey = async (req, res) => {
  return res.status(200).json({ publishableKey: STRIPE_PK_TEST });
};

export const createPaymentIntent = async (req, res) => {
  const { amount, payment_method, return_url, customer } = req.body;

  try {
    const paymentIntentData = {
      currency: "BGN",
      amount: amount,
      return_url: return_url,
      customer,
    };

    if (payment_method) {
      paymentIntentData.payment_method = payment_method;
      paymentIntentData.confirm = true;
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    return res.status(200).json({ paymentIntent });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const savePaymentMethod = async (req, res) => {
  const { paymentMethodID, email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.stripeCustomerID) {
      const customer = await stripe.customers.create({
        email,
      });
      user.stripeCustomerID = customer.id;
    }

    const newPaymentMethod = await stripe.paymentMethods.retrieve(paymentMethodID);

    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerID,
      type: "card",
    });

    const existingPaymentMethod = paymentMethods.data.find(
      (pm) =>
        pm.card.last4 === newPaymentMethod.card.last4 &&
        pm.card.exp_month === newPaymentMethod.card.exp_month &&
        pm.card.exp_year === newPaymentMethod.card.exp_year &&
        pm.card.brand === newPaymentMethod.card.brand
    );

    if (existingPaymentMethod) {
      return res.status(400).json({ error: "Payment method already exists" });
    }

    await stripe.paymentMethods.attach(paymentMethodID, {
      customer: user.stripeCustomerID,
    });

    if (!user.paymentMethods.includes(paymentMethodID)) {
      user.paymentMethods.push(paymentMethodID);
    }

    await user.save();

    res.status(200).json({ success: true, paymentMethodID });
  } catch (err) {
    res.status(500).json({ error: "Failed to save payment method" });
  }
};

export const getAllPaymentMethods = async (req, res) => {
  const { customerID } = req.query;

  try {
    const savedPaymentMethods = await stripe.paymentMethods.list({
      customer: customerID,
      type: "card",
    });

    return res.status(200).json({ savedPaymentMethods: savedPaymentMethods.data });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve customer" });
  }
};

export const deletePaymentMethod = async (req, res) => {
  const { email, paymentMethodID } = req.query;

  try {
    await UserModel.updateOne({ email }, { $pull: { paymentMethods: paymentMethodID } });

    const customerSource = await stripe.paymentMethods.detach(paymentMethodID);

    return res.status(200).json({ success: true, customerSource });
  } catch (err) {
    return res.status(400).json({ error: "Failed to delete card" });
  }
};

export const createNewCustomer = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const customer = await stripe.customers.create({ email });

    user.stripeCustomerID = customer.id;

    await user.save();

    return res.status(200).json({ customerID: user.stripeCustomerID });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
