import { create } from "zustand";
import loginService from "../services/login";

export const useUser = create((set) => ({
  user: null,

  initialize: () => {
    const loggedUserJSON = window.localStorage.getItem("bloglist-user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
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