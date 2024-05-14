import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

const STRIPE_PK_TEST = process.env.STRIPE_PK_TEST;
const STRIPE_SK_TEST = process.env.STRIPE_SK_TEST;

const stripe = new Stripe(STRIPE_SK_TEST);

export const getPKey = async (req, res) => {
  return res.status(200).json({ publishableKey: STRIPE_PK_TEST });
};

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "BGN",
      amount: amount,
    });

    return res.status(200).json({ paymentIntent });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
