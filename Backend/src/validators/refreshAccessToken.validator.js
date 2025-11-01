const refreshAccessTokenValidator = {
  refreshToken: {
    in: ["cookies"],
    exists: {
      errorMessage: "Refresh token is required",
    },
    isString: {
      errorMessage: "Refresh token must be a string",
    },
  },
};
