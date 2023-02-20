const roomTypeRouter = require("./roomType.route");
const roomRouter = require("./room.route");
const authRouter = require("./auth.routes");
const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}/room-types`, roomTypeRouter);
  app.use(`${basePath}/rooms`, roomRouter);
  app.use(`${basePath}/register`, authRouter);
  app.use(`${basePath}/login`, authRouter);
};
