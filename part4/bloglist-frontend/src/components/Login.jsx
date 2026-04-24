import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

export default function Login({ setUser, notification, error, setNotification, setError }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await loginService.login({ username, password })
      localStorage.setItem('bloglist-user', JSON.stringify(response))
      blogService.setToken(response.token)
      setUser(response)
      setUsername('')
      setPassword('')
      setNotification(`Logged in as ${response.username}`)
      setTimeout(() => setNotification(''), 2000)
    } catch (error) {
      console.log(error)
      setError(error.response.data.error)
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <div>
      <h2>login</h2>

      {notification && <div style={{ backgroundColor: "#1fda1f", padding: "10px" }}>{notification}</div>}
      {error && <div style={{ backgroundColor: "#ff5555", padding: "10px" }}>{error}</div>}

      <br />

      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}