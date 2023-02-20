const express = require("express");
const morgan = require("morgan");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const asyncError = require("./errors.middleware");

// const roomTypesRouter = require("./roomType.route");
// const roomRouter = require("./room.route");
// const authRouter = require("./auth.routes");
const indexRoutes = require("../routes/app.routes");
// const authenticateUser = require("./authentication");

// error handler
const notFoundMiddleware = require("./not-found");
const errorHandlerMiddleware = require("./error-handler");

require("../config/database")();

module.exports = (app) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
  indexRoutes(app);
  // app.use("/api/v1/", authenticateUser, roomRouter, roomTypesRouter);

  app.use(asyncError);
};
