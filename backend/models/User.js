const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  date_of_birth: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  picture: {
    type: "string",
  },
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
