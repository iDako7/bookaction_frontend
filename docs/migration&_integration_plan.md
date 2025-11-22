**Next.js Migration Plan**

- Foundations: Create a Next.js App Router project with TypeScript, Tailwind, shadcn/ui; mirror existing global styles and assets; set up **app/(routes)** structure. Keep Vite app as reference during migration.
- Routing map:
  - **/** → Learn (modules list + progress)
  - **/modules/[moduleId]/theme**
  - **/concepts/[conceptId]/intro** → **/practice-intro** → **/practice** → **/summary**
  - **/modules/[moduleId]/reflection**
  - **/medal** (unlocks after all modules complete)
  - **/profile** (essential fields: avatar, name, streak, completed concepts, optional time)
    Use **order_index** for sequencing; keep **module.id**/**concept.id** for routing.
- UI port: Move existing cards/buttons/indicators; ensure theme/intro/practice/summary/reflection screens match PRD (intro 3-part flow, practice submit-before-feedback, summary uses **summaryContent** + **nextConceptIntro**, reflection view required but submission optional, module complete screen, medal gating). Preserve Figma styling.
- State layer: Add Zustand store with persist to localStorage for completions (theme/intro/practice/summary/reflection), timeSpent, streak, and concept gating. Lock concept N until concept N-1 summary; reflection unlock after last concept; completions persist across refresh; allow repeat without clearing completion flags.
- Data layer toggle: Add Axios client + React Query. Provide a provider toggle (mock vs API). Mock data updated to API shapes (**mediaUrl**, **mediaType**, **summaryContent**, **nextConceptIntro**, **order_index**). Surface loading/error states.
- API integration (using docs as base):
  - GET **/api/modules/overview** for Learn.
  - GET **/api/modules/:id/theme**, **/api/concepts/:id/tutorial**, **/api/concepts/:id/quiz**, **/api/concepts/:id/summary**, **/api/modules/:id/reflection**.
  - POST **/api/quiz/:quizId/answer**, **/api/concepts/:id/progress**, **/api/modules/:id/reflection**.
    Respect **order_index** ordering; default **userId = 1** unless you supply one.
- Gating/edge cases:
  - Refresh on summary keeps you there (state from URL + persisted store).
  - Skipping summary → concept not completed; restart from intro.
  - Reopen theme anytime; completion stays.
  - Module lock until prior module done; medal unlock only after all modules complete.
- Testing/QA: Lint/build; smoke flows for learn → theme → concept intro → practice → summary → next concept → reflection → medal; verify persistence after refresh; validate API error/empty states; light unit tests for gating helpers (order enforcement, medal unlock).
