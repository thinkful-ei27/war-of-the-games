/* eslint-disable strict */

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'mongodb://dev:password123@ds123196.mlab.com:23196/final-capstone-dev',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'mongodb://dev:password123@ds223756.mlab.com:23756/final-capstone-test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  IGDB_KEY1: process.env.IGDB_KEY1,
  IGDB_KEY2: process.env.IGDB_KEY2,
  IGDB_KEY3: process.env.IGDB_KEY3,
  IGDB_KEY4: process.env.IGDB_KEY4,
  IGDB_KEY5: process.env.IGDB_KEY5,
};
