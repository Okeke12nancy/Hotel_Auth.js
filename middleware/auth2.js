const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Cofirm it is an admin
module.exports.isAdmin = async (req, res, next) => {
  try {
    // Confirm, that the TOKKEN IS IN THE HEADER
    // The token wil  be placed in the authorization header and will have the Bearer prefix, thats why we need to split it and get the token
    if (!req.headers.authorization) {
      return res.status(401).send({
        statuscode: 401,
        status: "error",
        thetoken: `${req.headers.authorization}`,
        message: "No token provided",
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (token === undefined) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Token not found in the header",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // cofirm that the token is valid
    if (!decodedToken) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Token is not valid",
      });
    }

    const adminId = decodedToken._id;

    // Check if Admin Id Exists in the admin database
    const admin = await User.findById(adminId);

    console.log(admin);

    if (admin.role !== "admin") {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message:
          "Unauthorized Request! Sign In Or SignUp!. If you are already signed in, please logout and login again. Else you are not allowed to make request to this endpoint",
      });
    } else {
      req.admin = admin;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// Confirm User is logged in
module.exports.isAuthorized = async (req, res, next) => {
  try {
    // Confirm, that the TOKKEN IS IN THE HEADER
    // The token wil  be placed in the authorization header and will have the Bearer prefix, thats why we need to split it and get the token
    if (!req.headers.authorization) {
      return res.status(401).send({
        statuscode: 401,
        status: "error",
        thetoken: `${req.headers.authorization}`,
        message: "No token provided",
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (token === undefined) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Token not found in the header",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // cofirm that the token is valid
    if (!decodedToken) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Token is not valid",
      });
    }

    const userId = decodedToken._id;

    // Check if user id exist in th User database
    const user = await User.findById(userId);

    console.log(user);
    if (!user) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message:
          "Unauthorized Request! Sign In Or SignUp!. If you are already signed in, please logout and login again. Else you are not allowed to make request to this endpoint",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
