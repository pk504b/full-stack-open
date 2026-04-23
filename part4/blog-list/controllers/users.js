const User = require("../models/user")
const blogsRouter = require('express').Router()
const bcrypt = require("bcrypt")

blogsRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

blogsRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !name || !password) {
    return response.status(400).json({ error: "username, name, and password are required" })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({ username, name, passwordHash: hashedPassword })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = blogsRouter