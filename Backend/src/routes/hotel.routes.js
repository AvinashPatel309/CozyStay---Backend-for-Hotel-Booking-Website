import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlerware.js";
import { createHotel } from "../controllers/hotel.controller.js";

// Validators
import createHotelValidator from "../validators/createHotel.validator.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { checkSchema } from "express-validator";

const router = Router();

// Create Hotel
router
  .route("/createHotel")
  .post(
    verifyJWT,
    upload.array("images", 10),
    checkSchema(createHotelValidator),
    validateRequest,
    createHotel
  );

export default router;
