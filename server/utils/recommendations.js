const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;
const moment = require("moment");

const { subMotivationKeywords } = require("../db/subMotivations");

const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

const {
  power,
  story,
  fantasy,
  discovery,
  design,
  challenge,
  competition,
  completion,
  destruction
} = subMotivationKeywords;

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

const getGamesBySubmotivations = async (motivationsArray, from) => {
  // 1 subMotivation <---> 3 subMotivations
  // 1 month <---> 5 years
  // 1 platform <---> All platforms
  // niche <---> popular
  const motivations = motivationsArray.map(word => `\"${word}\"`).join(",");
  const fromDate = moment()
    .subtract(from[0], from[1])
    .unix();

  return (
    apicalypse(requestOptions)
      .fields([
        "name",
        "slug",
        "cover.url",
        "popularity",
        "first_release_date",
        "summary"
      ])
      .limit(50)
      // .sort("first_release_date", "desc")
      .sort("popularity", "desc")
      .where(
        `keywords.name = (${motivations}) & first_release_date > ${fromDate} & first_release_date < ${today}`
      )
      .request("/games")
      .then(res => {
        const { data } = res;

        return uniqueElementsBy(data, (a, b) => a.id == b.id);
      })
  );
};

// getGamesBySubmotivations([...story, ...fantasy], [1, "Months"])
//   .then(result => console.log(result))
//   .catch(e => console.log(e.response.data));

module.exports = { getGamesBySubmotivations };
