import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    lastName: {
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
    profileImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    bookings: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    feedbacks: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
