import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../store'

export default function Anecdote({ anecdote }) {
  const { vote, remove } = useAnecdoteActions()
  const { setMessage, clearMessage } = useNotificationActions()

  const handleVote = async () => {
    await vote(anecdote.id)
    setMessage(`You voted '${anecdote.content}'`)
    setTimeout(() => clearMessage(), 2000)
  }
  return (
    <div data-testid="anecdote-item">
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
        {anecdote.votes <= 0 && <button onClick={() => remove(anecdote.id)}>delete</button>}
      </div>
    </div>
  )
}