import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputProps: {
      type,
      value,
      onChange,
    },
    reset
  }
}


export const useAnecdotes = () => {
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
  
  return {
    anecdotes,
    addAnecdote
  }
}