const chai = require("chai");
const chaiHttp = require("chai-http");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");
const { TEST_DATABASE_URL } = require("../config");
const Game = require("../models/game");
const { games } = require("../db/data");
const { app } = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("ASYNC Capstone API - Games", function() {
  before(() => dbConnect(TEST_DATABASE_URL));
  beforeEach(() => Game.insertMany(games));
  afterEach(() => dbDrop());
  after(() => dbDisconnect());
  describe.only("GET /api/games", function() {
    it("should return the correct number of games", function() {
      return Promise.all([
        Game.find(),
        chai.request(app).get("/api/games")
      ]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.length(data.length);
      });
    });

    it("should return those games in the correct order and with the correct fields", function() {
      return Promise.all([
        Game.find().sort({ name: "asc" }),
        chai.request(app).get("/api/games")
      ]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.length(data.length);
        res.body.forEach(function(item, i) {
          expect(item).to.be.a("object");
          // Note: folderId, tags and content are optional
          expect(item).to.include.all.keys(
            "id",
            "name",
            "createdAt",
            "updatedAt"
          );
          expect(item.id).to.equal(data[i].id);
          expect(item.name).to.equal(data[i].name);
          expect(new Date(item.createdAt)).to.eql(data[i].createdAt);
          expect(new Date(item.updatedAt)).to.eql(data[i].updatedAt);
        });
      });
    });

    it("should return correct search results for a searchTerm query");
    it("should return the correct results for any filters applied");
    it("should return an empty array for an incorrect query");
    it("should catch errors and respond properly");
  });
  describe("GET /api/games/:id", function() {
    it("should return the correct game");
    it(
      "should respond with status 400 and an error message when 'id' is not valid"
    );
    it("should repsond with status 404 for an id that does not exist");
    it("should catch errors and respond properly");
  });
  describe("POST /api/games/", function() {
    it("should create and return a new game when provided valid data");
    it("should return an error when required fields are missing");
    it("should return an error when required fields are empty");
    it("should return an error when fields are given the wrong type of data");
    it(
      "should return an error when any other required validations are not met"
    );
    it("should catch errors and respond properly");
  });
  describe("PUT /api/games/:id", function() {
    it("should update the game when provided with valid data");
    it(
      "should respond with status 400 and an error message when 'id' is not valid"
    );
    it("should respond with status 404 for an id that does not exist");
    it("should return an error when required fields are empty");
    it("should return an error when fields are given the wrong type of data");
    it(
      "should return an error when any other required validations are not met"
    );
    it("should catch errors and respond properly");
  });
  describe("DELETE /api/games/:id", function() {
    it("should delete an existing game and respond with status 204");
    it(
      "should respond with status 400 and an error message when 'id' is not valid"
    );
    it("should catch errors and respond properly");
  });
});
