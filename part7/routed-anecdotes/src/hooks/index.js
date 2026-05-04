import { useState, useContext } from 'react'
import AnecdoteContext from './context.jsx'

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
  return useContext(AnecdoteContext)
}