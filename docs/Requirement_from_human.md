## Page hierarchy system
- Learn
	- Theme
	- Concept
		- concept_intro
		- practice
		- summary
	- Reflection
- Medal: no sub page
- Profile: design it for me, make sure it only has the essential part

## Page feature

### Learn page
```json
{
  "modules": [
    {
      "id": 13,
      "title": "Communication and Boundaries",
      "theme": {
        "title": "Late-Night Texting",
        "context": "At midnight, Sam's friend Jordan kept texting about a game. Exhausted but caring, Sam waited until morning to say, “I feel tired when I get texts after 11 PM.” Jordan understood and explained his anxiety. They agreed Jordan would text earlier, leaving both friends feeling heard and respected.",
        "mediaUrl": "/media/panda.png",
        "mediaType": "image",
        "question": "How would you handle a situation where a friend's communication habits clash with your needs?"
      },
      "progress": 25,
      "concepts": [
        { "id": 46, "title": "Using 'I' Statements to Express Feelings", "completed": true },
        { "id": 47, "title": "The Art of Active Listening", "completed": false },
        { "id": 48, "title": "Setting Boundaries and Saying 'No' Kindly", "completed": false },
        { "id": 49, "title": "Recognizing Feelings and Managing Emotions", "completed": false }
      ]
    }
  ]
}
```

1. display all the Themes, concepts within module like duolingo learn page. it should display the title and theme of each module, the name of each concept
	1. Theme should display in the learn page, while only display its title
2. learning path
	1. normally, if the user follow all the order, it should be
		1. learn theme of the entire module
		2. learn concept_1's intro
		3. finish concept_1's practice
		4. finish concept_1's summary
		5. repeat step 2-4 for each concept, until they finish all the concept in the module
		6. finish module's reflection
		7. repeat above steps to finish all the module
	2. don't allow user to finish concept 2 before concept 1, the previous concept is the latter's prerequisite.
	3. allow user to repeat learning concept


### module_theme
- **Purpose:** Provide the story, media asset, and hook question used to onboard the learner to a module.
- **Path Params:** `moduleId` (number)
- **Request:** `GET /api/modules/13/theme`
**Sample Response:**
```json
{
  "title": "Late-Night Texting",
  "context": "At midnight, Sam's friend Jordan kept texting about a game. Exhausted but caring, Sam waited until morning to say, “I feel tired when I get texts after 11 PM.” Jordan understood and explained his anxiety. They agreed Jordan would text earlier, leaving both friends feeling heard and respected.",
  "mediaUrl": "/media/panda.png",
  "mediaType": "image",
  "question": "How would you handle a situation where a friend's communication habits clash with your needs?"
}
```

### concept_intro
- **Purpose:** Deliver the instructional story, definition, and contrasting examples for a concept.
- page design: it should have 3 part with several pages as following
	- part_1: display definition and why it works
	- part_2: display the good example
	- part_3: display the bad example
- **Request:** `GET /api/concepts/46/tutorial`
**Sample Response:**
```json
{
  "title": "Using 'I' Statements to Express Feelings",
  "definition": "I statements are a communication tool that helps you express your feelings without blaming others by focusing on your own emotions and experiences",
  "whyItWorks": "Using 'I feel' instead of 'You did' prevents the other person from immediately getting defensive and provides clarity about what is bothering you and why",
  "tutorial": {
    "goodExample": {
      "story": "Maya felt upset when her sister borrowed her headphones without asking. Instead of yelling, she took a breath and said: 'I feel frustrated when my things are taken without permission because I was looking for them this morning. Can you please ask me next time?' Her sister apologized and promised to ask first.",
      "mediaUrl": "/media/panda.png"
    },
    "badExample": {
      "story": "Tom was angry about his friend canceling plans. He texted: 'You ALWAYS bail on me! You're such a flake and you obviously don't care about our friendship!' His friend felt attacked and they ended up in a huge argument that could have been avoided.",
      "mediaUrl": "/media/panda.png"
    }
  }
}
```

### concept_practice
- **Purpose:** List quiz questions tied to a concept, ordered by `order_index`.
- page design
	- an intro page to get user ready for practice
	- user should click submit button, then:
		- the correct answer and explanation will display in page
		- front-end should send user's response to back-end
- **Request:** `GET /api/concepts/46/quiz`
**Sample Response:**
```json
{
  "questions": [
    {
      "orderIndex": 1,
      "question": "Your friend keeps interrupting you during conversations. Which is the best 'I' statement to address this?",
      "questionType": "single_choice",
      "mediaUrl": "/media/panda.png",
      "options": [
        "You never let me finish talking!",
        "I feel frustrated when I'm interrupted because I lose my train of thought",
        "Stop being so rude all the time",
        "Why can't you just listen for once?"
      ],
      "correctOptionIndex": [1],
      "explanation": "This option follows the 'I feel [emotion] when [situation] because [reason]' formula and focuses on your experience without attacking the other person"
    },
    {
      "orderIndex": 2,
      "question": "What are the three key parts of an effective 'I' statement?",
      "questionType": "single_choice",
      "mediaUrl": "/media/panda.png",
      "options": [
        "Blame, accusation, demand",
        "Feeling, situation, reason",
        "Problem, person, punishment",
        "Complaint, criticism, consequence"
      ],
      "correctOptionIndex": [1],
      "explanation": "An effective 'I' statement includes: how you FEEL, the SITUATION that triggers it, and the REASON why it affects you"
    }
  ]
}
```

### concept_practice
- **Purpose:** Provide the wrap-up statement and teaser for the next concept.
- page design: display the summary and intro to next concept(if there is one). one or several pages as you recommend
- **Request:** `GET /api/concepts/46/summary`

**Sample Response:**
```json
{
  "summaryContent": "I statements help you express feelings without creating conflict. Remember the formula: 'I feel [emotion] when [situation] because [reason].' This approach takes responsibility for your emotions while clearly communicating your needs.",
  "nextConceptIntro": "Now that you can express your feelings clearly, let's explore how to truly listen when others share theirs."
}
```

### module_Reflection

- **Purpose:** Fetch the reflection prompt and optional media asset for the module exit experience.
- page_design: congratulate user finished the module and ask them to submit reflection(not mandatory ) 
- **Request:** `GET /api/modules/13/reflection`

### medal and profile page
design as you sugguse

## Front-end tech stack
**Core:**
next - Framework
react - UI library
typescript - Type safety
tailwindcss - Styling

**State & API:**
@tanstack/react-query - API calls, caching, loading states
zustand - Global state management
axios - HTTP requests

**Forms:**
react-hook-form - Form handling
@hookform/resolvers - Connect Zod to forms
zod - Schema validation (match backend DTOs)

**Shadcn/ui dependencies:**
clsx - Conditional classes
tailwind-merge - Merge Tailwind classes safely
class-variance-authority - Component variants