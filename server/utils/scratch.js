const axios = require("axios");

const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");
const Core = require("../models/core");
const Game = require("../models/game");

const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

const testGame = {
  igdbId: 12515,
  name: "Pokémon GO",
  motivation: "action",
  subMotivation: "destruction",
  core: false
};

const updateMotivations = game => {
  game = JSON.stringify(game);
  game = JSON.parse(game);
  const { name, motivation, subMotivation, core } = game;
  // User.update({_id: user._id}, {$unset: {field: 1 }}, callback);
  return Game.findOneAndUpdate(
    { name },
    { $addToSet: { motivations: motivation } },
    { new: true }
  ).then(result => {
    return result;
  });
};

const addGameToCollection = game => {
  game = JSON.stringify(game);
  game = JSON.parse(game);
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFkbWluIjpmYWxzZSwiYmF0dGxlcyI6MCwidXNlcm5hbWUiOiJ1c2VybmFtZTkwMDAxIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiSm9obiIsImhpc3RvcnlDb3VudCI6MCwiaWQiOiI1Y2E4MTA3YTllMjY5YWY5MmI1NDQ2MjIifSwiaWF0IjoxNTU0NTE4MTQzLCJleHAiOjE1NTUxMjI5NDMsInN1YiI6InVzZXJuYW1lOTAwMDEifQ.eSYBbXtB3SbppnyTXCg7q9omoGm81hvqJRxXnbd7X1Q";
  const { igdbId } = game;
  axios({
    url: `http://localhost:8080/api/games`,
    method: "POST",
    data: {
      igdbId
    },
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    }
  }).then(results => {
    console.log(results.data);
  });
};

const updateCore = game => {
  game = JSON.stringify(game);
  game = JSON.parse(game);
  const { name, core } = game;
  // User.update({_id: user._id}, {$unset: {field: 1 }}, callback);
  return Game.findOneAndUpdate({ name }, { core }, { new: true }).then(
    result => {
      return result;
    }
  );
};

const removeMotivations = game => {
  game = JSON.stringify(game);
  game = JSON.parse(game);
  const { name, motivation, subMotivation, core } = game;
  // User.update({_id: user._id}, {$unset: {field: 1 }}, callback);
  return Game.update(
    { name },
    { $unset: { subMotivations: 1 } },
    { strict: false }
  ).then(result => {
    return result;
  });
};

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    return Core.find();
  })
  .then(res => {
    const actions = res.map(updateMotivations);
    // const coreActions = res.map(updateCore);
    // const games = res.map(addGameToCollection);
    // const removals = res.map(removeMotivations);
    return (results = Promise.all(actions));
  })
  .then(results => {
    console.log(results);
    // return Core.insertMany(results);
  })
  .then(results => {
    // console.log("Results are ", results);
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
