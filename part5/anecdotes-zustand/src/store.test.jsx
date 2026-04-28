import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  getAnecdotes: vi.fn() 
}))

import useAnecdoteStore, { useAnecdoteActions } from './store'
import { getAnecdotes } from './services/anecdotes'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('should initialize', async () => {
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    expect(result.current.add).toBeTruthy()
    expect(result.current.vote).toBeTruthy()
    expect(result.current.remove).toBeTruthy()
  })
  it('should load anecdotes from server', async () => {
    const mockAnecdotes = [{ id: 1, content: 'test', votes: 0 }]
    getAnecdotes.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })
    expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
  })
})

import AnecdoteList from './components/AnecdoteList'

describe('AnecdoteList Sorting', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'Low votes', votes: 1 },
        { id: 2, content: 'High votes', votes: 10 },
        { id: 3, content: 'Medium votes', votes: 5 }
      ]
    })
  })

  it.only('renders anecdotes sorted by votes descending', () => {
    render(<AnecdoteList />)
    const anecdoteElements = screen.getAllByTestId('anecdote-item')

    expect(anecdoteElements[0]).toHaveTextContent('High votes')
    expect(anecdoteElements[1]).toHaveTextContent('Medium votes')
    expect(anecdoteElements[2]).toHaveTextContent('Low votes')
  })
})

afterEach(() => {
  cleanup()
})