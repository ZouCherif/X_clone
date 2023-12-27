const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const accessToken = jwt.sign(
      {
        userInfo: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { email: newUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
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
