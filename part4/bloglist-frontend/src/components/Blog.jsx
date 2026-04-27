import { useParams } from "react-router-dom"

const Blog = ({ loggedinUser, blogs, increaseLike, removeBlog }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  return (
    <div className="blog">
      <h3>
        {blog.title} by {blog.author}
      </h3>

      <div>
        {blog.url} <br />
        {blog.likes} likes {loggedinUser && <button onClick={() => increaseLike(blog.id, blog)}>like</button>}
        <br />
        {blog.user.name}
        <br />
        {loggedinUser && blog.user.username === loggedinUser.username && <button onClick={() => removeBlog(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
