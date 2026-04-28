import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  getAnecdotes: vi.fn() 
}))

import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from './store'
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
  it('renders anecdotes sorted by votes descending', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Low votes', votes: 1 },
      { id: 2, content: 'High votes', votes: 10 },
      { id: 3, content: 'Medium votes', votes: 5 }
    ]
    getAnecdotes.mockResolvedValue(mockAnecdotes)
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })
    
    expect(useAnecdoteStore.getState().anecdotes)
      .toEqual(mockAnecdotes.sort((a, b) => b.votes - a.votes))
  })
  it('renders filtered anecdotes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'one vote', votes: 1 },
      { id: 2, content: 'ten votes', votes: 10 },
      { id: 3, content: 'five votes', votes: 5 }
    ]
    getAnecdotes.mockResolvedValue(mockAnecdotes)
    const { result: actions } = renderHook(() => useAnecdoteActions())
    
    await act(async () => {
      await actions.current.initialize()
    })

    await act(async () => {
      await actions.current.setFilter('votes')
    })

    const { result: anecdotes } = renderHook(() => useAnecdotes())

    expect(anecdotes.current).toEqual([
      { id: 2, content: 'ten votes', votes: 10 },
      { id: 3, content: 'five votes', votes: 5 }
    ])
  })
})

afterEach(() => {
  cleanup()
})