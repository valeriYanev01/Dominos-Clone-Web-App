import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { createPaymentIntent, getPKey } from "../controllers/paymentController.js";

const router = express.Router();

router.use(verifyToken);

router.get("/config", getPKey);
router.post("/create-payment-intent", createPaymentIntent);

export { router as paymentRouter };
