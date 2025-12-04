## Relevant Files

- `lib/api/client.ts` - Main API client where the interceptor logic will live.
- `lib/state/authStore.ts` - Auth state management.
- `lib/types/api.ts` - Type definitions.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

## Tasks

- [ ] 1.0 Implement Refresh Token Interceptor Logic

  - [ ] 1.1 Add `isRefreshing` flag and `failedQueue` array to `lib/api/client.ts` to manage concurrent requests during refresh.
  - [ ] 1.2 Create a `processQueue` helper function to retry or reject failed requests after refresh attempts.
  - [ ] 1.3 Modify the existing response interceptor in `lib/api/client.ts` to catch `401 Unauthorized` errors.
  - [ ] 1.4 Implement the refresh logic:
    - [ ] Check if `!originalRequest._retry`.
    - [ ] If `isRefreshing` is true, add the request to `failedQueue`.
    - [ ] If `isRefreshing` is false, set it to true and call `POST /auth/refresh`.
  - [ ] 1.5 Handle successful refresh:
    - [ ] Extract new `accessToken` from response.
    - [ ] Update the global Auth Store with the new token (using `useAuthStore.getState().login` or similar).
    - [ ] Update the `Authorization` header of the original request.
    - [ ] Process the `failedQueue` with the new token.
    - [ ] Return the result of the retried original request.
  - [ ] 1.6 Handle failed refresh:
    - [ ] Process `failedQueue` with error.
    - [ ] Clear auth state (logout).
    - [ ] Redirect to login page.
    - [ ] Ensure `isRefreshing` is reset to false.

- [ ] 2.0 Update Auth Store/State Management

  - [ ] 2.1 Verify `lib/state/authStore.ts` exposes necessary actions (like `login` or a specific `setToken`) that can be called from `client.ts`.
  - [ ] 2.2 Ensure the store correctly persists the new token to `localStorage` so subsequent page reloads remain authenticated.

- [ ] 3.0 Verify Refresh Token Flow
  - [ ] 3.1 Start the development server.
  - [ ] 3.2 Log in to the application.
  - [ ] 3.3 Open browser DevTools (Network tab).
  - [ ] 3.4 Simulate an expired token (e.g., by manually modifying the token in localStorage to be invalid, or temporarily shortening backend token life).
  - [ ] 3.5 Navigate to a protected route or perform an action (e.g., "Get Modules").
  - [ ] 3.6 Verify the sequence:
    - [ ] Initial request fails with 401.
    - [ ] `/auth/refresh` request is sent and succeeds (200).
    - [ ] Initial request is automatically retried with new token and succeeds (200).
    - [ ] User remains on the page without being redirected to login.
