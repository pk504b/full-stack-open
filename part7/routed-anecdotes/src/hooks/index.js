import { useState, useEffect } from 'react'

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

const baseUrl = 'http://localhost:3001/anecdotes'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    const getAnecdotes = async() => {
      const response = await fetch(baseUrl)
      const data = await response.json()
      setAnecdotes(data)
    }
    getAnecdotes()
  }, [])

  
  return {
    anecdotes,
  }
}