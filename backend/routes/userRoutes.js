import express from "express";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  getSingleAddress,
  getUser,
  updateUser,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.use(verifyToken);
router.post("/account/update", updateUser);
router.get("/", getUser);
router.get("/get-addresses", getAddresses);
router.get("/get-single-address", getSingleAddress);
router.post("/add-address", addAddress);
router.delete("/delete-address", deleteAddress);

export { router as userRouter };
