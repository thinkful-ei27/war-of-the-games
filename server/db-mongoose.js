const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const { DATABASE_URL } = require("./config");

function dbConnect(url = DATABASE_URL) {
  return mongoose
    .connect(url, { useNewUrlParser: true, useCreateIndex: true })
    .catch(err => {
      console.error("Mongoose failed to connect");
      console.error(err);
    });
}

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbDrop() {
  return mongoose.connection.db.dropDatabase();
}

function dbGet() {
  return mongoose;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbDrop,
  dbGet
};
