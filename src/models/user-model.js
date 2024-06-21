const { Schema, model } = require("mongoose");

const inviteSchema = Schema({
  email: {
    type: String,
    required: true,
  },
});

const userSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "User",
  },
  invites: {
    type: [inviteSchema],
    default: [],
  },
});

module.exports = model("Users", userSchema);
