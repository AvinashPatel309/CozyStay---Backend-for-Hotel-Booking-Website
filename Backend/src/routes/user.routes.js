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

//Validators
import registrationValidator from "../validators/registration.validator.js";
import loginValidator from "../validators/login.validator.js";

import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { checkSchema } from "express-validator";

const router = Router();

// Register User
router
  .route("/register")
  .post(checkSchema(registrationValidator), validateRequest, registerUser);
// Login User
router
  .route("/login")
  .post(checkSchema(loginValidator), validateRequest, loginUser);
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
