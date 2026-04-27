import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({ loginUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginUser({ username, password })
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>login</h2>
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