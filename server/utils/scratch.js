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
    .fields(["name", "url", "rating_count"])
    .limit(50)
    .sort("rating_count", "desc") // sorts by name, descending
    .where(["rating_count < 552"])
    // .search("Smite")
    .request("/games")
    .then(res => res.data);

getGames()
  .then(res => console.log(res))
  .catch(e => console.error(e.response.data));
