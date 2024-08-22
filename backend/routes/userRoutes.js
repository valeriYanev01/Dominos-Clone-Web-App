import express from "express";
import {
  addAddress,
  addCoupon,
  addInvoice,
  apply,
  deleteAccount,
  deleteAddress,
  deleteInvoice,
  forgotPassword,
  getAddresses,
  getCoupons,
  getInvoices,
  getOrders,
  getSingleAddress,
  getUser,
  googleLogin,
  newOrder,
  resetPassword,
  updateActiveOrder,
  updateAddress,
  updateConsent,
  updateCouponExpired,
  updateCouponUsed,
  updateDominosMore,
  updateInvoice,
  updateUser,
  userLogin,
  userSignup,
  verifyGoogleRecaptchaToken,
  verifyPasswordResetToken,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/reset-password/:token", verifyPasswordResetToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/google", googleLogin);

router.post("/verify-google-recaptcha-token", verifyGoogleRecaptchaToken);
router.post("/apply", upload, apply);

router.get("/", verifyToken, getUser);
router.get("/get-addresses", verifyToken, getAddresses);
router.get("/get-single-address", verifyToken, getSingleAddress);
router.get("/get-orders", verifyToken, getOrders);
router.get("/get-coupons", verifyToken, getCoupons);
router.get("/get-invoices", verifyToken, getInvoices);
router.post("/account/update", verifyToken, updateUser);
router.post("/add-address", verifyToken, addAddress);
router.post("/add-coupon", verifyToken, addCoupon);
router.post("/add-invoice", verifyToken, addInvoice);
router.put("/new-order", verifyToken, newOrder);
router.put("/update-address", verifyToken, updateAddress);
router.put("/update-consent", verifyToken, updateConsent);
router.put("/update-invoice", verifyToken, updateInvoice);
router.put("/update-active-order", verifyToken, updateActiveOrder);
router.put("/update-dominos-more", verifyToken, updateDominosMore);
router.put("/update-coupon-used", verifyToken, updateCouponUsed);
router.put("/update-coupon-expired", verifyToken, updateCouponExpired);
router.delete("/delete-address", verifyToken, deleteAddress);
router.delete("/account-delete", verifyToken, deleteAccount);
router.delete("/delete-invoice", verifyToken, deleteInvoice);

export { router as userRouter };
