const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGO_URI, { family: 4 })
.then(() => console.log('Connected to database'))
.catch(err => console.error(err))

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app