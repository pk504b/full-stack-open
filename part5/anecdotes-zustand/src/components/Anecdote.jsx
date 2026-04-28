import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../store'

export default function Anecdote({ anecdote }) {
  const { vote } = useAnecdoteActions()
  const { setMessage, clearMessage } = useNotificationActions()

  const handleClick = async () => {
    await vote(anecdote.id)
    setMessage(`You voted '${anecdote.content}'`)
    setTimeout(() => clearMessage(), 2000)
  }
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}