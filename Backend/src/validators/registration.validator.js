const registrationValidator = {
  firstName: {
    in: ["body"],
    isString: true,
    isLength: { options: { min: 3, max: 20 } },
    errorMessage: "First name must be a string between 3 and 20 characters",
  },
  lastName: {
    in: ["body"],
    isString: true,
    isLength: { options: { min: 3, max: 20 } },
    errorMessage: "Last name must be a string between 3 and 20 characters",
  },
  email: {
    in: ["body"],
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Invalid email format",
  },
  password: {
    in: ["body"],
    isLength: { options: { min: 6 } },
    errorMessage: "Password must be at least 6 characters long",
  },
  phoneNumber: {
    in: ["body"],
    isLength: { options: { min: 10, max: 10 } },
    isString: true,
    errorMessage: "Phone number must be 10 digits long",
  },
  isAdmin: {
    in: ["body"],
    optional: true,
    isBoolean: true,
    errorMessage: "isAdmin must be a boolean value",
  },
};

export default registrationValidator;
