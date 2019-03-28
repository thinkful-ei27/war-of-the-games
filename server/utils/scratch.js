'use strict';
const { 
  IGDB_KEY1, 
  IGDB_KEY2, 
  IGDB_KEY3, 
  IGDB_KEY4, 
  IGDB_KEY5 
} = require('../config');

const igdbApi = require('../utils/gameApi');

igdbApi
  .getGame(1074)
  .then(response => {
    console.log(response);
  });