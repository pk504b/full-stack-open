const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined

  const blogWithMostLikes = blogs.reduce((acc, blog) => {
    if (acc.likes < blog.likes) {
      return blog
    } else {
      return acc
    }
  })
  return blogWithMostLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined
  
  const counts = _.countBy(blogs, "author")
  const authorCounts = _.map(counts, (count, author) => ({ author, blogs: count }))
  return _.maxBy(authorCounts, "blogs")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}