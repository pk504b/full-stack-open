import { useState } from "react"

const Blog = ({ loggedinUser, blog, increaseLike, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="blog"
      style={{
        border: "1px solid black",
        padding: "4px",
        margin: "4px 0"
      }}>
      <div>
        {blog.title} {blog.author}
        <button className="toggleBlog" onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "show"}
        </button>
      </div>

      {expanded && (
        <div>
          {blog.url} <br />
          {blog.likes} likes <button onClick={() => increaseLike(blog.id, blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          {loggedinUser && blog.user.username === loggedinUser.username && <button onClick={() => removeBlog(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
