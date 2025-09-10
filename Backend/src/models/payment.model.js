import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    method: {
      type: String,
      enum: ["credit card", "debit card", "paypal", "bank transfer"],
      default: "debit card",
      require: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
