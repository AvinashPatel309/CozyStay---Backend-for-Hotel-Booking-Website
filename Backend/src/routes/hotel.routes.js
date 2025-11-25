import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlerware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

//Controllers
import {
  createHotel,
  getMyHotel,
  getHotelById,
  getAllHotels,
} from "../controllers/hotel.controller.js";

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
    isAdmin,
    upload.array("images", 10),
    checkSchema(createHotelValidator),
    validateRequest,
    createHotel
  );

// Get My Hotel
router.route("/myHotel").get(verifyJWT, isAdmin, getMyHotel);

//get Hotel by ID
router.route("/:hotelId").get(verifyJWT, getHotelById);

// Get All Hotels
router.route("/").get(verifyJWT, getAllHotels);

export default router;
