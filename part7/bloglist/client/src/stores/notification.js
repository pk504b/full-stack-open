import { create } from "zustand";

export const useNotification = create((set) => ({
  text: "",
  type: "info",

  setNotification: ({ text, type }) => set(() => ({ text, type })),
  clearNotification: () => set(() => ({ text: "", type: "info" })),
}));
