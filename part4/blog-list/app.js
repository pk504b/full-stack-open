const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()
app.use(middleware.requestLogger)

mongoose.connect(config.MONGO_URI, { family: 4 })
.then(() => logger.info('Connected to database'))
.catch(err => logger.error(err))

app.use(express.json())
app.use("/api/login", loginRouter)
app.use('/api/blogs', blogsRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app