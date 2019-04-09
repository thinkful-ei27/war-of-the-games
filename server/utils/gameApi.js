const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;

const keys = process.env.IGDB_KEYS.split(",");

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

const getGenres = async () =>
  apicalypse(requestOptions)
    .fields(["name", "url"])
    .limit(50)
    // .sort('name', 'desc') // sorts by name, descending
    // .where(['age > 50', 'movies != n'])
    .request("/genres")
    .then(res => res.data);

const getIdFromSlug = async slug => {
  const newSlug = `\"${slug}\"`;
  return apicalypse(requestOptions)
    .fields(["id", "name"])
    .where(`slug = ${newSlug}`)
    .request("/games")
    .then(res => res.data);
};

const getThemes = async () =>
  apicalypse(requestOptions)
    .fields(["name", "url"])
    .limit(50)
    // .sort('name', 'desc') // sorts by name, descending
    // .where(['age > 50', 'movies != n'])
    .request("/themes")
    .then(res => res.data);

const getGames = async () =>
  apicalypse(requestOptions)
    .fields(["name", "url"])
    .limit(2)
    // .sort('name', 'desc') // sorts by name, descending
    // .where(['age > 50', 'movies != n'])
    .request("/games")
    .then(res => res.data);

const getGame = async id =>
  apicalypse(requestOptions)
    .fields([
      "name",
      "cover.image_id",
      "slug",
      "summary",
      "genres.name",
      "platforms.name",
      // "similar_games" is an array of IGDB ID numbers
      "similar_games",
      "first_release_date"
    ])
    .where(`id = ${id}`)
    .request("/games")
    .then(res => res.data[0]);

// const getCover = async id =>
//   await apicalypse(requestOptions)
//     .fields(["image_id"])
//     .where(`id = ${id}`)
//     .request("/covers")
//     .then(res => res.data[0]);

getIdFromSlug("shadows-awakening")
  // getGames()
  .then(result => console.log(result))
  .catch(e => console.error(e.response.statusText));

module.exports = { getGames, getGame, getIdFromSlug };
