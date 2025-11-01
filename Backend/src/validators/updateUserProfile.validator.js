const updateUserProfileValidator = {
  firstName: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "First name must be a string",
    },
    isLength: {
      options: { min: 2, max: 30 },
      errorMessage: "First name must be between 2 and 30 characters",
    },
  },
  lastName: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Last name must be a string",
    },
    isLength: {
      options: { min: 2, max: 30 },
      errorMessage: "Last name must be between 2 and 30 characters",
    },
  },
  phoneNumber: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Phone number must be a string",
    },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: "Phone number must be 10 digits long",
    },
    isMobilePhone: {
      options: ["any"],
      errorMessage: "Invalid phone number",
    },
  },
};

export default updateUserProfileValidator;
