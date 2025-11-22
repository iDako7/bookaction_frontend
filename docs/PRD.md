# Product Requirements Document (MVP)

## Version / Phase
- MVP: mock-data-first experience for two modules; API integration deferred behind a toggle.

## Introduction / Overview
- Build a Duolingo-like learning path for relationship skills: list modules, show theme intro, gated concept flows (intro → practice → summary), and module reflection. Medal and Profile are display-only, backed by front-end mocks.

## Goals
- Deliver a fully navigable learning path for the two seeded modules using front-end mocks only.
- Enforce concept order via prerequisites; allow repeat visits.
- Provide clear feedback on practice submissions (correctness + explanation).
- Surface Medal and Profile with essential info only (mock-backed).
- Prepare the UI/data layer so live API integration is a drop-in swap.

## User Stories
- As a learner, I see all modules with their themes and concept names so I can choose where to start.
- As a learner, I must complete concepts in order; I can revisit completed concepts anytime.
- As a learner, I can read a module theme intro (story + media + question) before concept 1.
- As a learner, I can step through a concept intro: definition/why it works, good example, bad example (with media).
- As a learner, I can take concept practice, submit answers, and see correctness + explanation.
- As a learner, I can read concept summaries and see what’s next.
- As a learner, I get a reflection prompt after finishing a module.
- As a learner, I can view my Medal and essential Profile info.

## Functional Requirements (Mock-First)
1. Learn page lists all modules from mock content (order by `order_index`), showing module title, theme title, and a progress stub.
2. Expanding a module shows its concepts with titles and completion state; prerequisite gating prevents starting concept N before N-1 is done.
3. Theme view shows module theme (title, context, media, question) before starting concept 1.
4. Concept intro flow has three parts: definition/why-it-works; good example (story + media); bad example (story + media); supports next/back navigation.
5. Practice flow: intro screen; render questions by `order_index`; support `single_choice` and `multiple_choice`; disable submit until an answer is selected; on submit, reveal correctness and explanation; call a mock response handler.
6. Summary flow: show `summary_content`; if `next_chapter_intro` exists, show a teaser page before returning to the path.
7. Reflection: after last concept, show congrats + module reflection prompt/media; reflection submission is optional (mock-only).
8. Navigation rules: concept repeat allowed; reflection unlocked only after all concepts; module completion only after reflection viewed/submitted (submission optional, viewing required).
9. Medal page: display-only mock medal (e.g., badge name, level, completion percent, streak); no edits.
10. Profile page: display-only mock essential info (name/avatar/streak/basic stats); no login/register or edit.
11. State: track completion (concept intro/practice/summary, module reflection) in Zustand with localStorage persistence, independent of backend IDs.
12. API toggle: central config to select mock provider vs real API later; default to mocks so the app runs without network.

## Non-Goals
- Auth (login/register), sharing, payments.
- Deep offline caching/sync beyond mock runtime.
- Real backend persistence for MVP.
- Rich profile editing or social features.

## Design Considerations
- Learn page inspired by Duolingo path: clear sequencing, lock states, progress indicators.
- Tone for teens–young adults (13–24): supportive, concise microcopy, clear next steps.
- Stack: Next.js, React, TypeScript, Tailwind, Shadcn UI. Show `/media/panda.png` with safe fallbacks.
- Practice UX: immediate feedback after submit; inline rationale; allow retry.

## Technical Considerations
- Data layer via React Query even for mocks (parity with future APIs).
- Mock provider matches API shapes: `/api/modules/{id}/theme`, `/api/concepts/{id}/tutorial`, `/api/concepts/{id}/quiz`, `/api/concepts/{id}/summary`, `/api/modules/{id}/reflection`.
- ID-agnostic: resolve concepts/modules by `order_index`/title from `docs/course_content.json`; do not hardcode numeric IDs.
- State machine per concept (locked → intro → practice → summary → done); guard routes and buttons accordingly.
- Multiple-choice supports multi-select before submit; evaluation uses `correct_option_index` array.
- Error/empty states: graceful fallback if mock content missing fields.

## Dependencies
- Content source: `docs/course_content.json` (two modules; `order_index` 1 = Communication and Boundaries, `order_index` 2 = Healthy vs. Unhealthy Relationships).
- Future: backend APIs for modules/concepts/reflection; Medal/Profile APIs to be added later.

## Assumptions
- Two modules are sufficient for MVP; future modules follow the same schema.
- Media assets resolve locally; fallback placeholder if not.
- Question types limited to single or multiple choice.

## Success Metrics (Usability)
- Task success: % completing a concept flow (intro → practice submit → summary) without dead ends.
- Efficiency: median time per concept flow within target window (e.g., 4–6 minutes).
- Errors/friction: invalid submissions or blocked navigation <5% of attempts.
- Perceived ease: post-session ease rating averages ≥4/5.
- Findability: ≥90% can reach Medal and Profile from Learn without guidance.

## MVP Validation Criteria
- Both modules render; Module 1 available first by default; Module 2 visible in path.
- Gating works: cannot open later concept before prior summary; completed concepts can be reopened.
- Practice submit reveals correctness and explanation; multi-select works where defined.
- Completion persists across page refresh via localStorage.
- Reflection unlocks after last concept; viewing is required, submission optional.
- Medal/Profile render from mocks; no auth prompts.

## Related PRDs
- None; this document is standalone for the learning experience MVP.

## PRD Quality Checklist
- [x] Addresses a clear user problem
- [x] Has measurable success criteria
- [x] Contains no ambiguous requirements
- [x] Specifies all critical user flows
- [x] Identifies key edge cases
- [x] Is achievable within project constraints
- [x] Uses language suitable for junior developers
- [x] Includes all sections from the PRD structure
