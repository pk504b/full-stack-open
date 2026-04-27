import { useAnecdoteActions } from '../store'

export default function AnecdoteForm() {
  const { add } = useAnecdoteActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    add(e.target.anecdote.value)
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}