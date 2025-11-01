const updateUserPasswordValidator = {
  oldPassword: {
    in: ["body"],
    exists: {
      errorMessage: "Old password is required",
    },
    isString: {
      errorMessage: "Old password must be a string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Old password must be at least 6 characters long",
    },
  },
  newPassword: {
    in: ["body"],
    exists: {
      errorMessage: "New password is required",
    },
    isString: {
      errorMessage: "New password must be a string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "New password must be at least 6 characters long",
    },
  },
};

export default updateUserPasswordValidator;
