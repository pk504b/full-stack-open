const { describe, test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();

  const blogsWithUser = helper.initialBlogs.map((blog) => ({
    ...blog,
    user: user.id,
  }));

  await Blog.insertMany(blogsWithUser);

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser", password: "password123" });

  token = loginResponse.body.token;
});

describe("GET /api/blogs", () => {
  test("returns data in json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns all blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("a specific is within the response", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body[0];
    assert.strictEqual(firstBlog.title, helper.initialBlogs[0].title);
  });

  test("return id property", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body[0];
    assert.strictEqual(firstBlog.hasOwnProperty("id"), true);
  });
});

describe("POST /api/blogs", () => {
  test("adds a valid blog", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "https://new-blog.com/",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    assert(blogsAtEnd.map((blog) => blog.title).includes(newBlog.title));
  });

  test("likes default to zero", async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "https://new-blog.com/",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedBlog = response.body;
    assert.strictEqual(savedBlog.likes, 0);
  });

  test("returns 400 if title or url missing", async () => {
    const newBlog = {
      author: "New author",
      url: "https://new-blog.com/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("deletes a blog", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const blogsAfterDelete = await helper.blogsInDB();
    assert(!blogsAfterDelete.map((blog) => blog._id).includes(blogToDelete.id));
    assert.strictEqual(blogsAfterDelete.length, blogsAtStart.length - 1);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("updates a blog", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: 32 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, updatedBlog.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
