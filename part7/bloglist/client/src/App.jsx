import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Login from "./components/Login"
import AddBlog from "./components/AddBlog"
import { AppBar, Container, Toolbar, Button, Alert } from "@mui/material"
import ErrorBoundary from "./components/ErrorBoundry"

import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate
} from "react-router-dom"
import Bloglist from "./components/Bloglist"

const App = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: "", type: "info" })

  const loginUser = async ({ username, password }) => {
    if (!username || !password) return
    try {
      const response = await loginService.login({ username, password })
      localStorage.setItem("bloglist-user", JSON.stringify(response))
      blogService.setToken(response.token)
      setUser(response)
      setNotification({ text: `Logged in as ${response.username}`, type: "success" })
      setTimeout(() => setNotification(""), 2000)
    } catch (error) {
      setNotification({ text: error.response.data.error, type: "error" })
      setTimeout(() => setNotification(""), 2000)
      throw error
    }
  }

  const addBlog = async ({ title, author, url }) => {
    if (!user) return
    try {
      const savedBlog = await blogService.add({ title, author, url })
      setBlogs(blogs => [...blogs, { ...savedBlog, user }])
      setNotification({ text: `Added ${savedBlog.title}`, type: "success" })
      setTimeout(() => setNotification(""), 2000)
    } catch (error) {
      setNotification({ text: error.response.data.error, type: "error" })
      setTimeout(() => setNotification(""), 2000)
      throw error
    }
  }

  const increaseLike = async (id, blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.incrementLike(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(blog => blog.id === id ? { ...returnedBlog, user } : blog).sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    const confirmation = confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (!confirmation) return

    await blogService.removeBlog(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
    navigate("/")
  }

  const handleLogout = () => {
    localStorage.removeItem("bloglist-user")
    setUser(null)
    navigate("/")
  }

  useEffect(() => {
    // Get user from localStorage
    const loggedUserJSON = window.localStorage.getItem("bloglist-user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    // Get blogs
    async function getBlogs() {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    getBlogs()
  }, [])

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit"><Link to="/">blogs</Link></Button>
          {!user && <Button color="inherit"><Link to="/login">login</Link></Button>}
          {user && <Button color="inherit"><Link to="/add">new blog</Link></Button>}
          {user && <p>logged in as {user.username}
            <Button color="inherit" onClick={handleLogout}>logout</Button>
          </p>}
        </Toolbar>
      </AppBar>

      {notification.text && <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={notification.type}>
        {notification.text}
      </Alert>}

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Bloglist blogs={blogs} loggedinUser={user} increaseLike={increaseLike} removeBlog={removeBlog} />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/add" element={<AddBlog addBlog={addBlog} />} />

          <Route path="/blogs/:id" element={
            <Blog path="/blogs/:id" blogs={blogs} loggedinUser={user} increaseLike={increaseLike} removeBlog={removeBlog} />
          } />

          {/* This is a catch all route that will render if no other route matches*/}
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App