const roomTypeRouter = require("./roomType.route");
const roomRouter = require("./room.route");
const authRouter = require("./auth.routes");
const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}`, authRouter);
  app.use(`${basePath}/rooms`, roomRouter);
  app.use(`${basePath}/room-types`, roomTypeRouter);
};
