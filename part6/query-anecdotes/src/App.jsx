import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import NotificationContext from './NotificationContext'
import { useState } from 'react'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  function hanldeVote(anecdote) {
    voteAnecdote(anecdote)
    setNotification({
      message: `voted: ${anecdote.content}`,
      type: 'success'
    })
    setTimeout(() => {
      setNotification({
        message: '',
        type: ''
      })
    }, 5000)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <NotificationContext.Provider value={{notification, setNotification}}>
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
    </NotificationContext.Provider>
  )
}

export default App