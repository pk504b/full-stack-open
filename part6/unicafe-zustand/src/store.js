import { create } from 'zustand'

export const useFeedbackStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set((state) => ({ ...state, good: state.good + 1 })),
    incrementNeutral: () => set((state) => ({ ...state, neutral: state.neutral + 1 })),
    incrementBad: () => set((state) => ({ ...state, bad: state.bad + 1 })),
  }
}))

export const useFeedback = () => useFeedbackStore((state) => state)
export const useFeedbackActions = () => useFeedbackStore((state) => state.actions)