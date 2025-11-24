import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import Routes
import userRouter from "./routes/user.routes.js";
import hotelRouter from "./routes/hotel.routes.js";

// Use Routes
app.use("/api/v1/hotel", hotelRouter);

// Use Routes
app.use("/api/v1/user", userRouter);

export { app };
