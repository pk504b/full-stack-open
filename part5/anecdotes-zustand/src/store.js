import { create } from 'zustand'
import { getAnecdotes, addAnecdote, updateAnecdote, deleteAnecdote } from './anecdoteServices'

const asObject = anecdote => ({
  content: anecdote,
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
    },
    remove: async (id) => {
      await deleteAnecdote(id);
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }));
    },
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


const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    setMessage: (message) => {
      set({ message })
    },
    clearMessage: () => {
      set({ message: '' })
    }
  }
}))
export const useNotifications = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)