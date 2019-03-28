const chai = require("chai");
const { app } = require("../index");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");
const { TEST_DATABASE_URL, JWT_SECRET } = require("../config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const expect = chai.expect;

describe("ASYNC Capstone API - Auth", function() {
  const _id = "333333333333333333333333";
  const firstName = "Example";
  const lastName = "User";
  const username = "exampleUser";
  const password = "examplePass";

  before(() => dbConnect(TEST_DATABASE_URL));

  beforeEach(() =>
    User.hashPassword(password).then(digest =>
      User.create({ _id, firstName, lastName, username, password: digest })
    )
  );

  afterEach(() => dbDrop());

  after(() => dbDisconnect());

  describe("POST /api/login", function() {
    it("should return a valid auth token", function() {
      return chai
        .request(app)
        .post("/api/login")
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.authToken).to.be.a("string");

          const payload = jwt.verify(res.body.authToken, JWT_SECRET);

          expect(payload.user).to.not.have.property("password");
          expect(payload.user.id).to.equal(_id);
          expect(payload.user.username).to.deep.equal(username.toLowerCase());
        });
    });
  });
});
