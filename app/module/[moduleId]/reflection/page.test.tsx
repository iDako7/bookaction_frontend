import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/lib/test-utils'
import ReflectionPage from './page'
import { vi } from 'vitest'

// Mock the API hooks
vi.mock('@/lib/hooks/useApi', () => ({
  useModuleReflection: vi.fn(() => ({
    data: {
      prompt: 'Test Reflection Prompt',
      mediaUrl: ''
    },
    isLoading: false
  })),
  useModulesOverview: vi.fn(() => ({
    data: {
      modules: [
        { id: 1, title: 'Test Module' }
      ]
    }
  })),
  useSubmitModuleReflection: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({})
  }))
}))

// Mock the store
vi.mock('@/lib/state/progressStore', () => ({
  useProgressStore: vi.fn((selector) => selector({
    markReflectionViewed: vi.fn(),
    markModuleCompleted: vi.fn()
  }))
}))

describe('ReflectionPage', () => {
  const params = Promise.resolve({ moduleId: '1' })
  // @ts-ignore
  params._testValue = { moduleId: '1' }

  it('renders the reflection prompt', async () => {
    renderWithProviders(<ReflectionPage params={params} />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Reflection Prompt')).toBeInTheDocument()
      expect(screen.getByText('Test Module')).toBeInTheDocument()
    })
  })

  it('allows entering and submitting reflection', async () => {
    renderWithProviders(<ReflectionPage params={params} />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Take a moment to reflect/i)).toBeInTheDocument()
    })

    const textarea = screen.getByPlaceholderText(/Take a moment to reflect/i)
    fireEvent.change(textarea, { target: { value: 'My reflection answer' } })

    const submitButton = screen.getByText('Complete Module →')
    expect(submitButton).not.toBeDisabled()
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(submitButton).toHaveTextContent('Completing...')
    })
  })
})
