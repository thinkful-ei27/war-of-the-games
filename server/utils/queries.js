const History = require("../models/history");
const Game = require("../models/game");

const totalGamesPlayed = id =>
  History.find({
    $or: [{ gameOne: id }, { gameTwo: id }]
  }).then(results => results.length);

const gamesWon = async id => {
  const played = await History.find({ choice: id });

  return played.length;
};

// const gameName = async id => {
//   const name = await History.find({ choice: id }).populate("choice");
//   console.log(name);
//   if (name.length < 1) {
//     // Game has never been chosen...pull cover art from games
//     const noChoiceName = await Game.find({ _id: id });
//     return noChoiceName[0].name;
//   }
//   return name[0].choice.name;
// };

const gamePic = async id => {
  const picture = await History.find({ choice: id }).populate("choice");
  if (picture.length < 1) {
    // Game has never been chosen...pull cover art from games
    const noChoicePic = await Game.find({ _id: id });
    return noChoicePic[0].coverUrl;
  }
  return picture[0].choice.coverUrl;
};

module.exports = { totalGamesPlayed, gamesWon, gamePic };
