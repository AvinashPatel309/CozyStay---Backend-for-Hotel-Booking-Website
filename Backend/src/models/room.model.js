import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    images: {
      type: [String],
    },
    capacity: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    amenities: {
      type: [String],
    },
    totalRooms: {
      type: Number,
      require: true,
      min: 1,
    },
    availableRooms: {
      type: Number,
      require: true,
      min: 0,
    },

    // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model("Room", roomSchema);
