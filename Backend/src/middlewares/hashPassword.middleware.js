import bcrypt from "bcrypt";

export const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
};

//Make sure to use bcrypt.compare() to verify passwords in controllers or make saperate function for that.
