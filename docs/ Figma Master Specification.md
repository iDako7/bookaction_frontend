# **1. PROJECT OVERVIEW (From PRD v1.2)**

BookAction is a Duolingo-style web app that teaches relationship skills through structured learning modules.

Each module includes:

- A theme introduction
- Multiple concepts (intro → practice → summary)
- A final reflection stage
- A progress-based medal system

**MVP Includes:**

- 2 modules (mock data)
- Full user flow with gated concept progression
- Practice quizzes with immediate feedback
- Reflection view + optional response
- Medal page and essential-only profile page
- Backend API shapes prepared for easy swap-in

**Unified Learning-State Flow:**
Theme → Concept 1 (Intro → Practice → Summary) → Concept 2 → ... → Reflection → Module Complete

---

# **2. PAGE SYSTEM & DETAILED UI SPECIFICATIONS**

## **Learn Page**

- **Purpose:** Entry point with module list, themes, progress, concept lists
- **UI:** Header, vertical module cards, expandable concept lists
- **States:** Locked/unlocked concepts, completed states, skeletons

## **Module Theme Page**

- **Content:** title, story, image, prompt question
- **CTA:** Start Concept 1

## **Concept Intro (3-Screen Flow)**

- Part 1: Definition + Why It Works
- Part 2: Good Example
- Part 3: Bad Example
- Step indicator + next/back buttons

## **Practice Intro Page**

Short description + Start Practice button.

## **Practice Question Page**

- Single/multiple choice
- Submit → show correctness + explanation
- Next question button

## **Concept Summary Page**

- Summary text
- Next concept teaser

## **Next Concept Teaser Page**

CTA to start next concept.

## **Module Reflection Page**

- Congrats banner
- Prompt + optional textarea
- Submission optional
- Finish Module button

## **Module Completed Page**

Celebration + Back to Learn.

## **Medal Page**

- Appears when **all modules completed**
- Badge, completion %, streak

## **Profile Page**

Avatar, name, streak, completed concepts, optional stats.

---

# **3. DESIGN SYSTEM**

## **Color Palette**

- Primary: **#4F8CC9**
- Secondary: **#6CAEE0**
- Accent: **#F2A154**
- Background Light: **#FFFFFF**
- Background Dark: **#1A1A1A**
- Text Primary: **#1E1E1E**
- Text Secondary: **#4A4A4A**
- Disabled: **#9E9E9E**
- Success: **#4CAF50**
- Error: **#E74C3C**
- Warning: **#F5A623**
- Info: **#2E86C1**

## **Typography**

- Font: **Inter**
- Monospace: **JetBrains Mono**
- Sizes:
  - h1: 32px
  - h2: 28px
  - h3: 24px
  - body: 16px
  - small: 14px
- Weights: 400 / 500 / 700
- Line Heights: heading 1.3, body 1.6

## **Spacing (4px scale)**

4, 8, 16, 24, 32, 48

## **Component Styles**

### **Buttons**

- Primary: blue bg, white text
- Secondary: white bg, blue border
- Ghost: transparent
- Sizes: 32/40/48px

### **Inputs**

- 1px border #E0E0E0
- rounded-md
- focus border + ring

### **Cards**

- White bg, rounded-xl, padding 16px, shadow-sm

### **Border Radius**

4 / 8 / 12 / 16 px

### **Shadows**

sm / md / lg

## **Layout Grid**

- Max width: 1200px
- 12 columns
- 24px gutters
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536

---

# **4. API SHAPES (Frontend-Focused)**

Only include data JSON shapes used by UI.

## **GET /api/modules/overview**

```
{
  "modules": [
    {
      "id": number,
      "title": string,
      "theme": { "title": string, "context": string, "mediaUrl": string, "question": string },
      "progress": number,
      "concepts": [
        { "id": number, "title": string, "completed": boolean }
      ]
    }
  ]
}
```

## **GET /api/modules//theme**

```
{ "title": string, "context": string, "mediaUrl": string, "question": string }
```

## **GET /api/concepts//tutorial**

```
{
  "title": string,
  "definition": string,
  "whyItWorks": string,
  "tutorial": {
    "goodExample": { "story": string, "mediaUrl": string },
    "badExample": { "story": string, "mediaUrl": string }
  }
}
```

## **GET /api/concepts//quiz**

```
{
  "questions": [
    {
      "orderIndex": number,
      "question": string,
      "questionType": "single_choice" | "multiple_choice",
      "mediaUrl": string,
      "options": [string],
      "correctOptionIndex": [number],
      "explanation": string
    }
  ]
}
```

## **POST /api/quiz//answer**

Request:

```
{
  "responseType": string,
  "userId": number,
  "userAnswerIndices": [number],
  "timeSpent": number
}
```

Response:

```
{
  "userAnswerIndices": [...],
  "correctOptionIndices": [...],
  "score": number
}
```

## **GET /api/concepts//summary**

```
{
  "summaryContent": string,
  "nextConceptIntro": string
}
```

## **GET /api/modules//reflection**

```
{
  "type": "text",
  "prompt": string,
  "mediaUrl": string
}
```

---

# **5. FINAL INSTRUCTION FOR FIGMA AI**

Use this document as the **single source of truth** to generate:

- A full UI kit & component library
- All pages as separate screens
- All interactions exactly as specified
- Responsive layouts on a 12‑column grid
- Components aligned with BookAction design tokens
- Accessible, semantic, reusable UI
