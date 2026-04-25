import { useState } from "react"

export default function AddBlog({ addBlog }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addBlog({ title, author, url })
      setTitle("")
      setAuthor("")
      setUrl("")
      setShowForm(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!showForm) return <button onClick={() => setShowForm(true)}>add new blog</button>

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
          setShowForm(false)
        }}>cancel</button>
      </form>
      <br />
    </div>
  )
}