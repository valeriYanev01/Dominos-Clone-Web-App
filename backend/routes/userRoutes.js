import express from "express";
import {
  addAddress,
  deleteAccount,
  deleteAddress,
  getAddresses,
  getSingleAddress,
  getUser,
  googleLogin,
  updateAddress,
  updateConsent,
  updateUser,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/google", googleLogin);

router.use(verifyToken);
router.get("/", getUser);
router.get("/get-addresses", getAddresses);
router.get("/get-single-address", getSingleAddress);
router.post("/account/update", updateUser);
router.post("/add-address", addAddress);
router.put("/update-address", updateAddress);
router.put("/update-consent", updateConsent);
router.delete("/delete-address", deleteAddress);
router.delete("/account-delete", deleteAccount);

export { router as userRouter };
