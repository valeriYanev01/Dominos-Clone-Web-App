import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createNewCustomer,
  createPaymentIntent,
  deletePaymentMethod,
  getAllPaymentMethods,
  getPKey,
  savePaymentMethod,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/config", verifyToken, getPKey);
router.get("/all-payment-methods", verifyToken, getAllPaymentMethods);
router.post("/create-payment-intent", verifyToken, createPaymentIntent);
router.post("/save-payment-method", verifyToken, savePaymentMethod);
router.post("/create-new-customer", verifyToken, createNewCustomer);
router.delete("/delete-payment-method", verifyToken, deletePaymentMethod);

export { router as paymentRouter };
