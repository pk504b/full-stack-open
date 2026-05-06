import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import commentService from "../services/comments";
import { useEffect } from "react";
import { useState } from "react";
import { useField } from "../hooks/field";

const Blog = ({ loggedinUser, blogs, increaseLike, removeBlog }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const comment = useField("comment");

  const [comments, setComments] = useState([]);
  const addComment = async (e) => {
    e.preventDefault();
    try {
      await commentService.addComment(blog.id, comment.value);
      setComments([...comments, { content: comment.value }]);
      comment.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const comments = await commentService.getBlogComments(blog.id);
      setComments(comments);
    };

    getComments();
  }, [blog.id]);

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
        <br />
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <TextField {...comment} />
          <Button variant="contained" type="submit">
            add comment
          </Button>
        </form>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Blog;
