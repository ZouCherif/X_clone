require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/ConnectDB");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/CorsOptions");
const cors = require("cors");
const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

// require("./config/FireConnect");

connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/register", require("./routes/auth/register"));
app.use("/login", require("./routes/auth/login"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "404 Not Found" });
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("mongoDB connected");
  app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
});
