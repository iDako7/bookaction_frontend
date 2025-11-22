## Relevant Files

- `docs/migration&_integration_plan.md` - Source migration map, routing, and gating requirements.
- `docs/PRD.md` - UI/UX expectations that must stay identical to the current front-end.
- `src/App.tsx` - Entry for the existing Vite app; reference for preserved flows and layout.
- `src/pages/` - Current screens (learn, theme, intro/practice/summary, reflection, medal, profile) to mirror in Next.js.
- `src/components/` - Shared UI components and styles to reuse for visual parity.
- `src/styles/`, `src/index.css` - Global styles to port for look-and-feel matching.
- `tasks/tasks-nextjs-migration.md` - Task tracker (update checkboxes as you progress).

### Notes

- The front-end is already generated; the Next.js migration must keep UI and UX identical to the current version. Use existing screens as the visual/interaction source of truth—no redesigns.
- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:

- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
- [ ] 1.0 Review current front-end and PRD to document the exact UI/UX to preserve (use existing Vite screens as the baseline)
- [ ] 2.0 Scaffold Next.js App Router foundation (TypeScript, Tailwind, shadcn/ui) mirroring current global styles/assets
- [ ] 3.0 Port all routes/screens to Next.js with identical UI/UX (learn, theme, intro→practice→summary, reflection, medal, profile)
- [ ] 4.0 Implement client state and persistence (Zustand + localStorage) for progress gating, streaks, and time tracking
- [ ] 5.0 Add data layer toggle with React Query + Axios aligned to API/mock shapes and media fields
- [ ] 6.0 Integrate API endpoints and submission flows with `order_index` gating and error/loading handling
- [ ] 7.0 Testing and QA (lint/build, parity checks against current front-end, unit tests for gating/medal helpers)
