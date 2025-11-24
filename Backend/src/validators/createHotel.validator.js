const createHotelValidator = {
  name: {
    in: ["body"],
    isString: true,
    isLength: { options: { min: 3, max: 50 } },
    errorMessage: "Hotel name must be a string between 3 and 50 characters",
  },
  type: {
    in: ["body"],
    isString: true,
    isIn: {
      options: [["hotel", "apartment", "resort", "villa", "cabin"]],
      errorMessage:
        "Type must be one of hotel, apartment, resort, villa, cabin",
    },
  },
  desc: {
    in: ["body"],
    isString: true,
    errorMessage: "Description must be at least 10 characters long",
  },
  address: {
    in: ["body"],
    isString: true,
    errorMessage: "Address must be at least 10 characters long",
  },
  city: {
    in: ["body"],
    isString: true,
    isLength: { options: { min: 2 } },
    errorMessage: "City must be at least 2 characters long",
  },
  phone: {
    in: ["body"],
    isString: true,
    isLength: { options: { min: 10, max: 10 } },
    matches: { options: [/^\d{10}$/] },
    errorMessage: "Phone number must be 10 digits long",
  },
  email: {
    in: ["body"],
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Invalid email format",
  },
  amenities: {
    in: ["body"],
    isString: true,
    errorMessage: "Amenities must be a strings",
  },
};

export default createHotelValidator;
