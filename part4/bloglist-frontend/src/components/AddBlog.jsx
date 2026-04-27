import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddBlog({ addBlog }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addBlog({ title, author, url })
      setTitle("")
      setAuthor("")
      setUrl("")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>add blog</h2>

      <form onSubmit={handleSubmit}>
        <label>
          title
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          author
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </label>
        <br />
        <label>
          url
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} />
        </label>
        <br />
        <button type="submit">add</button>
        <button onClick={(e) => {
          e.preventDefault()
          navigate("/")
        }}>cancel</button>
      </form>
      <br />
    </div>
  )
}