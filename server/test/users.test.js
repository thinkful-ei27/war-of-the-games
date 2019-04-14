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
const recommendations = require("../utils/recommendations");
const { recsRes, wishListRes } = require("../db/test-data");
const igdbApi = require("../utils/gameApi");

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
    sinon.stub(recommendations, "getGamesBySubmotivations").resolves(recsRes);
    sinon.stub(igdbApi, "getGamesByIds").resolves(wishListRes);
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
            "admin",
            "username",
            "firstName",
            "lastName",
            "historyCount",
            "createdAt",
            "updatedAt",
            "xpToNextLevel",
            "level",
            "wishList"
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

  describe("GET /api/users", () => {
    it("should return the correct user for a username query", () => {
      const usernameQuery = "bobuser";

      const dbPromise = User.findOne({ username: usernameQuery });
      const apiPromise = chai
        .request(app)
        .get(`/api/users?username=${usernameQuery}`);

      return Promise.all([dbPromise, apiPromise]).then(([data, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.include.all.keys(
          "id",
          "createdAt",
          "updatedAt",
          "firstName",
          "lastName",
          "username",
          "aboutMe",
          "admin",
          "profilePic",
          "wishList",
          "historyCount",
          "level",
          "xpToNextLevel"
        );
        expect(res.body.id).to.equal(data.id);
        expect(res.body.username).to.equal(usernameQuery);
        expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
        expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
        expect(res.body.wishList.length).to.equal(data.wishList.length);
      });
    });

    it("should reject requests without a username query", () => {
      return chai
        .request(app)
        .get("/api/users")
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Unauthorized");
        });
    });

    it("should catch errors and respond properly");
  });

  describe("GET /api/users/:id/history", () => {
    it("should return the correct number of histories", () => {
      return Promise.all([
        History.find({ userId: user.id }),
        chai.request(app).get(`/api/users/${user.id}/history`)
      ]).then(([hist, res]) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(6 || hist.length);
      });
    });

    it("should catch errors and respond properly", () => {
      sandbox
        .stub(History.schema.options.toJSON, "transform")
        .throws("FakeError");

      return chai
        .request(app)
        .get(`/api/users/${user.id}/history`)
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("GET /api/users/:id/topHistory", () => {
    it("should return the correct number of games", function() {
      return chai
        .request(app)
        .get(`/api/users/${user.id}/topHistory`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(6);
        });
    });
  });

  describe("POST /api/users/recs", () => {
    it("should return recommendations with the correct fields", () => {
      const recSettings = {
        motivations: ["story"],
        dateNumber: 1,
        timeFrame: "Years",
        platforms: [{ label: "PS4", id: 48, checked: true }]
      };
      return chai
        .request(app)
        .post("/api/users/recs")
        .set("Authorization", `Bearer ${token}`)
        .send(recSettings)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.be.an("object");
          expect(res.body[0]).to.include.all.keys(
            "id",
            "name",
            "cover",
            "first_release_date",
            "summary",
            "slug",
            "popularity"
          );
        });
    });
  });

  describe("GET /api/users/recommendations", () => {
    it("should return recommendations with the correct fields", () => {
      return chai
        .request(app)
        .get(`/api/users/recommendations`)
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
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

  describe("PUT /api/users/excludedgames", () => {
    it("should add an excluded game to a users collection", function() {
      const excludedId = 123;
      return chai
        .request(app)
        .put("/api/users/excludedgames")
        .set("Authorization", `Bearer ${token}`)
        .send({ excludedId })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.all.keys(
            "id",
            "username",
            "firstName",
            "lastName",
            "admin",
            "historyCount"
          );
          expect(res).to.be.json;
        });
    });

    it("should throw an error when excludedId is not a number", () => {
      const excludedId = "french fries";
      return chai
        .request(app)
        .put("/api/users/excludedgames")
        .set("Authorization", `Bearer ${token}`)
        .send({ excludedId })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("The id is not valid");
        });
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update the neverPlayed property when provided a valid game ID", () => {
      return Game.findOne()
        .then(game => {
          const updateObj = {
            neverPlayed: game.id
          };
          return chai
            .request(app)
            .put(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateObj);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.keys(
            "id",
            "createdAt",
            "updatedAt",
            "games"
          );
          expect(res.body.id).to.equal(user.id);
          expect(new Date(res.body.createdAt)).to.eql(user.createdAt);
          // expect game to have been updated
          expect(new Date(res.body.updatedAt)).to.greaterThan(user.updatedAt);
          expect(res.body.games.neverPlayed).to.be.an("array");
          expect(res.body.games.neverPlayed.length).to.be.greaterThan(0);
        });
    });

    it("should respond with status 400 and an error message when id is not valid", () => {
      return Game.findOne()
        .then(game => {
          const updateObj = {
            neverPlayed: game.id
          };
          return chai
            .request(app)
            .put("/api/users/NOT-A-VALID-ID")
            .set("Authorization", `Bearer ${token}`)
            .send(updateObj);
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The `id` is not valid");
        });
    });

    it("should respond with a 404 for an id that does not exist", () => {
      return Game.findOne()
        .then(game => {
          const updateObj = {
            neverPlayed: game.id
          };
          // The string "DOESNOTEXIST" is 12 bytes which is a valid Mongo ObjectId
          return chai
            .request(app)
            .put("/api/users/DOESNOTEXIST")
            .set("Authorization", `Bearer ${token}`)
            .send(updateObj);
        })
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it("should respond with status 400 and an error message when game ID is not valid", () => {
      const updateObj = {
        neverPlayed: "NOT-A-VALID-ID"
      };
      return chai
        .request(app)
        .put(`/api/users/${user.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateObj)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The game ID is not valid");
        });
    });

    it("should catch errors and respond properly", () => {
      sandbox.stub(User, "findOneAndUpdate").returns(new Error("FakeError"));

      return Game.findOne()
        .then(game => {
          const updateObj = {
            neverPlayed: game.id
          };
          return chai
            .request(app)
            .put(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateObj);
        })
        .then(res => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Internal Server Error");
        });
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return the correct user", () => {
      let data;
      return User.findOne()
        .then(_data => {
          data = _data;
          return chai.request(app).get(`/api/users/${data.id}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.include.all.keys(
            "id",
            "createdAt",
            "updatedAt",
            "firstName",
            "lastName",
            "username",
            "aboutMe",
            "admin",
            "profilePic",
            "wishList",
            "historyCount",
            "level",
            "xpToNextLevel"
          );
          expect(res.body.id).to.equal(data.id);
          expect(res.body.firstName).to.equal(data.firstName);
          expect(res.body.lastName).to.equal(data.lastName);
          expect(res.body.username).to.equal(data.username);
          expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
          expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
          expect(res.body.aboutMe).to.equal(data.aboutMe);
          expect(res.body.admin).to.equal(data.admin);
          expect(res.body.profilePic).to.equal(data.profilePic);
          expect(res.body.wishList).to.be.an("array");
          expect(res.body.wishList.length).to.equal(data.wishList.length);
          expect(res.body.wishList[0]).to.equal(data.wishList[0]);
        });
    });

    it("should return an array of wishList games when the wishList field query is provided", () => {
      const field = "wishList";
      let data;
      return User.findOne()
        .then(_data => {
          data = _data;
          return chai.request(app).get(`/api/users/${data.id}?field=${field}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(data.wishList.length);
        });
    });

    it("should respond with status 400 and an error message when id is not valid", () => {
      return chai
        .request(app)
        .get("/api/users/NOT-A-VALID-ID")
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
        .get("/api/users/DOESNOTEXIST")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it("should catch errors and respond properly", () => {
      sandbox.stub(User.schema.options.toJSON, "transform").throws("FakeError");
      return User.findOne()
        .then(data => {
          return chai
            .request(app)
            .get(`/api/users/${data.id}`)
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
