import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/users";

export default function User() {
  const { id } = useParams();
  const { users, isLoading } = useUsers();

  if (isLoading) return <p>loading...</p>;

  const user = users.find((user) => user.id === id);
  console.log(user);
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>blogs created</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}