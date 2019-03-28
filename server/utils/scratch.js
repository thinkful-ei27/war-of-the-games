'use strict';
const igdbApi = require('../utils/gameApi');

igdbApi
  .getAllBySlug(1074)
  .then(response => {
    console.log(response);
  });