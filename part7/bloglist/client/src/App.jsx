import { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
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
import { useBlog } from "./stores/blog";
import { useUser } from "./stores/user";

const App = () => {
  const navigate = useNavigate();
  const {
    text: notificationText,
    type: notificationType,
    setNotification,
    clearNotification,
  } = useNotification();
  const { blogs, initialize: initializeBlogs, add, like, remove } = useBlog();
  const { user, initialize: initializeUser, login, logout } = useUser();

  const loginUser = async ({ username, password }) => {
    if (!username || !password) return;
    try {
      // const response = await loginService.login({ username, password });
      await login({ username, password });
      const user = useUser.getState().user;
      localStorage.setItem("bloglist-user", JSON.stringify(user));
      blogService.setToken(user.token);
      // setUser(response);
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
      await add({ title, author, url });
      setNotification({ text: `Added ${title}`, type: "success" });
      setTimeout(() => setNotification(""), 2000);
    } catch (error) {
      setNotification({ text: error.response.data.error, type: "error" });
      setTimeout(() => setNotification(""), 2000);
      throw error;
    }
  };

  const increaseLike = async (id) => {
    await like(id, user);
  };

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    const confirmation = confirm(
      `Remove ${blogToRemove.title} by ${blogToRemove.author}?`,
    );
    if (!confirmation) return;

    await remove(id);
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    // Get user from localStorage
    initializeUser();
    // Get blogs on mount
    initializeBlogs();
  }, [initializeBlogs, initializeUser]);

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

          {/* Catch all route */}
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
