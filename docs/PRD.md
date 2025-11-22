# BookAction Front-End PRD v1.2

## Version / Phase

- **MVP: mock-data-first experience for two modules; API integration behind a toggle.**

## Introduction / Overview

**Build a Duolingo-like web learning path for relationship skills: show modules, theme intro, concept flows (intro → practice → summary), and module reflection. Medal and Profile remain mock-only.**

## Goals

- **Deliver fully navigable learning path for two modules using mock data.**
- **Enforce concept order with prerequisites; allow repeat.**
- **Provide correctness + explanation for practice.**
- **Show Medal and Profile essential info only.**
- **Keep architecture ready for API drop‑in.**

## Unified Learning-State System

**Module flow:** \*\*
\*\*`theme → concept_1 (intro → practice → summary) → concept_2 → ... → reflection → done`

**Theme is mandatory before concept 1.** \*\*
\*\*Reflection unlocks only when all concepts are completed (summary reached).

## User Stories

**(unchanged)**

## Functional Requirements (Updated)

1. **Learn page shows all modules with titles, theme titles, and progress.**
2. **Expanding a module lists concepts and their completion; concept N is locked until N‑1 summary is completed.**
3. **Theme view shown before concept_1; can be revisited anytime.**
4. **Concept intro has 3 parts: definition/why, good example, bad example.**
5. **Practice flow:**
   - **Intro screen.**
   - **Render questions in **`order_index` order.
   - **Supports single/multiple choice.**
   - **Submit disabled until answer chosen.**
   - **On submit, reveal correctness + explanation.**
   - **Save user response (mock for MVP).**
6. **Summary flow:**
   - **Show **`summaryContent` (camelCase).
   - **If **`nextConceptIntro` exists, show teaser page.
7. **Reflection:**
   - **Unlocks after last concept.**
   - **Viewing required.**
   - **Submission optional (mock only).**
8. **Navigation rules:**
   - **Concept repeat allowed.**
   - **Theme + concepts remain marked completed forever once completed.**
   - **Module completion only when reflection is viewed.**
9. **Medal page:**
   - **Unlocks \*\***after ALL modules\*\* are completed.
   - **Shows: badge name, level, completion %, streak.**
10. **Profile page:**

- **Essential fields: avatar, name, streak, completed concepts, total time spent (optional).**

11. **Single source of truth (IMPORTANT):**

- **React Query → fetch content (mock or API)**
- **Zustand → track progress (intro/practice/summary/reflection)**
- **LocalStorage → persist Zustand state**

12. **API toggle: mock provider vs real API.**

## Gating Edge Cases (New)

- **Refresh on summary page:** stay on same page.
- **Skip summary and return to Learn:** allowed; concept not marked complete; restarting begins from intro.
- **Reopen theme after module completion:** allowed; previous completion states stay completed.
- **Medal unlock timing:** after finishing **all modules**, not per-module.

## Data Shape Alignment (New)

- **Use backend camelCase fields:**
  - `summaryContent`
  - `nextConceptIntro`
- **Use **`concept.id` and `module.id` for routing.
- **Use **`order_index` only for ordering and gating logic.

## Design Considerations

**(unchanged)**

## Technical Considerations (Updated)

- **Mock provider matches API shape:** \*\*
  \*\*`/api/modules/{id}/theme`, `/api/concepts/{id}/tutorial`, `/api/concepts/{id}/quiz`, `/api/concepts/{id}/summary`, `/api/modules/{id}/reflection`
- **Remove "ID‑agnostic"; use backend IDs for routing.**
- **State machine: locked → intro → practice → summary → done.**
- **Multi-select based on **`correctOptionIndex`.

## Front-End Tech Stack (Added)

**Core:**

- **Next.js (App Router) **
- **React **
- **TypeScript **
- **TailwindCSS **
- **Shadcn/UI **

**State & API:**

- **@tanstack/react-query **
- **Zustand **
- **Axios **

**Forms:**

- **react-hook-form **
- **@hookform/resolvers **
- **Zod **

**Utilities:**

- **clsx **
- **tailwind-merge **
- **class-variance-authority **

## Dependencies

**(unchanged)**

## Assumptions

**(unchanged)**

## Success Metrics

**(unchanged)**

## MVP Validation Criteria (Updated)

- **Gating works including edge cases.**
- **Reflection unlock behaves as specified.**
- **Medal unlocks after all modules complete.**
- **LocalStorage persistence works for progress state.**
