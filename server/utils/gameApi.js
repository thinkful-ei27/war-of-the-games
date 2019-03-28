const apicalypseDefault = require("apicalypse");
// const apicalypse = require("../apicalypse/index");

const apicalypse = apicalypseDefault.default;

const keys = [
  "22499d0daab9ad25a7e4c9cc140fe2f2",
  "515a661fa441d2e94e33056910808b10"
];

const randomKey = arr => arr[Math.floor(Math.random() * arr.length)];

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
  await apicalypse(requestOptions)
    .fields(["name", "url"])
    .limit(2)
    // .sort('name', 'desc') // sorts by name, descending
    // .where(['age > 50', 'movies != n'])
    .request("/games")
    .then(res => res.data);

const getGame = async id =>
  await apicalypse(requestOptions)
    .fields(["name", "cover.image_id", "slug", "summary", "genres.name"])
    .where(`id = ${id}`)
    .request("/games")
    .then(res => res.data[0]);

// const getCover = async id =>
//   await apicalypse(requestOptions)
//     .fields(["image_id"])
//     .where(`id = ${id}`)
//     .request("/covers")
//     .then(res => res.data[0]);

module.exports = { getGames, getGame };
