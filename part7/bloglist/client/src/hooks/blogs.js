import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import blogService from "../services/blogs";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
  })

  const add = useMutation({
    mutationFn: blogService.add,
    onSuccess: (savedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(savedBlog))
    }
  })

  const like = useMutation({
    mutationFn: ({ id, blog }) => blogService.incrementLike(id, blog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    }
  })

  const remove = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: (_, id) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.filter(b => b.id !== id))
    }
  })

  return {
    blogs: result.data,
    isLoading: result.isLoading,
    add,
    like,
    remove,
  };
};