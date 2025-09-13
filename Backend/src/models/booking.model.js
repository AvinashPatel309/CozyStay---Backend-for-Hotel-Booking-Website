import mongoose, { Schema } from "mongoose";
import { type } from "os";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      require: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      require: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      require: true,
    },
    checkInDate: {
      type: Date,
      require: true,
    },
    checkOutDate: {
      type: Date,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    guestsNumber: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);
