import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useField } from "../hooks/field";

export default function AddBlog({ addBlog }) {
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const title = useField("title");
  const author = useField("author");
  const url = useField("url");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBlog({ title, author, url });
      // setTitle("");
      // setAuthor("");
      // setUrl("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>add blog</h2>

      <form onSubmit={handleSubmit}>
        <TextField {...title} />
        <br />
        <br />
        <TextField {...author} />
        <br />
        <br />
        <TextField {...url} />
        <br />
        <br />
        <Button variant="contained" type="submit">
          add
        </Button>{" "}
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          cancel
        </Button>
      </form>
      <br />
    </div>
  );
}
