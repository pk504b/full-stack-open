import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Blog = ({ loggedinUser, blogs, increaseLike, removeBlog }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return <div>blog not found</div>;

  return (
    <Card className="blog" style={{ marginTop: "5rem" }}>
      <CardContent>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="h6">by {blog.author}</Typography>
        <Typography variant="body1">
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <br />
        <Typography variant="body1">
          {blog.likes} likes{" "}
          {loggedinUser && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => increaseLike(blog.id, blog)}
            >
              like
            </Button>
          )}{" "}
          {loggedinUser && blog.user.username === loggedinUser.username && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeBlog(blog.id)}
            >
              remove
            </Button>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
