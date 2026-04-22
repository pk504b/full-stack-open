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


blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  if (!request.params.id) 
    return response.status(400).json({ error: 'id is required' })

  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) 
    return response.status(404).json({ error: 'blog not found' })

  blogToUpdate.likes = likes

  const savedBlog = await blogToUpdate.save()
  response.status(200).json(savedBlog)
})

module.exports = blogsRouter