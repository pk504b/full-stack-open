const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body
  newBlog.likes = newBlog.likes || 0
  if (!newBlog.title || !newBlog.url) {
    return response.status(400).json({ error: 'title and url are required' })
  }
  const savedBlog = await new Blog(newBlog).save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).send()
})

module.exports = blogsRouter