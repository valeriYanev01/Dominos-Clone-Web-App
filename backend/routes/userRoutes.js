import express from "express";
import {
  addAddress,
  addCoupon,
  addInvoice,
  apply,
  deleteAccount,
  deleteAddress,
  deleteInvoice,
  getAddresses,
  getCoupons,
  getInvoices,
  getOrders,
  getSingleAddress,
  getUser,
  googleLogin,
  increaseDominosMore,
  newOrder,
  updateAddress,
  updateConsent,
  updateInvoice,
  updateUser,
  userLogin,
  userSignup,
  verifyGoogleRecaptchaToken,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/google", googleLogin);

router.post("/verify-google-recaptcha-token", verifyGoogleRecaptchaToken);
router.post("/apply", upload, apply);

router.use(verifyToken);
router.get("/", getUser);
router.get("/get-addresses", getAddresses);
router.get("/get-single-address", getSingleAddress);
router.get("/get-orders", getOrders);
router.get("/get-coupons", getCoupons);
router.get("/get-invoices", getInvoices);
router.post("/account/update", updateUser);
router.post("/add-address", addAddress);
router.post("/add-coupon", addCoupon);
router.post("/add-invoice", addInvoice);
router.put("/new-order", newOrder);
router.put("/update-address", updateAddress);
router.put("/update-consent", updateConsent);
router.put("/update-invoice", updateInvoice);
router.put("/update-dominos-more", increaseDominosMore);
router.delete("/delete-address", deleteAddress);
router.delete("/account-delete", deleteAccount);
router.delete("/delete-invoice", deleteInvoice);

export { router as userRouter };
