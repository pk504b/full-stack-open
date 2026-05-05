const { describe, test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = await Promise.all(
    helper.initialUsers.map(async (user) => {
      const passwordHash = await bcrypt.hash(user.password, 10);
      return { ...user, passwordHash };
    }),
  );
  await User.insertMany(userObjects);
});

describe("login endpoint", () => {
  test("returns a token", async () => {
    const loginUser = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    };

    const response = await api.post("/api/login").send(loginUser).expect(200);

    // assert.strictEqual(response.body.token.length, 130)
  });

  test("returns a 401 if username or password is invalid", async () => {
    const loginUser = {
      username: "invalid-user",
      password: "invalid-password",
    };

    const response = await api
      .post("/api/login")
      .send(loginUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "invalid username or password");
  });
});

describe("user creation api", () => {
  test("username must 3 chars long", async () => {
    const newUser = {
      username: "hi",
      name: "New User",
      password: "password",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "invalid input");
  });

  test("username must be unique", async () => {
    const newUser = helper.initialUsers[0];

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "username already exists");
  });

  test("password must be at least 3 characters", async () => {
    const newUser = {
      username: "new-user",
      name: "New User",
      password: "pw",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(
      response.body.error,
      "password must be at least 3 characters",
    );
  });

  test("username and password are required", async () => {
    const newUser = {
      name: "New User",
      password: "pass",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "username or password missing");
  });

  test("create a user on valid input", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "new-user",
      name: "New User",
      password: "password",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    assert(usersAtEnd.map((user) => user.username).includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
