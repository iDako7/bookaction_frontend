import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/lib/test-utils'
import PracticeQuestionPage from './page'
import { vi } from 'vitest'

// Mock the API hooks
vi.mock('@/lib/hooks/useApi', () => ({
  useConceptQuiz: vi.fn(() => ({
    data: {
      questions: [
        {
          orderIndex: 0,
          question: 'Test Question 1',
          questionType: 'single_choice',
          options: ['Option A', 'Option B'],
          correctOptionIndex: [0],
          explanation: 'Explanation for Q1',
          mediaUrl: ''
        },
        {
          orderIndex: 1,
          question: 'Test Question 2',
          questionType: 'single_choice',
          options: ['Option C', 'Option D'],
          correctOptionIndex: [1],
          explanation: 'Explanation for Q2',
          mediaUrl: ''
        }
      ]
    },
    isLoading: false
  })),
  useSubmitQuizAnswer: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({})
  })),
  useUpdateConceptProgress: vi.fn()
}))

// Mock the store
vi.mock('@/lib/state/progressStore', () => ({
  useProgressStore: vi.fn((selector) => selector({
    saveQuizAnswer: vi.fn(),
    markConceptPracticeCompleted: vi.fn()
  }))
}))

describe('PracticeQuestionPage', () => {
  const params = Promise.resolve({ moduleId: '1', conceptId: '1' })
  // @ts-expect-error - Mocking _testValue for testing purposes
  params._testValue = { moduleId: '1', conceptId: '1' }

  it('renders the question and options', async () => {
    renderWithProviders(<PracticeQuestionPage params={params} />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Question 1')).toBeInTheDocument()
      expect(screen.getByText('Option A')).toBeInTheDocument()
      expect(screen.getByText('Option B')).toBeInTheDocument()
    })
  })

  it('allows selecting an option and submitting', async () => {
    renderWithProviders(<PracticeQuestionPage params={params} />)
    
    await waitFor(() => {
      expect(screen.getByText('Option A')).toBeInTheDocument()
    })

    const optionA = screen.getByText('Option A')
    fireEvent.click(optionA)

    const checkButton = screen.getByText('Check Answer')
    expect(checkButton).not.toBeDisabled()
    
    fireEvent.click(checkButton)
    
    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument()
      expect(screen.getByText('Explanation for Q1')).toBeInTheDocument()
      expect(screen.getByText('Next Question →')).toBeInTheDocument()
    })
  })

  it('navigates to next question and then summary', async () => {
    renderWithProviders(<PracticeQuestionPage params={params} />)
    
    // Question 1
    await waitFor(() => screen.getByText('Test Question 1'))
    fireEvent.click(screen.getByText('Option A'))
    fireEvent.click(screen.getByText('Check Answer'))
    await waitFor(() => screen.getByText('Next Question →'))
    fireEvent.click(screen.getByText('Next Question →'))

    // Question 2
    await waitFor(() => {
      expect(screen.getByText('Test Question 2')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Option D')) // Correct answer for Q2
    fireEvent.click(screen.getByText('Check Answer'))
    
    await waitFor(() => {
      expect(screen.getByText('View Summary →')).toBeInTheDocument()
    })
  })
})
