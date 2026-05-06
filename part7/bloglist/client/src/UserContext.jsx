import { createContext, useContext, useState } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const initializeUser = () => {
    const userFromStorage = localStorage.getItem("bloglist-user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  };

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      localStorage.setItem("bloglist-user", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloglist-user");
    blogService.setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, initializeUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
