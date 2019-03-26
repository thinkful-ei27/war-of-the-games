const mongoose = require("mongoose");

const schema = new mongoose.Schema();

module.exports = mongoose.model("Game", schema);
