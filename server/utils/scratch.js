const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");

const History = require("../models/history");
const { histories } = require("../db/data");
const Game = require("../models/game");
const { games } = require("../db/data");

const allGames = async (id, log) => {
  const query = id ? { _id: id } : {};
  const all = await Game.find(query);
  if (log) console.log(all);

  return all;
};

const allHistory = async log => {
  const all = await History.find();
  if (log) console.log(all);

  return all;
};

const gamesPlayed = async (id, log) => {
  const query = id
    ? {
        $or: [{ gameOne: id }, { gameTwo: id }]
      }
    : {};
  const played = await History.find(query);
  if (log) console.log("games played is ", played.length);

  return played.length;
};

const gamesWon = async (id, log) => {
  const query = id ? { choice: id } : {};
  const won = await History.find(query);
  if (log) console.log("games won is ", won.length);

  return won.length;
};

const percentage = (won, played, log) => {
  const percent = parseInt(won, 10) / parseInt(played, 10);
  if (log) console.log(percent);

  return percent;
};

const percentageWon = async (id, log) => {
  const gp = await gamesPlayed(id, log);
  const gw = await gamesWon(id, log);
  return { gamesWon: gw, gamesPlayed: gp, percentage: percentage(gw, gp, log) };
  // throw new Error("oops");
};

// const makeQueryConnect = async (id, log) => {
//   await mongoose.connect(DATABASE_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true
//   });
//   const gp = await gamesPlayed(id, log);
//   const gw = await gamesWon(id, log);
//   percentage(gw, gp, log);
//   await mongoose.disconnect();
//   throw new Error("oops");
// };

// makeQueryConnect("5c9a959ba5d0dd09e07f45a7", "log").catch(err => {
//   console.log(err);
//   mongoose.disconnect();
// });

module.exports = {
  allGames,
  allHistory,
  gamesWon,
  gamesPlayed,
  percentageWon
};
