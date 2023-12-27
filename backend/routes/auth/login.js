const express = require("express");
const router = express.router();
const authController = require("../../controllers/authController");

router.post("/", authController.login);
router.post("/googleOAuth", authController.handleGoogleAuth);

module.exports = router;