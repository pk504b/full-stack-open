import { useAnecdotes } from '../hooks/useAnecdotes'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification } = useContext(NotificationContext)

  const onCreate = async (event) => {
    event.preventDefault()
    try {
      const content = event.target.anecdote.value
      await addAnecdote({ content, votes: 0 })
      event.target.reset()
      setNotification({
        message: `added: ${content}`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification({
          message: '',
          type: ''
        })
      }, 5000)
    } catch (error) {
      setNotification({
        message: `Error: ${error.message}`,
        type: 'error'
      })
      setTimeout(() => {
        setNotification({
          message: '',
          type: ''
        })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm