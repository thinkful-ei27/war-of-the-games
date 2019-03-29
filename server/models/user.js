"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  history: ['5c9d3d5633c0a84b319a92ee', '5c9d3d5633c0a84b319a92ee']
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

userSchema.methods.validatePassword = function(incomingPassword) {
  const user = this; // for clarity
  return bcrypt.compare(incomingPassword, user.password);
};

userSchema.statics.hashPassword = function(incomingPassword) {
  const digest = bcrypt.hash(incomingPassword, 10);
  return digest;
};

module.exports = mongoose.model("User", userSchema);
