import { useAnecdoteActions } from '../store'

export default function Anecdote({ anecdote }) {
  const { vote } = useAnecdoteActions()

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}