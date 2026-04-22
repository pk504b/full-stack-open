const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('returns data in json format', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('a specific is within the response', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert.strictEqual(firstBlog.title, initialBlogs[0].title)
  })

  test('return id property', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert.strictEqual(firstBlog.hasOwnProperty('id'), true)
  })
})

describe('POST /api/blogs', () => {
  test('adds a valid blog', async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "https://new-blog.com/",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual(blogs.length, initialBlogs.length + 1)
    assert(blogs.map(blog => blog.title).includes(newBlog.title))
  })

  test('likes default to zero', async () => {
    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "https://new-blog.com/",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const savedBlog = response.body
    assert.strictEqual(savedBlog.likes, 0)
  })

  test('returns 400 if title or url missing', async () => {
    const newBlog = {
      author: "New author",
      url: "https://new-blog.com/",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})