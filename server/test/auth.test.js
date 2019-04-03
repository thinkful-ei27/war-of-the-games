const chai = require("chai");
const jwt = require("jsonwebtoken");
const { app } = require("../index");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");
const { TEST_DATABASE_URL, JWT_SECRET } = require("../config");
const User = require("../models/user");

const { expect } = chai;

describe("ASYNC Capstone API - Auth", () => {
  const id = "333333333333333333333333";
  const firstName = "Example";
  const lastName = "User";
  const username = "exampleUser";
  const password = "examplePass";

  before(() => dbConnect(TEST_DATABASE_URL));

  beforeEach(() =>
    User.hashPassword(password).then(digest =>
      User.create({
        _id: id,
        firstName,
        lastName,
        username,
        password: digest
      })
    )
  );

  afterEach(() => dbDrop());

  after(() => dbDisconnect());

  describe("POST /api/login", () => {
    it("should return a valid auth token", () =>
      chai
        .request(app)
        .post("/api/login")
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.authToken).to.be.a("string");

          const payload = jwt.verify(res.body.authToken, JWT_SECRET);

          expect(payload.user).to.not.have.property("password");
          expect(payload.user.id).to.equal(id);
          expect(payload.user.username).to.deep.equal(username.toLowerCase());
        }));

    it("should reject requests without credentials", () =>
      chai
        .request(app)
        .post("/api/login")
        .send({})
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Bad Request");
        }));

    it("should reject requests with empty string username", () =>
      chai
        .request(app)
        .post("/api/login")
        .send({ username: "", password })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Bad Request");
        }));

    it("should reject requests with empty string password", () =>
      chai
        .request(app)
        .post("/api/login")
        .send({ username, password: "" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Bad Request");
        }));

    it("should reject requests with incorrect username", () =>
      chai
        .request(app)
        .post("/api/login")
        .send({ username: "wrongUsername", password: "password" })
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Unauthorized");
        }));
  });
});
