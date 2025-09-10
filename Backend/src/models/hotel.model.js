import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    type: {
      type: String,
      require: true,
      enum: ["hotel", "apartment", "resort", "villa", "cabin"],
    },
    desc: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
      min: 10,
      match: /^\d{10}$/,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    images: {
      type: [String],
    },
    amenities: {
      type: [String],
    },
    rooms: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      require: true,
    },
    feedback: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
