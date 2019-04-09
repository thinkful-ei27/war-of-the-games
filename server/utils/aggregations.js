const apicalypseDefault = require("apicalypse");

const apicalypse = apicalypseDefault.default;

const fields = "id, name, similar_games, rating_count, genres";

const keys = process.env.IGDB_KEYS.split(",");
const randomKey = arr => arr[Math.floor(Math.random() * arr.length)];
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === "function" ? fn : val => val[fn]));

const countBy = (arr, fn) =>
  arr.map(typeof fn === "function" ? fn : val => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

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

  return getGames(newCount, allGames);
  // return allGames;
};

const aggregateBy = category => {
  getGames()
    .then(result => {
      const simCount = result.reduce((a, b) => {
        const aggregate = b[category];
        aggregate.forEach(gameid => {
          a.push(gameid);
        });
        return a;
      }, []);
      const counts = countBy(simCount, name => name);
      const sortable = [];
      for (const game in counts) {
        sortable.push([game, counts[game]]);
      }
      sortable.sort(function(a, b) {
        return b[1] - a[1];
      });
      console.log(sortable);
    })
    .catch(e => console.error(e));
};

aggregateBy("genres");
