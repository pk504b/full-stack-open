import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotification } from '../hooks/useNotification'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { handleNotification } = useNotification()

  const onCreate = async (event) => {
    event.preventDefault()
    try {
      const content = event.target.anecdote.value
      await addAnecdote({ content, votes: 0 })
      event.target.reset()
      handleNotification({ 
        message: `created: ${content}`,
        type: 'success'
      })
    } catch (error) {
      handleNotification({ 
        message: error.message,
        type: 'error'
      })
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