import { match } from "assert";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    phoneNumber: {
      type: String,
      require: true,
      min: 10,
      unique: true,
      match: /^\d{10}$/,
    },
    picture: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
