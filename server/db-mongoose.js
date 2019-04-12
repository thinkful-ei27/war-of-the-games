const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require("./config");

function dbConnect(url = DATABASE_URL) {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .catch(err => {
      err.message = "Mongoose failed to connect";
      return err;
    });
}

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbDrop() {
  return mongoose.connection.db.dropDatabase();
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbDrop
};
