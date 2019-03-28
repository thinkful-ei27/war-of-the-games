const apicalypseDefault = require("apicalypse");
const { 
  IGDB_KEY1, 
  IGDB_KEY2, 
  IGDB_KEY3, 
  IGDB_KEY4, 
  IGDB_KEY5 
} = require('../config');

const apicalypse = apicalypseDefault.default;

const keys = [
  IGDB_KEY1,
  // IGDB_KEY2,
  // IGDB_KEY3,
  // IGDB_KEY4,
  // IGDB_KEY5
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
    .fields(["name", "cover", "slug"])
    .where(`id = ${id}`)
    .request("/games")
    .then(res => res.data[0]);

const getCover = async id =>
  await apicalypse(requestOptions)
    .fields(["image_id"])
    .where(`id = ${id}`)
    .request("/covers")
    .then(res => res.data[0]);

module.exports = { getGames, getGame, getCover };
