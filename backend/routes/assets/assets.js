const express = require("express");
const router = express.Router();
const assetsController = require("../../controllers/assetsController");
const { upload } = require("../../config/FireConnect");
const verifyJWT = require("../../middlewares/verifyJWT");

router.post(
  "/",
  verifyJWT,
  upload.single("profilePicture"),
  assetsController.addProfilePicture
);

module.exports = router;
