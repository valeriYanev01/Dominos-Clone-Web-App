import express from "express";
import { addAddress, getAddresses, getUser, updateUser, userLogin, userSignup } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.use(verifyToken);
router.post("/account/update", updateUser);
router.get("/", getUser);
router.get("/get-addresses", getAddresses);
router.post("/add-address", addAddress);

export { router as userRouter };
