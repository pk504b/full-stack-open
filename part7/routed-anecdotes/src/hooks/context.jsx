import { useState, useEffect, createContext } from 'react'
import anecdoteService from '../services/anecdotes'

const AnecdoteContext = createContext()
export default AnecdoteContext

export const AnecdoteProvider = ({ children }) => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    const getAnecdotes = async() => {
      const data = await anecdoteService.getAll()
      setAnecdotes(data)
    }
    getAnecdotes()
  }, [])

  const addAnecdote = async (anecdote) => {
    const data = await anecdoteService.createNew(anecdote)
    setAnecdotes(prevAnecdotes => [...prevAnecdotes, data])
  }

  const removeAnecdote = async (id) => {
    await anecdoteService.remove(id)
    setAnecdotes(prevAnecdotes => prevAnecdotes.filter(anecdote => anecdote.id !== id))
  }

  return (
    <AnecdoteContext.Provider value={{ anecdotes, addAnecdote, removeAnecdote }}>
      {children}
    </AnecdoteContext.Provider>
  )
}
