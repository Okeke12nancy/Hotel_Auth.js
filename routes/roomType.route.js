const express = require("express");
const roomTypeController = require("../controllers/roomType.controllers");
const { isAdmin } = require("../middleware/auth2");

const roomTypeRouter = express.Router();

roomTypeRouter.post("/", isAdmin, roomTypeController.create);
roomTypeRouter.get("/:id", roomTypeController.findById);

roomTypeRouter.get("/", roomTypeController.findAll);

roomTypeRouter.put("/:id", isAdmin, roomTypeController.update);

roomTypeRouter.delete("/:id", isAdmin, roomTypeController.delete);

module.exports = roomTypeRouter;
