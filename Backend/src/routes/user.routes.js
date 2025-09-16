import { Router } from "express";
import { hashPasswordMiddleware } from "../middlewares/hashPassword.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/user.controller.js";

const router = Router();

// Register User
router.route("/register").post(hashPasswordMiddleware, registerUser);
// Login User
router.route("/login").post(loginUser);
//logout User
router.route("/logout").post(verifyJWT, logoutUser);
// Refresh Access Token
router.route("/refreshTokens").get(refreshAccessToken);

export default router;
