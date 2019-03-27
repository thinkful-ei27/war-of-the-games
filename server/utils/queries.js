const History = require('../models/history');

const totalGamesPlayed = id =>
  History.find({
    $or: [{ gameOne: id }, { gameTwo: id }]
  }).then(results => results.length);

const gamesWon = async id => {
  const played = await History.find({ choice: id });

  return played.length;
};

module.exports = { totalGamesPlayed, gamesWon };
