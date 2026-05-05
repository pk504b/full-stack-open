import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button } from "@mui/material"


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
        <TextField
          label="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br /><br />
        <TextField
          label="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <br /><br />
        <TextField
          label="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <br /><br />
        <Button variant="contained" type="submit">add</Button>
        {" "}
        <Button variant="contained" onClick={(e) => {
          e.preventDefault()
          navigate("/")
        }}>cancel</Button>
      </form>
      <br />
    </div>
  )
}