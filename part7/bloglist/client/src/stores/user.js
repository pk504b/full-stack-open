import { create } from "zustand";
import loginService from "../services/login";
import blogService from "../services/blogs";
import persistentUser from "../services/persistentUser";

export const useUser = create((set) => ({
  user: null,

  initialize: () => {
    const loggedUserJSON = window.localStorage.getItem("bloglist-user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      set(() => ({ user }));
    }
  },
  login: async ({ username, password }) => {
    const user = await loginService.login({ username, password });
    persistentUser.saveUser(user);
    blogService.setToken(user.token);
    set(() => ({ user }));
  },
  logout: () => {
    persistentUser.removeUser();
    blogService.setToken(null);
    set(() => ({ user: null }));
  },
}));