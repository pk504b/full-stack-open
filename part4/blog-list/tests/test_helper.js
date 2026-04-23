const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialUsers = [
  {
    username: "user1",
    name: "User 1",
    password: "password1",
  },
  {
    username: "user2",
    name: "User 2",
    password: "password2",
  },
]

const usersInDB = async () => {
  const users = await User.find({})
  return users
}

const createToken = async (user) => {
  const token = jwt.sign({ 
    id: user.id,
    username: user.username,
  }, process.env.JWT_SECRET)

  return token
}

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

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs
}

module.exports = {
  initialUsers,
  usersInDB,
  initialBlogs,
  blogsInDB,
  createToken,
}