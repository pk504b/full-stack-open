const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body
  newBlog.likes = newBlog.likes || 0
  const savedBlog = await new Blog(newBlog).save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter