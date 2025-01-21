const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signup", userController.create);

router.post("/login", authController.login);

module.exports = router;
