import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('bloglist-user')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglist-user')
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
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App