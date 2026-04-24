import { useState } from "react";

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      border: "1px solid black",
      padding: "4px",
      margin: "4px 0"
    }}>
      <div>
        {blog.title} <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "show"}
        </button>
      </div>

      {expanded && (
        <div>
          {blog.url} <br />
          {blog.likes} <button>like</button> <br />
          {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;
