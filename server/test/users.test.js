const chai = require("chai");
const { app } = require("../index");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");
const { TEST_DATABASE_URL } = require("../config");
const User = require("../models/user");

const { expect } = chai;

describe("ASYNC Capstone API - Users", () => {
  const username = "exampleUser";
  const password = "examplePass";
  const firstName = "Example";
  const lastName = "User";

  before(() => {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(() => {});
  afterEach(() => dbDrop());

  after(() => {
    return dbDisconnect();
  });

  describe("POST /api/users", () => {
    it("should create a new user with lowercase username", () => {
      let res;
      return chai
        .request(app)
        .post("/api/users")
        .send({ username, password, firstName, lastName })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.keys(
            "id",
            "username",
            "firstName",
            "lastName",
            "history"
          );
          expect(res.body.username).to.equal(username.toLowerCase());
          expect(res.body.firstName).to.equal(firstName);
          expect(res.body.lastName).to.equal(lastName);
          return User.findOne({ username });
        })
        .then(user => {
          expect(user.id).to.equal(res.body.id);
          expect(user.firstName).to.equal(firstName);
          expect(user.lastName).to.equal(lastName);
          return user.validatePassword(password);
        })
        .then(isValid => {
          expect(isValid).to.equal(true);
        });
    });
  });

  describe("GET /api/users/:id/recommendations", () => {
    it("should return the correct number of recommendations");

    it(
      "should return recommendations in the correct order and with the correct fields"
    );

    it("should catch errors and respond properly");
  });
});
