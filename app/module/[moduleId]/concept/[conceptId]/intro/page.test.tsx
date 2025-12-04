import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/lib/test-utils'
import ConceptIntroPage from './page'
import { vi } from 'vitest'

// Mock the API hooks
vi.mock('@/lib/hooks/useApi', () => ({
  useConceptTutorial: vi.fn(() => ({
    data: {
      title: 'Test Concept',
      definition: 'Test Definition',
      whyItWorks: 'Test Why It Works',
      tutorial: {
        goodExample: { story: 'Good Story', mediaUrl: '' },
        badExample: { story: 'Bad Story', mediaUrl: '' }
      }
    },
    isLoading: false
  })),
  useUpdateConceptProgress: vi.fn(() => ({
    mutate: vi.fn()
  }))
}))

// Mock the store
vi.mock('@/lib/state/progressStore', () => ({
  useProgressStore: vi.fn((selector) => selector({
    markConceptIntroCompleted: vi.fn()
  }))
}))

describe('ConceptIntroPage', () => {
  const params = Promise.resolve({ moduleId: '1', conceptId: '1' })
  // @ts-ignore
  params._testValue = { moduleId: '1', conceptId: '1' }

  it('renders the concept definition', async () => {
    renderWithProviders(<ConceptIntroPage params={params} />)
    
    screen.debug()

    await waitFor(() => {
      expect(screen.getByText('Test Concept')).toBeInTheDocument()
      expect(screen.getByText('Test Definition')).toBeInTheDocument()
    })
  })

  it('navigates through steps', async () => {
    renderWithProviders(<ConceptIntroPage params={params} />)
    
    await waitFor(() => {
      expect(screen.getByText('Next')).toBeInTheDocument()
    })

    // Step 1 -> 2
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Good Story')).toBeInTheDocument()

    // Step 2 -> 3
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Bad Story')).toBeInTheDocument()

    // Step 3 -> Complete
    expect(screen.getByText('Continue to Practice')).toBeInTheDocument()
  })
})
