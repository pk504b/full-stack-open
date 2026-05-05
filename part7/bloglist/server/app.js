const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(middleware.requestLogger)

mongoose.connect(config.MONGO_URI, { family: 4 })
.then(() => logger.info('Connected to database'))
.catch(err => logger.error(err))

app.use(cors())
app.use(express.json())
app.use(middleware.getAuthToken)
app.use("/api/login", loginRouter)
app.use('/api/blogs', blogsRouter)
app.use("/api/users", usersRouter)
// serve the built Vite frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app