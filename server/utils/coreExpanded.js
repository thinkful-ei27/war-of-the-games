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

const pushSimilar = game => {
  game = JSON.stringify(game);
  game = JSON.parse(game);
  const { similar_games, motivation, subMotivation } = game;
  const trueMotivation = motivation;
  const trueSubMotivation = subMotivation;
  // return Top.find(
  //   { igdbId: { $in: similar_games } },
  //   { igdbId: 1, name: 1, similar_games: 1 }
  // );
  return Top.find()
    .where("igdbId")
    .in(similar_games)
    .select("igdbId name similar_games")
    .then(results => results)
    .then(results => {
      results = JSON.stringify(results);
      results = JSON.parse(results);
      const finalResults = results.map(res => {
        const obj = {
          igdbId: res.igdbId,
          name: res.name,
          similar_games: res.similar_games,
          motivation: trueMotivation,
          subMotivation: trueSubMotivation,
          core: false
        };
        return obj;
      });
      return finalResults;
    })
    .catch(e => console.log("oopsie"));
};

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    return Core.find();
  })
  .then(res => {
    const actions = res.map(pushSimilar);
    return (results = Promise.all(actions));
  })
  .then(results => {
    const flattenedResults = flatten(results);
    console.log("Results are ", flattenedResults);
    return Core.insertMany(flattenedResults);
  })
  .then(results => {
    console.log("disconnecting...");
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
