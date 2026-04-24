import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

export default function Login({ setUser }) {
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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>login</h2>

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