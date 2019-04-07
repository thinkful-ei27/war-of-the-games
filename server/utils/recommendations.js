const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;
const moment = require("moment");

const keys = process.env.IGDB_KEYS.split(",");

const randomKey = arr => arr[Math.floor(Math.random() * arr.length)];

const sixMonthsAgo = moment()
  .subtract(1, "months")
  .unix();

const today = moment().unix();

const requestOptions = {
  method: "post", // The default is `get`
  baseURL: "https://api-v3.igdb.com",
  headers: {
    Accept: "application/json",
    "user-key": randomKey(keys)
  },
  responseType: "json"
};

const getGames = async () =>
  apicalypse(requestOptions)
    .fields(["name", "url"])
    .limit(2)
    // .sort('name', 'desc') // sorts by name, descending
    // .where(['age > 50', 'movies != n'])
    .request("/games")
    .then(res => res.data);

const getGame = async motivationsArray =>
  apicalypse(requestOptions)
    .fields([
      "name",
      "slug",
      "keywords",
      "popularity",
      "first_release_date"
      // "summary",
      // "genres.name",
      // "platforms.name",
      // "similar_games" is an array of IGDB ID numbers
      // "similar_games",
      // "first_release_date"
    ])
    .limit(10)
    // .sort("first_release_date", "desc")
    .sort("popularity", "desc")
    .where(
      `keywords.name = ("fantasy", "story") & first_release_date > ${sixMonthsAgo} & first_release_date < ${today}`
    )
    .request("/games")
    .then(res => res.data);

getGame()
  .then(result => console.log(result))
  .catch(e => console.log(e.response.data));

module.exports = { getGames, getGame };
