import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { loginValidator, registerValidator } from "../validations/auth.validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", validate(registerValidator), registerUser);
router.post("/login", validate(loginValidator), loginUser)
router.post("/logout", authMiddleware, logoutUser)
router.get("/me", authMiddleware, getMe)

export default router;
