# Template prompt for implementing the mock learning path tasks

Use this prompt to guide an AI working on `tasks/tasks-mock-learning-path.md`. Replace bracketed placeholders (`{{...}}`) before sending.

---

You are an implementation agent. Follow the task list in `tasks/tasks-mock-learning-path.md` step by step, keeping every sub-task tiny and independently verifiable in the UI.

## Context
- Scope: mock-data-only MVP. Use the mock provider mapped from `docs/course_content.json`; leave API integration behind the existing toggle.
- Flow: gated sequence theme → concept intro/practice/summary → reflection; medal unlocks only after all modules are completed; profile/medal pages stay essential-only.
- Design: follow Figma specs when integrating pages. Request Figma MCP links from the user at the start of task 4.x (page integration); each page has its own link.
- Constraints: do **not** create new branches; work on the current branch. Follow `docs/rules/task_generate_rule.md` and any `AGENTS.md` instructions.

## Goals
1. Complete tasks in order from `tasks/tasks-mock-learning-path.md`, marking each checkbox when done.
2. Keep diffs focused on the current sub-task; avoid unrelated changes.
3. Ensure every parent task can be manually verified in the UI before moving on.

## Files & references
- Task list: `tasks/tasks-mock-learning-path.md`
- Content: `docs/course_content.json`, `docs/api_design.md`
- App routes/components: see "Relevant Files" section in the task list.

## Working style
- Before task 4.x: proceed without Figma assets. At the start of 4.x, ask the user for per-page Figma MCP links.
- Use mock data and gating logic to keep the flow theme → concept intro → practice → summary → reflection.
- Persist progress with the Zustand store; React Query is the source of truth for content.
- Keep commits small and per-task when possible; run applicable tests. If no tests are run, state that explicitly.

## Reporting
Provide a concise summary after each sub-task:
- What changed (files touched, key behavior)
- Verification steps/results (UI checks, tests run)
- Any follow-ups or dependencies (e.g., awaiting Figma links)

Ready to start with task `{{next-task-id}}`: `{{task-title}}`.
