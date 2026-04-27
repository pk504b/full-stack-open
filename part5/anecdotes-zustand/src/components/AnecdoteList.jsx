import { useAnecdotes } from '../store'
import Anecdote from './Anecdote'

export default function AnecdoteList() {
  const anecdotes = useAnecdotes()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}