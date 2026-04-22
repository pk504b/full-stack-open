const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const blogWithMostLikes = blogs.reduce((acc, blog) => {
    if (acc.likes < blog.likes) {
      return blog
    } else {
      return acc
    }
  })
  return blogWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}