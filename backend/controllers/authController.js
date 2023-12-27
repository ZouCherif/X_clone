const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateTokens = (id, email, username, name) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id,
        email,
        username,
        name,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  const { name, email, password, picture, username } = req.body;
  if (!name || !email || !password || !date_of_birth)
    return res.status(400).json({ message: "all infomations are required" });
  const duplicate = await User.findOne({ email: email });
  if (duplicate)
    return res.status(400).json({ message: "email already in use" });
  try {
    const hashedpwd = bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedpwd,
      username,
    });
    if (picture) {
      const storageRef = storage.ref();
      const pictureRef = storageRef.child(
        `/users/${newUser._id}/profile_picture/user_${username}_${Date.now()}`
      );
      await pictureRef.put(picture);
      const pictureURL = await pictureRef.getDownloadURL();
      newUser.picture = pictureURL;
    }

    const { accessToken, refreshToken } = generateTokens(
      newUser._id,
      newUser.email,
      newUser.username,
      newUser.name
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: `New user ${username} created!`,
      accessToken,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" });
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const { accessToken, refreshToken } = generateTokens(
      foundUser._id,
      foundUser.email,
      foundUser.username,
      foundUser.name
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 60 * 1000, // 59 minutes
      //domain: "localhost",
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "successfully loged in",
      accessToken,
    });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};
