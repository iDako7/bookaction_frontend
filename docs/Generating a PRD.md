# Generating a PRD

## Goal

To guide an AI assistant in creating a detailed Product Requirements Document (PRD) in Markdown format, based on an initial user prompt. The PRD should be clear, actionable, and suitable for a junior engineer or a simple AI model to understand and implement the feature.

## Context Handling

- The user will provide relevant project documentation or specifications
- Review all provided context thoroughly before asking clarifying questions
- Reference specific sections of source documents when relevant
- Align the PRD with any existing project vision or phase definitions

## Process

 **Receive Initial Prompt:** The user provides a brief description or request for a new feature or functionality.

1. **Review Context:** Examine any provided documentation to understand the project scope and existing specifications.
2. **Ask Clarifying Questions:** Before writing the PRD, the AI *must* ask clarifying questions to gather sufficient detail. The goal is to understand the "what" and "why" of the feature, not necessarily the "how" (which the developer will figure out).
3. **Generate PRD:** Based on the initial prompt, context documents, and the user's answers to clarifying questions, generate a PRD using the structure outlined below.
4. **Iterate:** Refine the PRD based on user feedback.
5. **Generate PRD:** Generate the document on markdown.

## Clarifying Questions (Guidelines)

- First, check if answers exist in provided documentation
- Ask questions that fill gaps not covered in existing specs
- Adapt questions based on the feature type (e.g., UI component vs backend service)
- For later phases, ask about dependencies on previous phases

### Example Questions to Consider:

* **Problem/Goal:** "What problem does this feature solve for the user?" or "What is the main goal we want to achieve with this feature?"
* **Target User:** "Who is the primary user of this feature?"
* **Core Functionality:** "Can you describe the key actions a user should be able to perform with this feature?"
* **User Stories:** "Could you provide a few user stories? (e.g., As a [type of user], I want to [perform an action] so that [benefit].)"
* **Acceptance Criteria:** "How will we know when this feature is successfully implemented? What are the key success criteria?"
* **Scope/Boundaries:** "Are there any specific things this feature *should not* do (non-goals)?"
* **Data Requirements:** "What kind of data does this feature need to display or manipulate?"
* **Design/UI:** "Are there any existing design mockups or UI guidelines to follow?" or "Can you describe the desired look and feel?"
* **Edge Cases:** "Are there any potential edge cases or error conditions we should consider?"
* **Dependencies:** "Does this feature depend on any other features or systems?"
* **Performance:** "Are there any specific performance requirements or constraints?"

## PRD Structure

The generated PRD should include the following sections:

1. **Version/Phase:** Clearly indicate which phase or version this PRD covers
2. **Introduction/Overview:** Briefly describe the feature and the problem it solves. State the goal.
3. **Goals:** List the specific, measurable objectives for this feature.
4. **User Stories:** Detail the user narratives describing feature usage and benefits.
5. **Functional Requirements:** List the specific functionalities the feature must have. Use clear, concise language (e.g., "The system must allow users to upload a profile picture."). Number these requirements.
6. **Non-Goals (Out of Scope):** Clearly state what this feature will *not* include to manage scope.
7. **Design Considerations (Optional):** Link to mockups, describe UI/UX requirements, or mention relevant components/styles if applicable.
8. **Technical Considerations (Optional):** Mention any known technical constraints, dependencies, or suggestions (e.g., "Should integrate with the existing Auth module").
9. **Dependencies:** List any dependencies on other features, phases, or external systems.
10. **Assumptions:** List any assumptions made during PRD creation that should be validated.
11. **Success Metrics:** How will the success of this feature be measured? (e.g., "Increase user engagement by 10%", "Reduce support tickets related to X").
12. **MVP Validation Criteria:** List the key validation points that confirm the feature is functioning correctly.
13. **Related PRDs:** Reference other related PRD documents if applicable.

## Scope Clarity

- Be explicit about what constitutes "core" vs "nice-to-have" features
- For phased development, clearly indicate which phase this PRD addresses
- Reference but don't duplicate requirements from dependent phases

## Target Audience

Assume the primary reader of the PRD is a **junior developer**. Therefore, requirements should be explicit, unambiguous, and avoid jargon where possible. Provide enough detail for them to understand the feature's purpose and core logic.

## PRD Quality Checklist

Before finalizing, ensure the PRD:

<!-- PRD Quality Checklist -->
- [ ] Addresses a clear user problem
- [ ] Has measurable success criteria
- [ ] Contains no ambiguous requirements
- [ ] Specifies all critical user flows
- [ ] Identifies key edge cases
- [ ] Is achievable within project constraints
- [ ] Uses language suitable for junior developers
- [ ] Includes all sections from the PRD structure

## Output

* **Format:** Markdown (`.md`)

## Final Instructions
1. Always ask clarifying questions before writing.
2. Skip questions that are already answered in context.
3. Iterate on the PRD based on user feedback.
4. Ensure all requirements are testable and measurable.
5. Use clear, unambiguous language for junior developers.
6. Complete the PRD Quality Checklist before finalizing.