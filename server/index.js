const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const swaggerSpec = require("./utils/swagger");
const localStrategy = require("./passport/local");
const jwtStrategy = require("./passport/jwt");

const { PORT, CLIENT_ORIGIN } = require("./config");
const { dbConnect } = require("./db-mongoose");
// const {dbConnect} = require('./db-knex');

// Routers
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const historyRouter = require("./routes/history");
const gamesRouter = require("./routes/games");

const app = express();

app.use(
  morgan(process.env.NODE_ENV === "production" ? "common" : "dev", {
    skip: (req, res) => process.env.NODE_ENV === "test"
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// API documentation
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Parse request body
app.use(express.json());

// Configure passport to utilize strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

// Mount routers
app.use("/api/users", usersRouter);
app.use("/api/history", historyRouter);
app.use("/api/games", gamesRouter);
app.use("/api", authRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on("error", err => {
      console.error("Express failed to start");
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
