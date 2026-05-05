const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body || {};

  if (!username || !password) {
    return response.status(400).json({ error: "username or password missing" });
  }

  const user = await User.findOne({ username });

  const isPasswordCorrect =
    user && user.passwordHash
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
