const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  igdb: {
    id: { type: Number, required: true, unique: true },
    slug: { type: String, required: true }
  },
  coverUrl: { type: String, required: true },
  summary: String,
  genres: [
    {
      id: Number,
      name: String
    }
  ],
  platforms: [
    {
      id: Number,
      name: String
    }
  ],
  // An array of IGDB ID numbers
  similar_games: [{ type: Number }]
  // images: [{ t_thumb: { type: String }, t_720p: { type: String } }]
});

schema.set("timestamps", true);

schema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model("Game", schema);
