import Blog from "./Blog"

export default function Bloglist({ blogs, loggedinUser, increaseLike, removeBlog }) {
  return (
    <>
      <h2>blogs</h2>
      <div className="blogsContainer">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} loggedinUser={loggedinUser} increaseLike={increaseLike} removeBlog={removeBlog} />
        )}
      </div>
    </>
  )
}