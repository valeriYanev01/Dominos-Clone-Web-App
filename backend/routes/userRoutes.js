import express from "express";
import {
  addAddress,
  addCoupon,
  apply,
  deleteAccount,
  deleteAddress,
  getAddresses,
  getCoupons,
  getOrders,
  getSingleAddress,
  getUser,
  googleLogin,
  newOrder,
  updateAddress,
  updateConsent,
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
router.post("/account/update", updateUser);
router.post("/add-address", addAddress);
router.post("/add-coupon", addCoupon);
router.put("/new-order", newOrder);
router.put("/update-address", updateAddress);
router.put("/update-consent", updateConsent);
router.delete("/delete-address", deleteAddress);
router.delete("/account-delete", deleteAccount);

export { router as userRouter };
