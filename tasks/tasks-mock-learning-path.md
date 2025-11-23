# Context & instructions

- Scope: mock-data-only MVP. Follow gated flow theme → concept intro/practice/summary → reflection; medal unlock after all modules; profile/medal remain essential-only.
- Use mock provider mapped from `docs/course_content.json`; API toggle stays mocked for this version.
- Follow `docs/rules/task_generate_rule.md`; keep sub-tasks tiny and independently verifiable. Each parent task should be manually checkable in the UI when done.
- Figma MCP links: request them from the user when starting page integration (task 4.x onward); each page has its own link.

## Relevant Files

- `app/layout.tsx` - Global layout, fonts, theme providers, shared nav.
- `app/page.tsx` - Root routing (likely redirect to `/learn`).
- `app/learn/page.tsx` & `app/learn` components - Module list UI, expansion, lock states, navigation triggers.
- `app/module/[moduleId]/theme/page.tsx` - Theme intro page rendering story/media/question.
- `app/module/[moduleId]/concept/[conceptId]/intro/page.tsx` - 3-step concept intro flow with navigation controls.
- `app/module/[moduleId]/concept/[conceptId]/practice/(intro|question)/page.tsx` - Practice intro + questions with submit/feedback.
- `app/module/[moduleId]/concept/[conceptId]/summary/page.tsx` - Summary content + optional next concept teaser.
- `app/module/[moduleId]/reflection/page.tsx` - Reflection prompt and completion CTA.
- `app/module/[moduleId]/complete/page.tsx` - Module completion/celebration view.
- `app/medal/page.tsx` - Medal unlock page.
- `app/profile/page.tsx` - Essential profile view.
- `lib/mockData.ts` (or similar) - Load `docs/course_content.json` in API-shaped mock provider.
- `lib/api/client.ts` & `lib/api/mockProvider.ts` - Axios client + mock fetchers for React Query toggle.
- `lib/state/progressStore.ts` - Zustand store for learning state with LocalStorage persistence.
- `lib/hooks/useGating.ts` - Helpers to enforce order (theme → intro → practice → summary → reflection).
- `components/ui/*` - Shared UI (buttons, cards, stepper, progress bar, lock badges, media fallbacks).
- `components/learn/*` - Module list/accordion, concept rows, status chips.
- `components/concept/*` - Intro steps, practice question renderer, summary/teaser sections.
- `components/reflection/*` - Reflection prompt form, completion actions.
- `public/media/panda.png` and other assets - Media used across screens.
- `docs/course_content.json` - Source mock content.
- `docs/api_design.md` - API shapes to mirror for mock provider.

### Notes

- Keep mock-data-first scope; API integration stays behind a toggle.
- Practice supports single/multiple choice with correctness + explanation after submit.
- Gating: theme required before concept 1; concept N locked until concept N-1 summary; reflection unlocks after all summaries.
- Medal unlocks only after both modules completed (reflection viewed); Profile and Medal remain mock-only.
- Persist progress in LocalStorage via Zustand; React Query is source of truth for content.

## Tasks

- [x] 1.0 Project setup & scaffolding (verify: app boots, base layout visible)

  - [x] 1.1 Initialize Next.js (App Router) with TypeScript, Tailwind, Shadcn UI base if not already present.
  - [x] 1.2 Add core dependencies: `@tanstack/react-query`, `zustand`, `axios`, `react-hook-form`, `@hookform/resolvers`, `zod`, `clsx`, `tailwind-merge`, `class-variance-authority`.
  - [x] 1.3 Configure global layout with Inter font, base styles, and shared header/nav shell.
  - [x] 1.4 Set up React Query provider and Zustand persistence middleware.

- [x] 2.0 Mock data provider & API toggle (verify: mock endpoints return data in UI via React Query)

  - [x] 2.1 Map `docs/course_content.json` into mock endpoints matching API shapes (overview, theme, tutorial, quiz, summary, reflection).
  - [x] 2.2 Create Axios client + provider switch (mock vs API) configurable via env or flag.
  - [x] 2.3 Implement React Query hooks for modules, concept tutorial, quiz, summary, and reflection using the toggle.

- [x] 3.0 Progress state & gating utilities (verify: locks/unlocks behave correctly on refresh)

  - [x] 3.1 Define Zustand store for per-module/concept progress (intro/practice/summary/reflection flags) with LocalStorage persistence.
  - [x] 3.2 Implement helpers to compute lock/unlock status using `order_index` and completion state.
  - [x] 3.3 Add navigation guards/redirections to keep users in correct sequence; allow repeats of completed steps.

- [x] 4.0 Learn page (verify: list shows modules with lock/completion; request Figma MCP links before layout matching)

  - [x] 4.1 Build module list layout with progress indicators and media fallback.
  - [x] 4.2 Implement expandable module rows showing concepts with lock/completed states.
  - [x] 4.3 Wire CTA to theme page (mandatory before concept 1); respect gating on concept links.
  - [x] 4.4 Display skeleton/loading states while fetching overview data.

- [ ] 5.0 Module theme page (verify: theme content matches mock data; gated start to concept 1)

  - [ ] 5.1 Render theme title, context/story, image, and prompt question from mock data.
  - [ ] 5.2 Add CTA to start Concept 1; mark theme as completed when viewed.
  - [ ] 5.3 Provide back-to-learn navigation.

- [ ] 6.0 Concept intro (3-step) flow (verify: stepper advances; completion recorded)

  - [ ] 6.1 Build stepper UI for definition/why, good example, bad example with media fallbacks.
  - [ ] 6.2 Add next/back controls with progress indicator; enforce completion tracking when finishing step 3.
  - [ ] 6.3 Handle revisit scenarios (retain completed state, allow navigation to practice).

- [ ] 7.0 Practice flow (verify: questions render, submit works, progress saved)

  - [ ] 7.1 Create practice intro screen with start button and lock check.
  - [ ] 7.2 Render questions in `order_index` order; support single/multiple choice selection.
  - [ ] 7.3 Disable submit until an answer is chosen; on submit, show correctness + explanation and allow retry.
  - [ ] 7.4 Save user responses in mock state; advance to next question and mark practice complete when all questions submitted.

- [ ] 8.0 Summary & next concept teaser (verify: summary shows; next CTA respects locks)

  - [ ] 8.1 Display `summaryContent` for the concept; mark summary completion on view.
  - [ ] 8.2 If `nextConceptIntro` exists, show teaser CTA to next concept intro respecting lock rules.
  - [ ] 8.3 Support refresh persistence (stay on summary if reloaded).

- [ ] 9.0 Reflection & module completion (verify: reflection gated until all summaries; completion screen reachable)

  - [ ] 9.1 Unlock reflection only after all concept summaries completed; redirect otherwise.
  - [ ] 9.2 Render reflection prompt/media with optional textarea; mock-submit and mark viewed.
  - [ ] 9.3 Show module completion page with celebration + back-to-learn link; set module as completed.

- [ ] 10.0 Medal page (verify: remains gated until both modules completed)

  - [ ] 10.1 Gate medal access until all modules completed.
  - [ ] 10.2 Display badge name, level, completion %, and streak (mock data).

- [ ] 11.0 Profile page (verify: shows mock essentials; navigation works)

  - [ ] 11.1 Show avatar, name, streak, completed concepts count, and optional time spent (mock data).
  - [ ] 11.2 Link back to learn; keep scope to essentials only.

- [ ] 12.0 UI polish & components (verify: shared components match design tokens after receiving Figma MCP links)

  - [ ] 12.1 Implement shared components (buttons, cards, step indicators, progress bars, status chips, lock badges) using design tokens.
  - [ ] 12.2 Apply typography, spacing, and color palette per design system; ensure responsive grid behavior.
  - [ ] 12.3 Add media fallbacks (e.g., `/media/panda.png`) and accessibility labels.

- [ ] 13.0 QA & manual verification (verify: full gated flow passes with mock data; medal/profile reachable)

  - [ ] 13.1 Walk the full flow: Learn → Theme → Concept intro → Practice → Summary → Reflection → Module complete for both modules.
  - [ ] 13.2 Verify gating edge cases (refresh on summary, skip summary returns, reopen theme after completion, repeat concepts allowed).
  - [ ] 13.3 Confirm medal unlock after both modules; profile reachable; progress persists after reload.
  - [ ] 13.4 Spot-check API toggle still uses mock provider; no network calls required.
