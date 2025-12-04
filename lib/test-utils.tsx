import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Turn off retries for testing
      },
    },
  });

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading Params...</div>}>
        {ui}
      </React.Suspense>
    </QueryClientProvider>
  );
}

// Mock React.use
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    use: (resource: any) => {
      if (
        resource &&
        typeof resource.then === "function" &&
        (resource as any)._testValue
      ) {
        return (resource as any)._testValue;
      }
      return actual.use(resource);
    },
  };
});

// Mock React.use for params unwrapping if needed, though React 19 should handle it.
// If we run into issues with `use(params)`, we might need to mock it or ensure the test environment supports it.
