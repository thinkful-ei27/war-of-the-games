const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config");

const router = express.Router();

const options = { session: false, failWithError: true };
const localAuth = passport.authenticate("local", options);

function createAuthToken(user) {
  const { id, username, admin } = user;
  const userInfo = { id, username, admin };
  return jwt.sign({ user: userInfo }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

/**
 * @swagger
 *
 * /login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Logs the user in
 *    requestBody:
 *      description: Authentication object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 *    responses:
 *      200:
 *        description: Authentication token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                authToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWM5YmNmNDhiMTFmOGYxNGM2ZTE3NzM5IiwidXNlcm5hbWUiOiJkZXJlayIsImFkbWluIjp0cnVlfSwiaWF0IjoxNTU3NTA4MTg4LCJleHAiOjE1NTgxMTI5ODgsInN1YiI6ImRlcmVrIn0.bfZqg7mIFjFjKaJl2jp-UorMneTWT6h-Bi81vfTwUQA
 *      500:
 *        description: Login error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  format: int32
 *                  example: 500
 *                reason:
 *                  type: string
 *                  example: LoginError
 *                message:
 *                  type: string
 *                  example: Incorrect password
 *                location:
 *                  type: string
 *                  example: password
 */
router.post("/login", localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

/**
 * @swagger
 *
 * /refresh:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Refreshes the authentication token
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: Authentication token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                authToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWM5YmNmNDhiMTFmOGYxNGM2ZTE3NzM5IiwidXNlcm5hbWUiOiJkZXJlayIsImFkbWluIjp0cnVlfSwiaWF0IjoxNTU3NTA4MTg4LCJleHAiOjE1NTgxMTI5ODgsInN1YiI6ImRlcmVrIn0.bfZqg7mIFjFjKaJl2jp-UorMneTWT6h-Bi81vfTwUQA
 *      401:
 *        description: Unauthorized error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: int
 *                  format: int32
 *                  example: 401
 *                message:
 *                  type: string
 *                  example: Unauthorized
 */
router.post("/refresh", jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;
