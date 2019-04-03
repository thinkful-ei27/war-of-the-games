const chai = require("chai");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const { app } = require("../index");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");
const User = require("../models/user");
const Game = require("../models/game");
const History = require("../models/history");
const { games, histories, users } = require("../db/data");

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("ASYNC Capstone API - Users", () => {
  let user;
  let token;
  const username = "exampleUser";
  const password = "examplePass";
  const firstName = "Example";
  const lastName = "User";

  before(() => {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(() => {
    return Promise.all([
      User.insertMany(users),
      Game.insertMany(games),
      History.insertMany(histories),
      User.createIndexes(),
      Game.createIndexes()
    ]).then(([dbUsers]) => {
      [user] = dbUsers;
      token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    });
  });
  afterEach(() => {
    sandbox.restore();
    return dbDrop();
  });

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
        .then(dbUser => {
          expect(dbUser.id).to.equal(res.body.id);
          expect(dbUser.firstName).to.equal(firstName);
          expect(dbUser.lastName).to.equal(lastName);
          return dbUser.validatePassword(password);
        })
        .then(isValid => {
          expect(isValid).to.equal(true);
        });
    });
  });

  describe("GET /api/users/recommendations", () => {
    it("should return the correct number of recommendations", () => {
      return chai
        .request(app)
        .get(`/api/users/recommendations`)
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(5);
        });
    });

    it("should return recommendations with the correct fields", () => {
      return chai
        .request(app)
        .get(`/api/users/recommendations`)
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.be.an("object");
          expect(res.body[0]).to.include.all.keys(
            "id",
            "name",
            "igdb",
            "coverUrl",
            "createdAt",
            "updatedAt"
          );
        });
    });

    it("should catch errors and respond properly", () => {
      sandbox.stub(Game.schema.options.toJSON, "transform").throws("FakeError");

      return chai
        .request(app)
        .get("/api/games")
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });
});
