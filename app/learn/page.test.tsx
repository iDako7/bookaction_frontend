import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@/lib/test-utils'
import LearnPage from './page'
import { vi } from 'vitest'

// Mock the API hooks
vi.mock('@/lib/hooks/useApi', () => ({
  useModulesOverview: vi.fn(() => ({
    data: {
      modules: [
        {
          id: 1,
          title: 'Test Module 1',
          description: 'Description 1',
          theme: { title: 'Theme 1' },
          concepts: [],
          progress: 0
        },
        {
          id: 2,
          title: 'Test Module 2',
          description: 'Description 2',
          theme: { title: 'Theme 2' },
          concepts: [],
          progress: 50
        }
      ]
    },
    isLoading: false,
    error: null
  }))
}))

describe('LearnPage', () => {
  it('renders the learning journey header', () => {
    renderWithProviders(<LearnPage />)
    expect(screen.getByText(/Your Learning Journey/i)).toBeInTheDocument()
    expect(screen.getByText(/Level Up Your/i)).toBeInTheDocument()
  })

  it('renders the list of modules', async () => {
    renderWithProviders(<LearnPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Module 1')).toBeInTheDocument()
      expect(screen.getByText('Test Module 2')).toBeInTheDocument()
    })
  })
})
