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

router.use(verifyToken);

router.get("/config", getPKey);
router.get("/all-payment-methods", getAllPaymentMethods);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/save-payment-method", savePaymentMethod);
router.post("/create-new-customer", createNewCustomer);
router.delete("/delete-payment-method", deletePaymentMethod);

export { router as paymentRouter };
