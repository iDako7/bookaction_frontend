## Relevant Files

- `docs/api_designV2.0.md` - Source of backend contracts for all endpoints and payload shapes.
- `lib/api/client.ts` - API client with mock/API toggle; primary integration point to swap to backend.
- `lib/api/mockData.ts` - Current mock provider to be deprecated and removed.
- `lib/hooks/useApi.ts` - React Query hooks wrapping the API client for modules/concepts/auth flows.
- `lib/hooks/useGating.ts` - Gate logic for learning flow completion; depends on data sources.
- `lib/providers/QueryProvider.tsx` - React Query client provider used across pages and in tests.
- `lib/state/authStore.ts`, `lib/state/progressStore.ts` - Client state affected by auth/progress API responses.
- `app/page.tsx` - Learning homepage showing modules overview.
- `app/module/[moduleId]/theme/page.tsx` - Module theme step consuming theme API.
- `app/module/[moduleId]/concept/[conceptId]/intro/page.tsx` - Concept intro/tutorial view using tutorial API.
- `app/module/[moduleId]/concept/[conceptId]/practice/question/page.tsx` - Practice/quiz step calling quiz + submission APIs.
- `app/module/[moduleId]/concept/[conceptId]/summary/page.tsx` - Concept summary view consuming summary API.
- `app/module/[moduleId]/reflection/page.tsx` - Module reflection step consuming reflection fetch/submit APIs.
- `app/login/page.tsx`, `app/register/page.tsx`, `app/profile/page.tsx`, `app/medal/page.tsx` - Auth/profile areas that will swap from mock to backend.
- `components/**` (cards, buttons, layout, guards) - Shared UI that may need loading/error wiring after API switch.
- `package.json` - Scripts and dependencies; will host test command and test tooling.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx vitest [optional/path/to/test/file]` or `npm test` (after adding scripts) to run tests. Running without a path executes all tests found by the test configuration.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this work (e.g., `git checkout -b feature/frontend-api-switch`)
- [ ] 1.0 Review API design and current mock data usage across the frontend
  - [ ] 1.1 Read `docs/api_designV2.0.md` and note required request/response shapes for modules, concepts, auth, and progress.
  - [ ] 1.2 Inventory current mock usages in `lib/api/mockData.ts`, `lib/api/client.ts`, and `lib/hooks/useApi.ts`, mapping each UI page to its endpoint.
  - [ ] 1.3 Compare mock data shapes vs. backend shapes; list fields needing transformation or renaming (e.g., ids, order_index, media fields).
  - [ ] 1.4 Confirm environment flag strategy (`NEXT_PUBLIC_USE_MOCK_DATA`, `NEXT_PUBLIC_API_URL`) and decide default for real API mode.
- [ ] 2.0 Add essential tests using mock data to cover critical flows and address major issues
  - [ ] 2.1 Add lightweight test tooling (Vitest + React Testing Library + jest-dom) and `npm test` script; configure jsdom test environment.
  - [ ] 2.2 Create test utilities for rendering with `QueryProvider`, router mocks, and auth/progress store mocks.
  - [ ] 2.3 Write module overview page test to assert modules list renders from mock data and navigates into a module.
  - [ ] 2.4 Write concept tutorial/practice tests to assert tutorial content shows and quiz submission updates UI state (using mock responses).
  - [ ] 2.5 Write reflection flow test to verify prompt rendering and successful mock submission handling.
  - [ ] 2.6 Write auth flow test (login) to confirm form validation and mock login success path updates auth store.
  - [ ] 2.7 Document how to run tests in README (commands, env setup for mock mode).
- [ ] 3.0 Switch data sources from mock data to backend APIs per `docs/api_designV2.0.md`
  - [ ] 3.1 Update `lib/api/client.ts` to call backend endpoints when `NEXT_PUBLIC_USE_MOCK_DATA` is false; set axios base URL from `NEXT_PUBLIC_API_URL`.
  - [ ] 3.2 Align request/response typings with API contracts (ids numeric, order_index, media fields, progress percentages); adjust adapters if needed.
  - [ ] 3.3 Update `lib/hooks/useApi.ts` (and any direct callers) to use real endpoints for modules overview, theme, tutorial, quiz list, quiz submission, summary, progress updates, reflection fetch/submit, and auth.
  - [ ] 3.4 Ensure UI components/pages handle loading/error states from real API (spinners, toasts, retry) where currently assuming instant mock data.
  - [ ] 3.5 Set default env values for backend mode in `.env.example`/README and ensure mock toggle remains only for tests.
- [ ] 4.0 Run tests, fix remaining bugs, and remove obsolete mock data and unused assets
  - [ ] 4.1 Run lint and full test suite; fix any failing tests or runtime errors from API switch.
  - [ ] 4.2 Verify critical flows against backend (modules overview → theme → tutorial → practice → summary → reflection, login/profile/medal) and patch regressions.
  - [ ] 4.3 Remove deprecated mock artifacts (`lib/api/mockData.ts`, mock-specific helpers, `docs/course_content.json` if unused) and clean up toggles no longer needed in production.
  - [ ] 4.4 Update README with new setup (required env vars, backend dependency) and ensure tasks file checkboxes reflect completed work.
