import { useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import { AppBar, Container, Toolbar, Button, Alert } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundry";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Bloglist from "./components/Bloglist";
import { useNotification } from "./stores/notification";
import { useBlogs } from "./hooks/blogs";
import { useUser } from "./UserContext";
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const navigate = useNavigate();
  const { user, login, logout, initializeUser } = useUser();
  const {
    text: notificationText,
    type: notificationType,
    setNotification,
    clearNotification,
  } = useNotification();
  const { blogs, isLoading, add, like, remove } = useBlogs();

  const loginUser = async ({ username, password }) => {
    if (!username || !password) return;
    try {
      await login({ username, password });
      setNotification({
        text: `Logged in as ${user.username}`,
        type: "success"
      });
      setTimeout(() => clearNotification(), 2000);
    } catch (error) {
      setNotification({ text: error.response.data.error, type: "error" });
      setTimeout(() => clearNotification(), 2000);
      throw error;
    }
  };

  const addBlog = async ({ title, author, url }) => {
    if (!user) return;
    try {
      add.mutate({ title, author, url });
      setNotification({ text: `Added ${title}`, type: "success" });
      setTimeout(() => setNotification(""), 2000);
    } catch (error) {
      console.log(error);
      setNotification({ text: error.response.data.error, type: "error" });
      setTimeout(() => setNotification(""), 2000);
      throw error;
    }
  };

  const increaseLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    like.mutate({ id, blog: { ...blog, likes: blog.likes + 1 } });
  };

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    const confirmation = confirm(
      `Remove ${blogToRemove.title} by ${blogToRemove.author}?`,
    );
    if (!confirmation) return;

    remove.mutate(id);
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    initializeUser();
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">
            <Link to="/">blogs</Link>
          </Button>
          {!user && (
            <Button color="inherit">
              <Link to="/login">login</Link>
            </Button>
          )}
          {user && (
            <Button color="inherit">
              <Link to="/add">new blog</Link>
            </Button>
          )}
          {user && (
            <p>
              logged in as {user.username}
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </p>
          )}
        </Toolbar>
      </AppBar>

      {notificationText && (
        <Alert
          style={{ marginTop: 10, marginBottom: 10 }}
          severity={notificationType}
        >
          {notificationText}
        </Alert>
      )}

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Bloglist blogs={blogs} />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/add" element={<AddBlog addBlog={addBlog} />} />

          <Route
            path="/blogs/:id"
            element={
              <Blog
                path="/blogs/:id"
                blogs={blogs}
                loggedinUser={user}
                increaseLike={increaseLike}
                removeBlog={removeBlog}
              />
            }
          />

          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />

          {/* Catch all route */}
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
