import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlerware.js";
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
  getAllUsers,
} from "../controllers/user.controller.js";

//Validators
import registrationValidator from "../validators/registration.validator.js";
import loginValidator from "../validators/login.validator.js";
import refreshAccessTokenValidator from "../validators/refreshAccessToken.validator.js";
import updateUserProfileValidator from "../validators/updateUserProfile.validator.js";
import updateUserPasswordValidator from "../validators/updateUserPassword.validator.js";

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
router
  .route("/refreshAccessTokens")
  .get(
    checkSchema(refreshAccessTokenValidator),
    validateRequest,
    refreshAccessToken
  );
// Get User Details
router.route("/profile").get(verifyJWT, getUserDetails);
// Update User Profile
router
  .route("/profile")
  .put(
    checkSchema(updateUserProfileValidator),
    validateRequest,
    verifyJWT,
    updateUserProfile
  );
// Update User Profile Image
router
  .route("/profile/image")
  .put(verifyJWT, upload.single("profileImage"), updateUserProfileImage);
// Update User Password
router
  .route("/profile/password")
  .put(
    checkSchema(updateUserPasswordValidator),
    validateRequest,
    verifyJWT,
    updateUserPassword
  );
// Delete User Account
router.route("/profile").delete(verifyJWT, deleteUserAccount);

// Get All Users (Admin Only)
router.route("/").get(verifyJWT, getAllUsers);

export default router;
