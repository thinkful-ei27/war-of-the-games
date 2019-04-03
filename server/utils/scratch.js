const apicalypseDefault = require("apicalypse");
// const apicalypse = require("../apicalypse/index");

const apicalypse = apicalypseDefault.default;

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
  if (allGames.length > 10) {
    return allGames;
  }

  const games = await apicalypse(requestOptions)
    .fields(["name", "url", "rating_count"])
    .limit(2)
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

getGames()
  .then(res => console.log(res))
  .catch(e => console.error(e.response.data));
