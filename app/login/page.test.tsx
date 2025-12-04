import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/lib/test-utils'
import LoginPage from './page'
import { vi } from 'vitest'

// Mock the API client
vi.mock('@/lib/api/client', () => ({
  api: {
    login: vi.fn().mockResolvedValue({
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      token: 'test-token'
    })
  }
}))

// Mock the auth store
vi.mock('@/lib/state/authStore', () => ({
  useAuthStore: vi.fn((selector) => selector({
    login: vi.fn()
  }))
}))

describe('LoginPage', () => {
  it('renders the login form', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText('Welcome back')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    renderWithProviders(<LoginPage />)
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }))
    
    await waitFor(() => {
      expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    renderWithProviders(<LoginPage />)
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } })
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })
})
