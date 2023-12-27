const express = require("express");
const router = express.router();
const authController = require("../../controllers/authController");

router.post("/", authController.login);
router.post("/googleOAuth", authController.handleGoogleAuth);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

module.exports = router;
