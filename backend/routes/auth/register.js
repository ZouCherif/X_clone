const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
// const assetsController = require("../../controllers/assetsController");
// const verifyJWT = require("../../middlewares/verifyJWT");

router.post("/", authController.register);
router.post("/getVerificationCode", authController.getVerificationCode);
router.post("/verifyCode", authController.verifyCode);
// router.post(
//   "/addProfilePicture",
//   verifyJWT,
//   assetsController.addProfilePicture
// );

module.exports = router;
