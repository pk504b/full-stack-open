const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user.id)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or invalid' })
  }

  body.likes = body.likes || 0
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title and url are required' })
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user.id,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = await User.findById(request.user.id)

  const blog = await Blog.findById(request.params.id)
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

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