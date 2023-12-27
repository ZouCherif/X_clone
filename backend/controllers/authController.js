const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { storage } = require("../config/FireConnect");

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

const handleGoogleAuth = async (req, res) => {
  if (!req.body.code) return res.status(401).json({ message: "Invalid code" });
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    const decoded = jwt_decode(tokens.id_token);
    let user = await User.findOne({ email: decoded.email }).exec();
    if (!user) {
      user = await User.create({
        email: decoded.email,
        username: decoded.name,
        name: decoded.name,
      });
    }
    const { accessToken, refreshToken } = generateTokens(
      user._id,
      user.email,
      user.username,
      user.name
    );

    user.refreshToken = refreshToken;
    const result = await user.save();

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
    res.json({
      message: "successfully loged in",
      accessToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  const mailOptions = {
    from: process.env.SEND_EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Please click the following link to reset your password: <a href="http://localhost:3000/resetPassword/${token}">Reset Password</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset password email" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

module.exports = {
  register,
  login,
  handleGoogleAuth,
  forgotPassword,
  resetPassword,
};
