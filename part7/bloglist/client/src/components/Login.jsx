import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export default function Login({ loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>login</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <TextField
          variant="standard"
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
