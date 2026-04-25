import { useState } from "react"

const Blog = ({ blog, incrementLike, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      border: "1px solid black",
      padding: "4px",
      margin: "4px 0"
    }}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "show"}
        </button>
      </div>

      {expanded && (
        <div>
          {blog.url} <br />
          {blog.likes} <button onClick={() => incrementLike(blog.id, blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
