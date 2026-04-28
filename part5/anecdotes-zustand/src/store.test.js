import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

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