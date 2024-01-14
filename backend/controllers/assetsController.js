const User = require("../models/User");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../config/FireConnect");

const addProfilePicture = async (req, res) => {
  try {
    const storageRef = ref(
      storage,
      `/users/${req.userId}/profile_picture/user_${req.username}_${Date.now()}`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const pictureURL = await getDownloadURL(snapshot.ref);

    const user = await User.findById(req.userId).select(
      "-password -refreshToken -__v -name -username -posts -followers -following"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.picture = pictureURL;
    user.save();
    return res.status(200).json({ message: "uploaded successfully" });
  } catch (e) {
    return res.status(404);
  }
};

module.exports = { addProfilePicture };
