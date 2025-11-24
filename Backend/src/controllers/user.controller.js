import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// User Registration

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, isAdmin } =
      req.body;

    //Check for missing fields
    // if (!firstName || !lastName || !email || !password || !phoneNumber) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this Email or Phone Number",
      });
    }

    let role = "user";
    if (isAdmin) {
      role = "admin";
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // Password will be hashed via pre-save middleware
      phoneNumber,
      role: role || "user",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res.status(201).json({
      message: "User registered successfully",
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Registring User",
      error: error.message,
    });
  }
};

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRIY }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRIY }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Generating Token",
      error: error.message,
    });
  }
};

//Login User

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check for missing fields
    // if (!email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(404).json({ message: "User not found with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const { accessToken, refreshToken } = await generateToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({
        message: "User logged in successfully",
        data: { user: loggedInUser, accessToken },
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Logging in User",
      error: error.message,
    });
  }
};

//Re-generatre Access Token
const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ message: "No token provided Unauthorized request" });
    // }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(404).json({
        message:
          "Invalid RefreshToken or User not found with this RefreshToken",
      });
    }

    if (user.refreshToken !== token) {
      return res
        .status(401)
        .json({ message: "RefreshToken Expired or Invalid token" });
    }

    const { accessToken, refreshToken } = await generateToken(user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({
        message: "Access Token refreshed successfully",
        data: { accessToken, refreshToken },
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Refreshing Access Token",
      error: error.message,
    });
  }
};

//Logout User
const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
    };

    res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json({
        message: "User logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Logging out User",
      error: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: firstName || req.user.firstName,
        lastName: lastName || req.user.lastName,
        phoneNumber: phoneNumber || req.user.phoneNumber,
      },
      { new: true }
    ).select("-password -refreshToken");

    res.status(200).json({
      message: "User Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Updating User Profile",
      error: error.message,
    });
  }
};

const updateUserProfileImage = async (req, res) => {
  try {
    const profileImageLocalPath = req.file?.path;

    if (!profileImageLocalPath) {
      return res.status(400).json({ message: "Profile Image is required" });
    }

    const profileImage = await uploadToCloudinary(profileImageLocalPath);

    if (!profileImage) {
      return res
        .status(500)
        .json({ message: "Failed to upload profile image" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: profileImage.secure_url,
      },
      { new: true }
    ).select("-password -refreshToken");

    res.status(200).json({
      message: "User Profile Image updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Updating User Profile Image",
      error: error.message,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // if (!oldPassword || !newPassword) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Old Password" });
    }

    user.password = newPassword; // Password will be hashed via pre-save middleware
    await user.save();
    res.status(200).json({
      message: "User Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Updating User Password",
      error: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching User details",
      error: error.message,
    });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
    };

    res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json({
        message: "User Account deleted successfully",
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while Deleting User Account",
      error: error.message,
    });
  }
};
export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  updateUserProfile,
  updateUserProfileImage,
  updateUserPassword,
  getUserDetails,
  deleteUserAccount,
};
