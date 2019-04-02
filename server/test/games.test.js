const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { dbConnect, dbDisconnect, dbDrop } = require("../db-mongoose");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");
const Game = require("../models/game");
const User = require("../models/user");
const { games, users } = require("../db/data");
const { app } = require("../index");
const igdbApi = require("../utils/gameApi");
const { getGameRes } = require("../db/test-data");

chai.use(chaiHttp);
const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("ASYNC Capstone API - Games", () => {
  let user = {};
  let token;

  before(() => {
    sinon.stub(igdbApi, "getGame").resolves(getGameRes);
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(() => {
    return Promise.all([
      User.insertMany(users),
      Game.insertMany(games),
      User.createIndexes(),
      Game.createIndexes()
    ]).then(([results]) => {
      [user] = results;
      token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    });
  });

  afterEach(() => {
    sandbox.restore();
    return dbDrop();
  });

  after(() => dbDisconnect());

  describe("IGDB Sinon Stubs", () => {
    it("should replace the getGame method", () => {
      return igdbApi.getGame(3480).then(res => {
        expect(res).to.be.an("object");
        expect(res).to.have.keys(
          "id",
          "cover",
          "name",
          "slug",
          "summary",
          "genres",
          "platforms",
          "similar_games"
        );
        expect(res.id).to.equal(getGameRes.id);
        expect(res.name).to.equal(getGameRes.name);
        expect(res.cover).to.equal(getGameRes.cover);
        expect(res.slug).to.equal(getGameRes.slug);
      });
    });
  });

  describe("GET /api/games", () => {
    it("should return the correct number of games", () => {
      return Promise.all([
        Game.find(),
        chai.request(app).get("/api/games")
      ]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.length(data.length);
      });
    });

    it("should return those games in the correct order and with the correct fields", () => {
      return Promise.all([
        Game.find().sort({ name: "asc" }),
        chai.request(app).get("/api/games")
      ]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.length(data.length);
        res.body.forEach((item, i) => {
          expect(item).to.be.a("object");
          expect(item).to.include.all.keys(
            "id",
            "name",
            "igdb",
            "coverUrl",
            "createdAt",
            "updatedAt"
          );
          expect(item.id).to.equal(data[i].id);
          expect(item.name).to.equal(data[i].name);
          expect(item.igdb).to.include.all.keys("id", "slug");
          expect(item.igdb.id).to.equal(data[i].igdb.id);
          expect(item.igdb.slug).to.equal(data[i].igdb.slug);
          expect(item.coverUrl).to.equal(data[i].coverUrl);
          expect(new Date(item.createdAt)).to.eql(data[i].createdAt);
          expect(new Date(item.updatedAt)).to.eql(data[i].updatedAt);
        });
      });
    });

    it("should return correct search results for a slug query", () => {
      const slug = "super-mario-64";

      const dbPromise = Game.find({ "igdb.slug": slug }).sort({ name: "asc" });
      const apiPromise = chai.request(app).get(`/api/games?slug=${slug}`);

      return Promise.all([dbPromise, apiPromise]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(data.length);
        res.body.forEach((game, i) => {
          expect(game).to.be.an("object");
          expect(game).to.include.all.keys(
            "id",
            "name",
            "igdb",
            "coverUrl",
            "createdAt",
            "updatedAt"
          );
          expect(game.id).to.equal(data[i].id);
          expect(game.name).to.equal(data[i].name);
          expect(new Date(game.createdAt)).to.eql(data[i].createdAt);
          expect(new Date(game.updatedAt)).to.eql(data[i].updatedAt);
        });
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

  describe("GET /api/games/:id", () => {
    it("should return the correct game", () => {
      let data;
      return Game.findOne()
        .then(_data => {
          data = _data;
          return chai.request(app).get(`/api/games/${data.id}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.include.all.keys(
            "id",
            "name",
            "createdAt",
            "updatedAt",
            "coverUrl",
            "genres",
            "igdb",
            "platforms",
            "summary",
            "similar_games"
          );
          expect(res.body.id).to.equal(data.id);
          expect(res.body.name).to.equal(data.name);
          expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
          expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
          expect(res.body.coverUrl).to.equal(data.coverUrl);
          expect(res.body.igdb).to.be.an("object");
          expect(res.body.igdb.id).to.equal(data.igdb.id);
          expect(res.body.igdb.slug).to.equal(data.igdb.slug);
          expect(res.body.genres).to.be.an("array");
          expect(res.body.genres.length).to.equal(data.genres.length);
          expect(res.body.platforms).to.be.an("array");
          expect(res.body.platforms.length).to.equal(data.platforms.length);
          expect(res.body.similar_games).to.be.an("array");
        });
    });

    it("should expand the similar games list with additional information", () => {
      return Game.findOne()
        .then(data => chai.request(app).get(`/api/games/${data.id}`))
        .then(res => {
          expect(res.body.similar_games).to.be.an("array");
          res.body.similar_games.forEach(game => {
            expect(game).to.be.an("object");
            expect(game).to.have.keys(
              "id",
              "name",
              "createdAt",
              "updatedAt",
              "coverUrl",
              "genres",
              "igdb",
              "platforms",
              "summary",
              "similar_games"
            );
            expect(game.igdb).to.have.keys("id", "slug");
          });
        });
    });

    it("should respond with status 400 and an error message when id is not valid", () => {
      return chai
        .request(app)
        .get("/api/games/NOT-A-VALID-ID")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The `id` is not valid");
        });
    });

    it("should respond with status 404 for an id that does not exist", () => {
      // The string "DOESNOTEXIST" is 12 bytes which is a valid Mongo ObjectId
      return chai
        .request(app)
        .get("/api/games/DOESNOTEXIST")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it("should catch errors and respond properly", () => {
      sandbox.stub(Game.schema.options.toJSON, "transform").throws("FakeError");
      return Game.findOne()
        .then(data => {
          return chai
            .request(app)
            .get(`/api/games/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("GET /api/games/battle", () => {
    it("should return two games", () => {
      return chai
        .request(app)
        .get("/api/games/battle")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.length(2);
        });
    });

    it("should return different games with the correct fields", () => {
      return chai
        .request(app)
        .get("/api/games/battle")
        .then(res => {
          expect(res.body).to.be.a("array");
          res.body.forEach(item => {
            expect(item).to.be.a("object");
            expect(item).to.include.all.keys(
              "id",
              "name",
              "createdAt",
              "updatedAt"
            );
          });
          expect(res.body[0].id).to.not.equal(res.body[1].id);
          expect(res.body[0].name).to.not.equal(res.body[1].name);
        });
    });

    it("should return different games each time it is called", () => {
      return Promise.all([
        chai.request(app).get("/api/games/battle"),
        chai.request(app).get("/api/games/battle"),
        chai.request(app).get("/api/games/battle")
      ]).then(([res1, res2, res3]) => {
        expect(res1.body).to.be.an("array");
        expect(res2.body).to.be.an("array");
        expect(res3.body).to.be.an("array");
        expect(
          res1.body[0].id === res2.body[0].id &&
            res2.body[0].id === res3.body[0].id
        ).to.equal(false);
        expect(
          res1.body[1].id === res2.body[1].id &&
            res2.body[1].id === res3.body[1].id
        ).to.equal(false);
      });
    });

    it("shold catch errors and respond properly", () => {
      sandbox.stub(Game.schema.options.toJSON, "transform").throws("FakeError");

      return chai
        .request(app)
        .get("/api/games/battle")
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("POST /api/games", () => {
    it("should create and return a new game when provided valid data", () => {
      const newGame = {
        igdbId: 3480
      };
      let res;
      return chai
        .request(app)
        .post("/api/games")
        .set("Authorization", `Bearer ${token}`)
        .send(newGame)
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res).to.have.header("location");
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.all.keys(
            "id",
            "name",
            "createdAt",
            "updatedAt",
            "igdb",
            "coverUrl",
            "summary",
            "genres",
            "platforms",
            "similar_games"
          );
          return Game.findOne({ _id: res.body.id });
        })
        .then(data => {
          expect(res.body.id).to.equal(data.id);
          expect(res.body.name).to.equal(data.name);
          expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
          expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
          expect(res.body.coverUrl).to.equal(data.coverUrl);
          expect(data.igdb.id).to.equal(newGame.igdbId);
          expect(data.igdb.slug).to.equal(res.body.igdb.slug);
          expect(data.summary).to.equal(res.body.summary);
          expect(data.genres).to.be.an("array");
          expect(data.genres.length).to.not.equal(0);
          expect(data.platforms).to.be.an("array");
          expect(data.platforms.length).to.not.equal(0);
          expect(data.similar_games).to.be.an("array");
          expect(data.similar_games.length).to.not.equal(0);
        });
    });

    it('should return an error when missing "igdbId" field', () => {
      const newGame = {};
      return chai
        .request(app)
        .post("/api/games")
        .set("Authorization", `Bearer ${token}`)
        .send(newGame)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Missing `igdbId` in request body");
        });
    });

    it('should return an error when "igdbId" is not a number', () => {
      const newGame = {
        igdbId: "not a number"
      };
      return chai
        .request(app)
        .post("/api/games")
        .set("Authorization", `Bearer ${token}`)
        .send(newGame)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("`igdbId` should be a number");
        });
    });

    it("should reject duplicate games", () => {
      return Game.create({
        name: getGameRes.name,
        igdb: {
          id: getGameRes.id,
          slug: getGameRes.slug
        },
        coverUrl: `https://images.igdb.com/igdb/image/upload/t_720p/${
          getGameRes.cover.image_id
        }.jpg`
      })
        .then(() => {
          const newGame = {
            igdbId: getGameRes.id
          };
          return chai
            .request(app)
            .post("/api/games")
            .set("Authorization", `Bearer ${token}`)
            .send(newGame);
        })
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal("ValidationError");
          expect(res.body.message).to.equal("Game already exists");
          expect(res.body.location).to.equal("igdbId");
        });
    });

    it("should catch errors and respond properly", () => {
      sandbox.stub(Game.schema.options.toJSON, "transform").throws("FakeError");

      const newGame = {
        igdbId: getGameRes.id
      };

      return chai
        .request(app)
        .post("/api/games")
        .set("Authorization", `Bearer ${token}`)
        .send(newGame)
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("PUT /api/games/:id", () => {
    it("should update the game when provided a valid igdbId", () => {
      let game;
      return Game.findById("5c9a959ba5d0dd09e07f45a8")
        .then(_game => {
          game = _game;
          expect(game).to.not.have.keys(
            "summary",
            "genres",
            "platforms",
            "similar_games"
          );
          const updateItem = {
            igdbId: game.igdb.id
          };
          return chai
            .request(app)
            .put(`/api/games/${game.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateItem);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.all.keys(
            "id",
            "name",
            "createdAt",
            "updatedAt",
            "igdb",
            "coverUrl",
            "summary",
            "genres",
            "platforms",
            "similar_games"
          );
          expect(res.body.id).to.equal(game.id);
          expect(new Date(res.body.createdAt)).to.eql(game.createdAt);
          // expect game to have been updated
          expect(new Date(res.body.updatedAt)).to.greaterThan(game.updatedAt);
          expect(res.body.summary).to.be.a("string");
          expect(res.body.genres).to.be.an("array");
          expect(res.body.genres.length).to.not.equal(0);
          expect(res.body.platforms).to.be.an("array");
          expect(res.body.platforms.length).to.not.equal(0);
          expect(res.body.similar_games).to.be.an("array");
          expect(res.body.similar_games.length).to.not.equal(0);
        });
    });

    it("should respond with status 400 and an error message when id is not valid", () => {
      return Game.findById("5c9a959ba5d0dd09e07f45a8")
        .then(game => {
          const updateItem = {
            igdbId: game.igdb.id
          };
          return chai
            .request(app)
            .put("/api/games/NOT-A-VALID-ID")
            .set("Authorization", `Bearer ${token}`)
            .send(updateItem);
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The `id` is not valid");
        });
    });

    it("should respond with a 404 for an id that does not exist", () => {
      return Game.findById("5c9a959ba5d0dd09e07f45a8")
        .then(game => {
          const updateItem = {
            igdbId: game.igdb.id
          };
          // The string "DOESNOTEXIST" is 12 bytes which is a valid Mongo ObjectId
          return chai
            .request(app)
            .put("/api/games/DOESNOTEXIST")
            .set("Authorization", `Bearer ${token}`)
            .send(updateItem);
        })
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it("should return an error when missing igdbId field", () => {
      const newGame = {};
      return Game.findById("5c9a959ba5d0dd09e07f45a8")
        .then(game => {
          return chai
            .request(app)
            .put(`/api/games/${game.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(newGame);
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Missing `igdbId` in request body");
        });
    });

    it("should return an error when igdbId is not a number", () => {
      const newGame = {
        igdbId: "not a number"
      };
      return Game.findById("5c9a959ba5d0dd09e07f45a8")
        .then(game => {
          return chai
            .request(app)
            .put(`/api/games/${game.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(newGame);
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("`igdbId` should be a number");
        });
    });

    it("should catch errors and respond properly", () => {
      sandbox.stub(Game.schema.options.toJSON, "transform").throws("FakeError");

      return Game.findById("5c9a959ba5d0dd09e07f45a8")
        .then(game => {
          const updateItem = {
            igdbId: game.igdb.id
          };
          return chai
            .request(app)
            .put(`/api/games/${game.id}`)
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
});
