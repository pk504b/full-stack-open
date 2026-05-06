import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import userServices from "../services/users";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["users"],
    queryFn: userServices.getAll,
    retry: false,
  })

  return {
    users: result.data,
    isLoading: result.isLoading,
  };
};