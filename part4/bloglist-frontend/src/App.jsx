import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    return <Login setUser={setUser} />
  }

  return (
    <div>
        <h2>blogs</h2>
        <p>logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
        </p>
        <AddBlog setBlogs={setBlogs} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App