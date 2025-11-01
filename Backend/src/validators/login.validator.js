const loginValidator = {
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
};
export default loginValidator;
