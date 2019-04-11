const History = require("../models/history");

const totalGamesPlayed = id =>
  History.find({
    $or: [{ gameOne: id }, { gameTwo: id }]
  }).then(results => results.length);

const gamesWon = async id => {
  const played = await History.find({ choice: id });

  return played.length;
};

// const gamePic = async id => {
//   const picture = await History.find({ choice: id }).populate("choice");
//   if (picture.length < 1) {
//     // Game has never been chosen...pull cover art from games
//     const noChoicePic = await Game.find({ _id: id });
//     return noChoicePic[0].coverUrl;
//   }
//   return picture[0].choice.coverUrl;
// };

module.exports = { totalGamesPlayed, gamesWon };
