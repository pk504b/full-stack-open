import { create } from "zustand";
import blogService from "../services/blogs";

export const useBlog = create((set) => ({
  blogs: [],

  initialize: async () => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    set(() => ({ blogs: sortedBlogs }));
  },
  add: async (blog) => {
    const savedBlog = await blogService.add(blog);
    set((state) => ({
      blogs: [...state.blogs, { ...savedBlog, user: state.user }],
    }));
  },
  like: async (id, user) => {
    const blogToLike = useBlog.getState().blogs.find((blog) => blog.id === id);
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }
    const returnedBlog = await blogService.incrementLike(id, updatedBlog);
    set((state) => ({
      blogs: state.blogs
        .map((blog) =>
          blog.id === id ? { ...returnedBlog, user } : blog,
        )
        .sort((a, b) => b.likes - a.likes),
    }));
  },
  remove: async (id) => {
    await blogService.removeBlog(id);
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id).sort(
        (a, b) => b.likes - a.likes,
      ),
    }));
  },
}));
