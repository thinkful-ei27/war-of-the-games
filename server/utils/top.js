const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;

const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");
const Top = require("../models/top");

const fields =
  "id, aggregated_rating,aggregated_rating_count,artworks,category,cover,created_at,first_release_date,follows,franchise,franchises,genres,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,videos,websites";

const keys = process.env.IGDB_KEYS.split(",");
const randomKey = arr => arr[Math.floor(Math.random() * arr.length)];
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === "function" ? fn : val => val[fn]));

const requestOptions = {
  method: "post", // The default is `get`
  baseURL: "https://api-v3.igdb.com",
  headers: {
    Accept: "application/json",
    "user-key": randomKey(keys)
  },
  responseType: "json"
};

// Recursively gets all games from the igdb based on rating count
const getGames = async (ratingCount = 2000, allGames = []) => {
  // Base case
  if (allGames.length > 1500) {
    return allGames;
  }

  const games = await apicalypse(requestOptions)
    .fields(fields)
    .limit(50)
    .sort("rating_count", "desc")
    .where([`rating_count < ${ratingCount}`])
    // .search("Smite")
    .request("/games")
    .then(result => {
      const { data } = result;
      const minRating = minBy(data, o => o.rating_count);
      data.forEach(game => {
        const { id } = game;
        allGames.push({ igdbId: id, ...game });
      });
      return minRating;
    });

  const newCount = games;
  console.log(newCount);

  return getGames(newCount, allGames);
  // return allGames;
};

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.info("Clearing Tops...");
    return Promise.all([Top.remove({})]);
  })
  .then(async () => {
    console.info("Seeding Database...");
    const topGames = await getGames();
    return Promise.all([Top.insertMany(topGames)]);
  })
  .then(results => {
    console.log(`Inserted results with no errors, ${results}`);
    console.info("Disconnecting...");
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
