import { Hotel } from "../models/hotel.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

//create Hotel
const createHotel = async (req, res) => {
  try {
    const { name, type, desc, address, city, phone, email, amenities } =
      req.body;

    const imageFiles = req.files;

    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one Image!!" });
    }

    const uploadedImageUrls = [];

    for (const file of imageFiles) {
      const localFilePath = file?.path;
      const uploadResult = await uploadToCloudinary(localFilePath);
      if (uploadResult) {
        uploadedImageUrls.push(uploadResult.secure_url);
      }
    }

    if (uploadedImageUrls.length === 0) {
      return res
        .status(500)
        .json({ message: "Failed to upload images to Cloudinary" });
    }
    let amenitiesArray = amenities;
    if (typeof amenitiesArray === "string") {
      amenitiesArray = amenitiesArray.split(",").map((item) => item.trim());
    }

    const existingHotel = await Hotel.findOne({ $or: [{ phone }, { email }] });

    if (existingHotel) {
      res.status(400).json({
        message: "Hotel with the provided phone number or email already exists",
      });
      return;
    }

    const newHotel = await Hotel.create({
      name,
      type,
      desc,
      address,
      city,
      phone,
      email,
      images: uploadedImageUrls,
      amenities: amenitiesArray,
      admin: req.user._id,
    });

    res.status(201).json({
      message: "Hotel created successfully",
      data: newHotel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating Hotel",
      error: error.message,
    });
  }
};

//get All Hotels with pagination
const getAllHotels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const hotels = await Hotel.find().skip(skip).limit(limit).select("-admin");

    const totalHotels = await Hotel.countDocuments();
    const totalPages = Math.ceil(totalHotels / limit);

    res.status(200).json({
      message: "All Hotels fetched successfully",
      data: hotels,
      currentPage: page,
      totalPages: totalPages,
      totalHotels: totalHotels,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching All Hotels",
      error: error.message,
    });
  }
};

const getMyHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find({ admin: req.user._id });
    res.status(200).json({
      message: "My Hotel fetched successfully",
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching My Hotel",
      error: error.message,
    });
  }
};

const getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId).select("-admin");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({
      message: "Hotel fetched successfully",
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching Hotel",
      error: error.message,
    });
  }
};

export { createHotel, getAllHotels, getMyHotel, getHotelById };
