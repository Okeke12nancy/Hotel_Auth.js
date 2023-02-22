const express = require("express");
const morgan = require("morgan");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const asyncError = require("./errors.middleware");

const indexRoutes = require("../routes/app.routes");

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
  indexRoutes(app);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
  app.use(asyncError);
};
