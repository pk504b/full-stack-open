import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../services/anecdotes'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const state = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], state.concat(newAnecdote))
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const state = queryClient.getQueryData(['anecdotes'])
      const updatedState = state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData(['anecdotes'], updatedState)
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (anecdote) => createMutation.mutate({ ...anecdote, votes: 0 }),
    voteAnecdote: (anecdote) => updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}