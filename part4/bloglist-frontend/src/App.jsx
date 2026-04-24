import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Login from "./components/Login"
import AddBlog from "./components/AddBlog"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")
  const [error, setError] = useState("")

  const incrementLike = async (id, blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.incrementLike(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(blog => blog.id === id ? returnedBlog : blog).sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    const confirmation = confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (!confirmation) return

    await blogService.removeBlog(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleLogout = () => {
    localStorage.removeItem("bloglist-user")
    setUser(null)
  }

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bloglist-user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (!user) {
    return <Login setUser={setUser} notification={notification} error={error} setNotification={setNotification} setError={setError} />
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <div style={{ backgroundColor: "#1fda1f", padding: "10px" }}>{notification}</div>}
      {error && <div style={{ backgroundColor: "#ff5555", padding: "10px" }}>{error}</div>}
      <p>logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
      </p>
      <AddBlog setBlogs={setBlogs} setNotification={setNotification} setError={setError} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App