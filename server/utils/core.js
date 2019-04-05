const apicalypseDefault = require("apicalypse");

const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");
const { core } = require("../db/core");
const Top = require("../models/top");
const Core = require("../models/core");

const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.info("Clearing Core...");
    return Core.remove({});
  })
  .then(() => {
    const gameNames = core.map(c => c.game);
    return Top.find(
      { name: { $in: gameNames } },
      { igdbId: 1, name: 1, similar_games: 1 }
    );
  })
  .then(results => {
    // console.log(results);
    // Iterate over top to make full array.
    const newList = results.map(l => {
      // Find the game in core, add motivation and submotivation
      const obj = JSON.stringify(l);
      const newObj = JSON.parse(obj);
      const { igdbId, name, similar_games } = newObj;
      const findit = core.find(c => c.game === l.name);
      const { motivation, subMotivation } = findit;
      return {
        igdbId,
        name,
        similar_games,
        motivation,
        subMotivation,
        core: true
      };
    });

    return newList;
  })
  .then(results => {
    return Core.insertMany(results);
  })
  .then(results => {
    // console.log("Results are ", results);
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
