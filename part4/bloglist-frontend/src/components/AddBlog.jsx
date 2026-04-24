import { useState } from 'react'
import blogService from '../services/blogs'

export default function AddBlog({ setBlogs }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (e) => {
    e.preventDefault()

    try {
      const savedBlog = await blogService.add({ title, author, url })
      setBlogs(blogs => [...blogs, savedBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error)
    }
  }

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
      </form>
      <br />
    </div>
  )
}