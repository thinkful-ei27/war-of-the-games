'use strict';

const apicalypse = require('../apicalypse/index');
const slugs = require('./extractGames');

const keys = ['22499d0daab9ad25a7e4c9cc140fe2f2', '515a661fa441d2e94e33056910808b10']

const randomKey = arr => arr[Math.floor(Math.random() * arr.length)];

const requestOptions = {
  method: 'post', // The default is `get`
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    'Accept': 'application/json',
    'user-key': randomKey(keys)
  },
  responseType: 'json',
};

// Template
const getGames = async () => {
  try {
    const response = await apicalypse(requestOptions)
      .fields(['name', 'url', 'slug'])
      // .limit(2)
      // .sort('name', 'desc') // sorts by name, descending
      .where([`slug = bioshock-infinite`])
      .request('/games');
    
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
}

// let games = [];
// // Extract name, url, slug based on slug
// const getGamesFromSlugs = async (slug) => {
//   try {
//     const response = await apicalypse(requestOptions)
//       .fields(['name', 'url', 'slug'])
//       // .limit(2)
//       // .sort('name', 'desc') // sorts by name, descending
//       .where([`slug = ${slug}`])
//       .request('/games');
    
//     await games.push(response.data);
//   } catch (e) {
//     console.error(e);
//   }
// }

// const allGames = async (arr) => {
//   for await (let slug of arr) {
//     getGamesFromSlugs(slug);
//   }
//   console.log(games);
// }

// console.log(slugs);
// allGames(slugs);
getGames();
