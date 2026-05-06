import { create } from "zustand";
import loginService from "../services/login";
import blogService from "../services/blogs";

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
    set(() => ({ user }));
  },
  logout: () => {
    localStorage.removeItem("bloglist-user");
    set(() => ({ user: null }));
  },
}));