const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/auth2");

const { register, login } = require("../controllers/auth");
router.post("/", isAuthorized, register);
router.post("/", isAuthorized, login);

module.exports = router;
