import express from "express";
import { getUser, userLogin, userSignup } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/", getUser);

export { router as userRouter };
