/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "History" }],
  aboutMe: { type: String },
  admin: { type: Boolean, default: false },
  battles: { type: Number, default: 0 },
  excludedGames: [Number],
  wishList: [Number],
  profilePic: { type: String },
  games: {
    neverPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }]
  }
});

userSchema.set("timestamps", true);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
    delete result.history;
    delete result.excludedGames;
    delete result.battles;
    delete result.games;
    delete result.wishList;
  }
});

// this will break if switched to an arrow function
userSchema.methods.validatePassword = function(incomingPassword) {
  const user = this; // for clarity
  return bcrypt.compare(incomingPassword, user.password);
};

userSchema.statics.hashPassword = incomingPassword => {
  const digest = bcrypt.hash(incomingPassword, 10);
  return digest;
};

userSchema.virtual("historyCount").get(function() {
  return this.history.length;
});

userSchema.virtual("level").get(function() {
  const xp = this.history.length;
  let level = 1 * Math.floor(Math.sqrt(xp));
  level = level.toString().padStart(3, 0);
  return level;
});

// XP = level^2 / constant
userSchema.virtual("xpToNextLevel").get(function() {
  let xp = this.history.length;
  let level = 1 * Math.floor(Math.sqrt(xp));
  let nextLevelXp = (level + 1) ** 2 / 1;
  xp = xp.toString().padStart(3, 0);
  level = level.toString().padStart(3, 0);
  nextLevelXp = nextLevelXp.toString().padStart(3, 0);
  return `${xp} / ${nextLevelXp}`;
});

module.exports = mongoose.model("User", userSchema);
