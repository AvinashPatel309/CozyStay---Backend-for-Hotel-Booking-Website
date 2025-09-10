import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      require: true,
    },
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
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      min: 5,
      max: 500,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
