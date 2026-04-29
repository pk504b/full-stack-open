import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import { useNotification } from './hooks/useNotification'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
  const { handleNotification } = useNotification()

  function hanldeVote(anecdote) {
    voteAnecdote(anecdote)
    handleNotification({
      message: `voted: ${anecdote.content}`,
      type: 'success'
    })
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => hanldeVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App