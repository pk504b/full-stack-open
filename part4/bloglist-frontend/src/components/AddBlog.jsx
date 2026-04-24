import { useState } from 'react'
import blogService from '../services/blogs'

export default function AddBlog({ setBlogs, setNotification, setError }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleAddBlog = async (e) => {
    e.preventDefault()

    try {
      const savedBlog = await blogService.add({ title, author, url })
      setBlogs(blogs => [...blogs, savedBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`Added ${savedBlog.title}`)
      setTimeout(() => setNotification(''), 2000)
    } catch (error) {
      console.log(error)
      setError(error.response.data.error)
      setTimeout(() => setError(''), 2000)
    }
  }

  if (!showForm) return <button onClick={() => setShowForm(true)}>add new blog</button>

  return (
    <div>
      <h2>add blog</h2>

      <form onSubmit={handleAddBlog}>
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