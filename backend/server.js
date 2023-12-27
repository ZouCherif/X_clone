require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/ConnectDB");
require("./config/FireConnect");

connectDB();

app.use("/register", require("./routes/auth/register"));

mongoose.connection.once("open", () => {
  console.log("mongoDB connected");
  app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
});
