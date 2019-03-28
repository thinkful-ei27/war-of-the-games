const History = require('../models/history');

const totalGamesPlayed = id =>
  History.find({
    $or: [{ gameOne: id }, { gameTwo: id }]
  }).then(results => results.length);

const gamesWon = async id => {
  const played = await History.find({ choice: id });

  return played.length;
};

const gameName = async id => {
  const choice = await History.find({ choice: id }).populate('choice');

  return choice.map(game => game.choice.name);
};

const gamePic = async id => {
  const picture = await History.find({ choice: id }).populate('choice');
  return picture[0].choice.coverUrl;
};

module.exports = { totalGamesPlayed, gamesWon, gameName, gamePic };
