// const axios = require("axios");

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFkbWluIjp0cnVlLCJiYXR0bGVzIjoxMiwidXNlcm5hbWUiOiJqeW91bmcxOTg1IiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiWW91bmciLCJpZCI6IjVjOWJlZDJlZGVkMGU5MDg4YzgzNDhmYyJ9LCJpYXQiOjE1NTQ0OTQyNDksImV4cCI6MTU1NTA5OTA0OSwic3ViIjoianlvdW5nMTk4NSJ9.As20cvU_VzBQ9d_hJj99flNL4mWMVS-DOO8Phbk09lU";

// axios({
//   url: `http://localhost:8080/api/games`,
//   method: "PUT",
//   data: {
//     igdbId: 24869
//   },
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   }
// }).then(results => {
//   console.log(results.data);
// });

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

const updateMotivations = game => {
  game = JSON.stringify(game);
  game = JSON.parse(game);
  const { name, motivation, subMotivation, core } = game;
  return Game.findOneAndUpdate(
    { name },
    { motivation, subMotivation, core },
    { new: true }
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
