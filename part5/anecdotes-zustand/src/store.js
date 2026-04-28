import { create } from 'zustand'
import { getAnecdotes, addAnecdote } from './anecdoteServices'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await getAnecdotes();
      set({ anecdotes });
    },
    vote: (id) => {
      set((state) => ({
        anecdotes: [
          ...state.anecdotes.map(anecdote => {
            if (anecdote.id === id) {
              return {
                ...anecdote,
                votes: anecdote.votes + 1
              }
            }
            return anecdote
          })
        ].toSorted((a, b) => b.votes - a.votes)
      }))
    },
    add: async (anecdote) => {
      const newAnecdote = await addAnecdote(asObject(anecdote));
      set((state) => ({
        anecdotes: [
          ...state.anecdotes,
          newAnecdote
        ]
      }))
      return newAnecdote;
    },
    setFilter: (filter) => {
      set({ filter })
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter) {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }
  return anecdotes
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
