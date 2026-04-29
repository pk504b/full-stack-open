const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return res.json()
}

export const createAnecdote = async (anecdote) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(anecdote),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to create anecdote')
  }
  return res.json()
}