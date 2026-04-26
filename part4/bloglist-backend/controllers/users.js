const User = require("../models/user")
const userRouter = require('express').Router()
const bcrypt = require("bcrypt")

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    return response.status(400).json({ error: "username or password missing" })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: "password must be at least 3 characters" })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({ username, name, passwordHash: hashedPassword })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter