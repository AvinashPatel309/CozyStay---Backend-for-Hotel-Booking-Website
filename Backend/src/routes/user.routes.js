import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  updateUserProfile,
  updateUserProfileImage,
  updateUserPassword,
  getUserDetails,
  deleteUserAccount,
} from "../controllers/user.controller.js";

const router = Router();

// Register User
router.route("/register").post(registerUser);
// Login User
router.route("/login").post(loginUser);
//logout User
router.route("/logout").post(verifyJWT, logoutUser);
// Refresh Access Token
router.route("/refreshTokens").get(refreshAccessToken);
// Get User Details
router.route("/profile").get(verifyJWT, getUserDetails);
// Update User Profile
router.route("/profile").put(verifyJWT, updateUserProfile);
// Update User Profile Image
router.route("/profile/image").put(verifyJWT, updateUserProfileImage);
// Update User Password
router.route("/profile/password").put(verifyJWT, updateUserPassword);
// Delete User Account
router.route("/profile").delete(verifyJWT, deleteUserAccount);

export default router;
