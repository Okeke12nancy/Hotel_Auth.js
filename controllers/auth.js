const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { authSchema } = require("../middleware/validate");

const register = async (req, res) => {
  try {
    await authSchema.validateAsync({ ...req.body });
    const user = await User.create({ ...req.body });

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "User created successfully",
      user: { userId: user._id, name: user.name, role: user.roles },
    });
  } catch (err) {
    // throw new BadRequestError(err);
    throw new BadRequestError(err?.details[0]?.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
