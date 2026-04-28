import { create } from 'zustand'
import { getAnecdotes, addAnecdote, updateAnecdote } from './anecdoteServices'

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
    vote: async (id) => {
      const previousAnecdote = useAnecdoteStore.getState().anecdotes.find(anecdote => anecdote.id === id);
      const updatedAnecdote = await updateAnecdote(id, { ...previousAnecdote, votes: previousAnecdote.votes + 1 });
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
      }));
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
