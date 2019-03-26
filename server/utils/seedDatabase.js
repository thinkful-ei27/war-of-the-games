'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');

const User = require('../models/user');
const { users } = require('../db/data');

const History = require('../models/history');
const { histories } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex : true })
  .then(() => {
    console.info('Deleting Data...');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Creating Indexes');
    return Promise.all([
      User.ensureIndexes(),
      History.ensureIndexes(),
    ]);
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      User.insertMany(users),
      History.insertMany(histories),
    ]);
  })
  .then(results => {
    console.log(`Inserted results with no errors, ${results}`);
    console.info('Disconnecting...');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
