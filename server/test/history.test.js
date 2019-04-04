/* eslint-disable func-names */

const chai = require("chai");
const chaiHttp = require("chai-http");
const express = require("express");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { app } = require("../index");

const { TEST_DATABASE_URL, JWT_SECRET } = require("../config");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");

const { games, histories, users } = require("../db/data");
const User = require("../models/user");
const Game = require("../models/game");
const History = require("../models/history");

const { expect } = chai;
chai.use(chaiHttp);
const sandbox = sinon.createSandbox();

describe("ASYNC Capstone API - History)", function() {
  let user = {};
  let token;

  before(function() {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return Promise.all([
      User.insertMany(users),
      Game.insertMany(games),
      History.insertMany(histories),
      User.createIndexes(),
      Game.createIndexes(),
      History.createIndexes()
    ]).then(([results]) => {
      [user] = results;
      token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    });
  });

  afterEach(function() {
    sandbox.restore();
    return dbDrop();
  });

  after(function() {
    return dbDisconnect();
  });

  describe("GET /api/history", function() {
    it("should return the correct number of items", function() {
      return Promise.all([
        History.find(),
        chai
          .request(app)
          .get("/api/history")
          .set("Authorization", `Bearer ${token}`)
      ]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.length(data.length);
      });
    });

    it("should catch errors and respond properly", function() {
      sandbox
        .stub(History.schema.options.toJSON, "transform")
        .throws("FakeError");

      return chai
        .request(app)
        .get("/api/history")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("GET /api/history/all", function() {
    it("should return the correct number of items", function() {
      return Promise.all([
        Game.find(),
        chai
          .request(app)
          .get("/api/history/all")
          .set("Authorization", `Bearer ${token}`)
      ]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(data.length);
        res.body.forEach(game => {
          expect(game).to.have.keys(
            "id",
            "totalGamesPlayed",
            "totalGamesWon",
            "percentage"
          );
        });
      });
    });
  });

  describe("GET /api/history/:id", function() {
    it("should return correct history", function() {
      let data;
      return History.findOne()
        .then(_data => {
          data = _data;
          return chai
            .request(app)
            .get(`/api/history/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.keys(
            "id",
            "gameOne",
            "gameTwo",
            "updatedAt",
            "createdAt",
            "choice",
            "userId"
          );
          expect(res.body.id).to.equal(data.id);
          expect(res.body.name).to.equal(data.name);
          expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
          expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
        });
    });

    it("should respond with a 400 for an invalid id", function() {
      return chai
        .request(app)
        .get("/api/history/NOT-A-VALID-ID")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The `id` is not valid");
        });
    });

    it("should respond with a 404 for an id that does not exist", function() {
      // The string "DOESNOTEXIST" is 12 bytes which is a valid Mongo ObjectId
      return chai
        .request(app)
        .get("/api/history/DOESNOTEXIST")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it("should catch errors and respond properly", function() {
      sandbox
        .stub(History.schema.options.toJSON, "transform")
        .throws("FakeError");

      return History.findOne()
        .then(data => {
          return chai
            .request(app)
            .get(`/api/history/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("GET /api/history/:id/results", function() {
    it("should return the stats for an individual game", function() {
      let game;
      return Game.findById("5c9a959ba5d0dd09e07f45a6")
        .then(_game => {
          game = _game;
          return chai.request(app).get(`/api/history/${game.id}/results`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body).to.have.keys(
            "percentage",
            "wonGames",
            "totalGames",
            "name",
            "cloudImage"
          );
          expect(res.body.name).to.equal(game.name);
          expect(res.body.percentage).to.be.a("number");
          expect(res.body.wonGames).to.be.a("number");
          expect(res.body.totalGames).to.be.a("number");
        });
    });
  });

  describe("POST /api/history/", function() {
    it("should create and return a new item when provided valid data", function() {
      const newItem = {
        gameOne: "5c9a959ba5d0dd09e07f45a4",
        gameTwo: "5c9a959ba5d0dd09e07f45a3",
        choice: "5c9a959ba5d0dd09e07f45a3",
        userId: "333333333333333333333300"
      };
      let res;
      return User.findOne({ _id: newItem.userId })
        .then(_user => {
          user = _user;
        })
        .then(() => {
          return chai
            .request(app)
            .post("/api/history")
            .set("Authorization", `Bearer ${token}`)
            .send(newItem)
            .then(function(_res) {
              res = _res;
              expect(res).to.have.status(201);
              expect(res).to.have.header("location");
              expect(res.body).to.be.a("object");
              expect(res.body).to.have.keys(
                "id",
                "gameOne",
                "gameTwo",
                "updatedAt",
                "createdAt",
                "choice",
                "userId"
              );
              return History.findOne({ _id: res.body.id });
            })
            .then(data => {
              expect(res.body.id).to.equal(data.id);
              expect(res.body.name).to.equal(data.name);
              expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
              expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
            });
        });
    });

    it.only("should add one to the battle property of the current user", function() {
      const newItem = {
        gameOne: "5c9a959ba5d0dd09e07f45a4",
        gameTwo: "5c9a959ba5d0dd09e07f45a3",
        choice: "5c9a959ba5d0dd09e07f45a3"
      };
      return chai
        .request(app)
        .post("/api/history")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem)
        .then(function(res) {
          expect(res).to.have.status(201);
          return User.findOne({ _id: user.id });
        })
        .then(dbUser => {
          expect(dbUser.id).to.equal(user.id);
          console.log(dbUser);
          expect(dbUser.battles).to.equal(user.battles + 1);
        });
    });

    it("should return an error when missing fields", function() {
      const newItem = {};
      return chai
        .request(app)
        .post("/api/history")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Missing field in request body");
        });
    });

    it("should catch errors and respond properly", function() {
      sandbox
        .stub(History.schema.options.toJSON, "transform")
        .throws("FakeError");

      const newItem = {
        gameOne: "5c9bbb7800c67230ce67a5bf",
        gameTwo: "5c9bc34d00c67230ce67a5c0",
        choice: "5c9bc34d00c67230ce67a5c0",
        userId: "333333333333333333333300"
      };
      return chai
        .request(app)
        .post("/api/history")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem)
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("PUT /api/history/:id", function() {
    it("should update the item", function() {
      let data;
      return History.findOne()
        .then(_data => {
          data = _data;
          const { gameOne, gameTwo, choice } = data;
          const updateItem = {
            gameOne,
            gameTwo,
            choice
          };
          return chai
            .request(app)
            .put(`/api/history/${data.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateItem);
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.keys(
            "id",
            "gameOne",
            "gameTwo",
            "updatedAt",
            "createdAt",
            "choice",
            "userId"
          );
          expect(res.body.id).to.equal(data.id);
          expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
          // expect item to have been updated
          expect(new Date(res.body.updatedAt)).to.greaterThan(data.updatedAt);
        });
    });

    it("should respond with a 400 for an invalid id", function() {
      const updateItem = {
        gameOne: "Metal Gear Solid",
        gameTwo: "World of Warcraft",
        choice: "World of Warcraft"
      };
      return chai
        .request(app)
        .put("/api/history/NOT-A-VALID-ID")
        .set("Authorization", `Bearer ${token}`)
        .send(updateItem)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The `id` is not valid");
        });
    });

    it("should respond with a 404 for an id that does not exist", function() {
      const updateItem = {
        gameOne: "Metal Gear Solid",
        gameTwo: "World of Warcraft",
        choice: "World of Warcraft"
      };
      // The string "DOESNOTEXIST" is 12 bytes which is a valid Mongo ObjectId
      return chai
        .request(app)
        .put("/api/history/DOESNOTEXIST")
        .set("Authorization", `Bearer ${token}`)
        .send(updateItem)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it("should catch errors and respond properly", function() {
      sandbox
        .stub(History.schema.options.toJSON, "transform")
        .throws("FakeError");

      return History.findOne()
        .then(data => {
          const { gameOne, gameTwo, choice } = data;
          const updateItem = {
            gameOne,
            gameTwo,
            choice
          };
          return chai
            .request(app)
            .put(`/api/history/${data.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateItem);
        })
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("DELETE /api/namespace/:id", function() {
    it("should delete an existing tag and respond with 204", function() {
      let data;
      return History.findOne()
        .then(_data => {
          data = _data;
          return chai
            .request(app)
            .delete(`/api/history/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return History.countDocuments({ _id: data.id });
        })
        .then(count => {
          expect(count).to.equal(0);
        });
    });

    it("should respond with a 400 for an invalid id", function() {
      return chai
        .request(app)
        .delete("/api/history/NOT-A-VALID-ID")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The `id` is not valid");
        });
    });

    it("should catch errors and respond properly", function() {
      sandbox.stub(express.response, "sendStatus").throws("FakeError");
      return History.findOne()
        .then(data => {
          return chai
            .request(app)
            .delete(`/api/history/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });
});
