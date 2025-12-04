import { use, Suspense } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock React.use to handle promises synchronously in tests, matching lib/test-utils.tsx strategy
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    use: (resource: unknown) => {
      if (
        resource &&
        typeof (resource as Promise<unknown>).then === 'function' &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (resource as any)._testValue
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (resource as any)._testValue
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return actual.use(resource as any)
    },
  }
})

function TestComponent({ p }: { p: Promise<string> }) {
  const val = use(p)
  return <div>{val}</div>
}

describe('use hook', () => {
  it('resolves promise', async () => {
    const p = Promise.resolve('hello')
    // @ts-expect-error - Mocking _testValue for testing purposes
    p._testValue = 'hello'

    render(
      <Suspense fallback="loading">
        <TestComponent p={p} />
      </Suspense>
    )

    await waitFor(() => expect(screen.getByText('hello')).toBeInTheDocument())
  })
})
