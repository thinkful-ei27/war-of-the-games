const chai = require("chai");
const chaiHttp = require("chai-http");

const { TEST_DATABASE_URL } = require("../config");
const { dbConnect, dbDisconnect } = require("../db-mongoose");
// const {dbConnect, dbDisconnect} = require('../db-knex');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = "test";

// Clear the console before each run
process.stdout.write("\x1Bc\n");

const { expect } = chai;
chai.use(chaiHttp);

describe("Mocha and Chai", function() {
  before(function() {
    return dbConnect(TEST_DATABASE_URL);
  });

  after(function() {
    return dbDisconnect();
  });
  it("should be properly setup", function() {
    expect(true).to.be.true;
  });
});

describe("Mongoose", function() {
  it("should catch errors", function() {
    dbConnect("")
      .then(res => {
        expect(res).to.throw();
        expect(res.name).to.equal("MongoParseError");
      })
      .catch(err => {
        expect(err).to.be.an("object");
      });
  });
});
