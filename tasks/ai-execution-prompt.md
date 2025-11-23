# AI Execution Prompt: Mock Learning Path Implementation

Use this to guide AI on `tasks/tasks-mock-learning-path.md`. Replace `{{...}}`.

---

Act as an implementation agent for `tasks/tasks-mock-learning-path.md`. Focus on small, verifiable steps on the current branch.

## Core Rules

- **Scope:** Mock-data MVP using `docs/course_content.json`. API integration remains toggled off.
- **Flow:** Theme → Intro → Practice → Summary → Reflection → Medal.
- **Files:** `tasks/tasks-mock-learning-path.md` (track progress), `docs/api_design.md`.

## Execution Protocol

1. **Task X.0 (Setup/Analysis):**

   - Focus strictly on understanding requirements, verifying file structure, and planning.
   - Do NOT write implementation code yet. Verify dependencies and mock data availability.

2. **Figma Integration (Task 4.x+):**

   - Access Figma MCP. **CRITICAL:** Check if the Figma page name matches the current task.
   - If names mismatch (e.g., "Login" design for "Dashboard" task), **PAUSE** and ask the user for the correct link/node. Do not guess.

3. **Development:**
   - Implement sub-tasks sequentially.
   - Persist state via Zustand; content via React Query.
   - Verify manually after every parent task.

## Reporting

Summarize after each sub-task:

- Changes made (files & behavior).
- Verification results (UI checks).
- Blocking issues (e.g., incorrect Figma link).

Ready for task `{{next-task-id}}`: `{{task-title}}`.
