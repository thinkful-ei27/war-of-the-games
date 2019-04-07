const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;
const moment = require("moment");

const { subMotivationKeywords } = require("../db/subMotivations");

const { power } = subMotivationKeywords;

const keys = process.env.IGDB_KEYS.split(",");

const randomKey = arr => arr[Math.floor(Math.random() * arr.length)];

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

const getGame = async (motivationsArray, from) => {
  const motivations = motivationsArray.map(word => `\"${word}\"`).join(",");
  console.log(motivations);
  const fromDate = moment()
    .subtract(from[0], from[1])
    .unix();

  return (
    apicalypse(requestOptions)
      .fields(["name", "slug", "popularity", "first_release_date"])
      .limit(50)
      // .sort("first_release_date", "desc")
      .sort("popularity", "desc")
      .where(
        `keywords.name = (${motivations}) & first_release_date > ${fromDate} & first_release_date < ${today}`
      )
      .request("/games")
      .then(res => res.data)
  );
};

getGame(power, [5, "Years"])
  .then(result => console.log(result))
  .catch(e => console.log(e.response.data));

module.exports = { getGames, getGame };
