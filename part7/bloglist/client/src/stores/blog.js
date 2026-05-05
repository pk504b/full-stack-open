import { create } from "zustand";
import blogService from "../services/blogs";

export const useBlog = create((set) => ({
  blogs: [],

  initialize: async () => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    set(() => ({ blogs: sortedBlogs }));
  },

  // setBlogs: (blogs) => set(() => ({ blogs })),
  add: async (blog) => {
    const savedBlog = await blogService.add(blog);
    set((state) => ({ blogs: [...state.blogs, { ...savedBlog, user: state.user }] }));
  },
}));