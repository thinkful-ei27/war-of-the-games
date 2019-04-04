const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;

const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");
const Top = require("../models/top");

const fields =
  "age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites";

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
  if (allGames.length > 100) {
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
      data.forEach(game => allGames.push(game));
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
