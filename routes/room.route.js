const express = require("express");
const roomController = require("../controllers/room.controllers");
const { isAdmin } = require("../middleware/auth2");

const roomRouter = express.Router();

roomRouter.post("/", isAdmin, roomController.create);

roomRouter.get("/", roomController.find);

roomRouter.get("/:id", roomController.findById);

roomRouter.put("/:id", isAdmin, roomController.update);

roomRouter.delete("/:id", isAdmin, roomController.delete);

module.exports = roomRouter;
