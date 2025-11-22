// Mock data matching API shapes from the specification

export interface Module {
  id: number;
  title: string;
  theme: {
    title: string;
    context: string;
    mediaUrl: string;
    question: string;
  };
  progress: number;
  concepts: {
    id: number;
    title: string;
    completed: boolean;
  }[];
}

export interface ConceptTutorial {
  title: string;
  definition: string;
  whyItWorks: string;
  tutorial: {
    goodExample: {
      story: string;
      mediaUrl: string;
    };
    badExample: {
      story: string;
      mediaUrl: string;
    };
  };
}

export interface QuizQuestion {
  orderIndex: number;
  question: string;
  questionType: 'single_choice' | 'multiple_choice';
  mediaUrl: string;
  options: string[];
  correctOptionIndex: number[];
  explanation: string;
}

export interface ConceptQuiz {
  questions: QuizQuestion[];
}

export interface ConceptSummary {
  keyPoints: string[];
  nextSteps: string;
}

export interface ModuleReflection {
  type: 'text';
  prompt: string;
  mediaUrl: string;
  guidancePoints: string[];
}

// Mock Modules Data
export const modulesData: Module[] = [
  {
    id: 1,
    title: 'Active Listening',
    theme: {
      title: 'A Tale of Two Relationships',
      context: 'Aisha notices her two friends experiencing very different relationships. Emily and Kai communicate calmly, trust each other, and respect each other\'s independence. Zoe and Ryan, however, show patterns of control and fear—Zoe cancels plans, feels pressured to respond instantly, and becomes anxious when Ryan blames or intimidates her. These differences help Aisha understand what healthy and unhealthy relationships look like in real life.',
      mediaUrl: 'https://images.unsplash.com/photo-1758525865627-afc184e0e2c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0d28lMjBmcmllbmRzJTIwdGFsa2luZyUyMGNvbW11bmljYXRpb258ZW58MXx8fHwxNzYzNzc1NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      question: 'How do trust, independence, and communication influence the health of a relationship?'
    },
    progress: 0,
    concepts: [
      { id: 1, title: 'Reflective Listening', completed: false },
      { id: 2, title: 'Non-Verbal Cues', completed: false },
      { id: 3, title: 'Asking Open Questions', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Expressing Needs',
    theme: {
      title: 'Learning to Speak Up',
      context: 'Marcus has always struggled to express what he needs in his relationships. He watches his colleague Jamie confidently set boundaries at work while maintaining positive relationships. Meanwhile, Marcus finds himself overwhelmed, saying "yes" to everything and growing increasingly resentful. Through observing these different approaches, Marcus begins to understand that expressing needs clearly is not only acceptable—it\'s essential for sustainable, healthy connections.',
      mediaUrl: 'https://images.unsplash.com/photo-1724713044232-6c3e7bbc7079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHByZXNzaW5nJTIwZmVlbGluZ3MlMjBlbW90aW9uc3xlbnwxfHx8fDE3NjM3NzU2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      question: 'What prevents you from clearly expressing your needs in relationships? What might change if you did?'
    },
    progress: 0,
    concepts: [
      { id: 4, title: 'Identifying Your Needs', completed: false },
      { id: 5, title: 'Using "I" Statements', completed: false },
      { id: 6, title: 'Setting Boundaries', completed: false }
    ]
  }
];

// Mock Concept Tutorials
export const conceptTutorials: { [key: number]: ConceptTutorial } = {
  1: {
    title: 'Reflective Listening',
    definition: 'Reflective listening is the practice of repeating back what you\'ve heard in your own words to confirm understanding and show that you\'re engaged.',
    whyItWorks: 'When you reflect back what someone says, it validates their feelings and ensures you\'re both on the same page. This simple technique reduces misunderstandings and makes the other person feel truly heard and valued.',
    tutorial: {
      goodExample: {
        story: 'Alex: "I\'ve been feeling overwhelmed with work lately."\n\nJordan: "It sounds like you\'re dealing with a lot of stress from your job right now. That must be really challenging."\n\nBy reflecting back Alex\'s feelings, Jordan shows genuine understanding and creates space for deeper conversation.',
        mediaUrl: 'https://images.unsplash.com/photo-1759593047650-60328e9356ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RpdmUlMjBsaXN0ZW5pbmclMjBjb252ZXJzYXRpb258ZW58MXx8fHwxNzYzNzc1NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      badExample: {
        story: 'Alex: "I\'ve been feeling overwhelmed with work lately."\n\nJordan: "Yeah, work is tough for everyone. You should try working out more, that always helps me."\n\nJordan immediately shifts to giving advice without acknowledging Alex\'s feelings, which can make Alex feel dismissed.',
        mediaUrl: 'https://images.unsplash.com/photo-1758523673044-113d1e6688fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mbGljdCUyMGFyZ3VtZW50JTIwY29tbXVuaWNhdGlvbnxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  },
  2: {
    title: 'Non-Verbal Cues',
    definition: 'Non-verbal cues are the unspoken signals we send and receive through body language, facial expressions, tone of voice, and physical proximity.',
    whyItWorks: 'Studies show that up to 93% of communication is non-verbal. By paying attention to body language and tone, you can understand the full message someone is conveying, including emotions they might not be expressing in words.',
    tutorial: {
      goodExample: {
        story: 'During a conversation, Sam notices their partner\'s arms are crossed and they\'re looking away. Sam says, "I notice you seem tense. Is something bothering you?"\n\nThis shows Sam is paying attention beyond just words and creating space for honest communication.',
        mediaUrl: 'https://images.unsplash.com/photo-1626447269096-f8665509589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb21tdW5pY2F0aW5nJTIwcG9zaXRpdmVseXxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      badExample: {
        story: 'During a conversation, Sam\'s partner has crossed arms and is looking away, but says "I\'m fine." Sam replies, "Great!" and continues talking.\n\nBy ignoring the non-verbal cues that contradict the words, Sam misses an opportunity to address what\'s really going on.',
        mediaUrl: 'https://images.unsplash.com/photo-1758523673044-113d1e6688fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mbGljdCUyMGFyZ3VtZW50JTIwY29tbXVuaWNhdGlvbnxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  },
  3: {
    title: 'Asking Open Questions',
    definition: 'Open questions are questions that can\'t be answered with just "yes" or "no." They invite elaboration and encourage the other person to share more deeply.',
    whyItWorks: 'Open questions show genuine curiosity and give people the freedom to express themselves fully. They lead to richer conversations and help you understand the other person\'s perspective, feelings, and experiences more completely.',
    tutorial: {
      goodExample: {
        story: 'Instead of asking "Did you have a good day?" (closed question), ask "What was the best part of your day?" or "How are you feeling about what happened today?"\n\nThese questions invite your partner to share more and show you\'re interested in their experience.',
        mediaUrl: 'https://images.unsplash.com/photo-1626447269096-f8665509589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb21tdW5pY2F0aW5nJTIwcG9zaXRpdmVseXxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      badExample: {
        story: 'Person A: "Did you like the movie?"\nPerson B: "Yeah."\nPerson A: "Was it good?"\nPerson B: "Uh-huh."\n\nClosed questions lead to minimal responses and don\'t create opportunities for meaningful conversation.',
        mediaUrl: 'https://images.unsplash.com/photo-1758523673044-113d1e6688fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mbGljdCUyMGFyZ3VtZW50JTIwY29tbXVuaWNhdGlvbnxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  },
  4: {
    title: 'Identifying Your Needs',
    definition: 'Identifying your needs means recognizing and understanding what you require emotionally, physically, and mentally to feel fulfilled and respected in your relationships.',
    whyItWorks: 'You can\'t communicate what you don\'t know. By getting clear on your own needs, you can express them more effectively and work with others to find solutions that work for everyone.',
    tutorial: {
      goodExample: {
        story: 'Taylor notices feeling resentful after always being the one to plan activities. They realize, "I need my partner to take initiative sometimes and show they\'re invested in our time together."\n\nBy identifying this specific need, Taylor can now communicate it clearly.',
        mediaUrl: 'https://images.unsplash.com/photo-1635357812542-1105b4d38c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0aGlua2luZyUyMHJlZmxlY3Rpb258ZW58MXx8fHwxNzYzNzc1NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      badExample: {
        story: 'Taylor feels upset but can\'t pinpoint why. They think "I just wish things were different" but never identify what they actually need.\n\nWithout identifying the specific need, Taylor can\'t communicate it, and the situation is unlikely to improve.',
        mediaUrl: 'https://images.unsplash.com/photo-1758523673044-113d1e6688fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mbGljdCUyMGFyZ3VtZW50JTIwY29tbXVuaWNhdGlvbnxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  },
  5: {
    title: 'Using "I" Statements',
    definition: '"I" statements are a communication technique where you express your feelings and needs from your own perspective, focusing on your experience rather than blaming the other person.',
    whyItWorks: '"I" statements reduce defensiveness because they describe your feelings without attacking. Instead of "You never listen to me," saying "I feel unheard when I\'m interrupted" makes it easier for the other person to respond with empathy.',
    tutorial: {
      goodExample: {
        story: 'Morgan says: "I feel hurt when plans change at the last minute because I value our time together and get excited about our plans."\n\nThis expresses Morgan\'s feelings and needs without blaming, making it easier to have a productive conversation.',
        mediaUrl: 'https://images.unsplash.com/photo-1626447269096-f8665509589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb21tdW5pY2F0aW5nJTIwcG9zaXRpdmVseXxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      badExample: {
        story: 'Morgan says: "You always cancel our plans! You clearly don\'t care about spending time with me."\n\nThis puts the other person on the defensive and makes assumptions about their intentions, likely escalating conflict.',
        mediaUrl: 'https://images.unsplash.com/photo-1758523673044-113d1e6688fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mbGljdCUyMGFyZ3VtZW50JTIwY29tbXVuaWNhdGlvbnxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  },
  6: {
    title: 'Setting Boundaries',
    definition: 'Setting boundaries means clearly communicating your limits—what you\'re comfortable with and what you\'re not—in a respectful but firm way.',
    whyItWorks: 'Boundaries protect your well-being and help others understand how to treat you. They prevent resentment from building up and create healthier, more sustainable relationships where both people\'s needs are respected.',
    tutorial: {
      goodExample: {
        story: 'Casey says: "I need some alone time in the evenings to recharge. Can we plan to have dinner together but then I\'ll take an hour for myself?"\n\nThis clearly states a boundary while also offering a compromise, showing respect for both people\'s needs.',
        mediaUrl: 'https://images.unsplash.com/photo-1626447269096-f8665509589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb21tdW5pY2F0aW5nJTIwcG9zaXRpdmVseXxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      badExample: {
        story: 'Casey feels smothered but never says anything. They start making excuses to avoid their partner, leading to confusion and hurt feelings.\n\nWithout setting clear boundaries, Casey\'s needs aren\'t met and the relationship suffers.',
        mediaUrl: 'https://images.unsplash.com/photo-1758523673044-113d1e6688fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mbGljdCUyMGFyZ3VtZW50JTIwY29tbXVuaWNhdGlvbnxlbnwxfHx8fDE3NjM3NzU2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  }
};

// Mock Concept Quizzes
export const conceptQuizzes: { [key: number]: ConceptQuiz } = {
  1: {
    questions: [
      {
        orderIndex: 0,
        question: 'Your friend says "I\'m so frustrated with my job." What is the BEST reflective listening response?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'You should just quit if you hate it that much.',
          'It sounds like work has been really stressful for you lately.',
          'Everyone feels that way sometimes.',
          'Have you tried talking to your boss?'
        ],
        correctOptionIndex: [1],
        explanation: 'Reflective listening means paraphrasing what you heard to show understanding. "It sounds like work has been really stressful" validates their feeling without jumping to advice or dismissing their experience.'
      },
      {
        orderIndex: 1,
        question: 'Which of these are key elements of reflective listening? (Select all that apply)',
        questionType: 'multiple_choice',
        mediaUrl: '',
        options: [
          'Paraphrasing what you heard',
          'Immediately offering solutions',
          'Acknowledging emotions',
          'Checking for understanding'
        ],
        correctOptionIndex: [0, 2, 3],
        explanation: 'Reflective listening involves paraphrasing, acknowledging emotions, and checking understanding. Offering immediate solutions isn\'t reflective listening—it\'s jumping to fix mode before fully understanding.'
      }
    ]
  },
  2: {
    questions: [
      {
        orderIndex: 0,
        question: 'During a conversation, your partner is smiling but their arms are crossed and they\'re leaning away. What should you pay attention to?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'Only the smile—they seem happy',
          'Only the words they\'re saying',
          'The contradiction between their smile and closed body language',
          'Nothing—you\'re overthinking it'
        ],
        correctOptionIndex: [2],
        explanation: 'When verbal and non-verbal cues don\'t match, the non-verbal signals are usually more truthful. Crossed arms and leaning away suggest discomfort or defensiveness, despite the smile.'
      },
      {
        orderIndex: 1,
        question: 'Which non-verbal cues typically indicate someone is engaged and listening? (Select all that apply)',
        questionType: 'multiple_choice',
        mediaUrl: '',
        options: [
          'Maintaining eye contact',
          'Checking their phone',
          'Nodding occasionally',
          'Facing toward you'
        ],
        correctOptionIndex: [0, 2, 3],
        explanation: 'Eye contact, nodding, and facing toward someone all signal engagement and active listening. Checking a phone signals distraction and disengagement.'
      }
    ]
  },
  3: {
    questions: [
      {
        orderIndex: 0,
        question: 'Which of these is an OPEN question?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'Did you have a good day?',
          'Are you feeling better?',
          'What was going through your mind when that happened?',
          'Do you agree with me?'
        ],
        correctOptionIndex: [2],
        explanation: 'Open questions can\'t be answered with yes/no and invite elaboration. "What was going through your mind?" encourages the person to share their thoughts and feelings in detail.'
      },
      {
        orderIndex: 1,
        question: 'Why are open questions more effective than closed questions in deepening conversations?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'They\'re easier to answer',
          'They invite detailed responses and show genuine interest',
          'They can be answered more quickly',
          'They don\'t require much thought'
        ],
        correctOptionIndex: [1],
        explanation: 'Open questions invite detailed responses and demonstrate genuine curiosity about the other person\'s experience, leading to deeper and more meaningful conversations.'
      }
    ]
  },
  4: {
    questions: [
      {
        orderIndex: 0,
        question: 'You feel upset after a conversation but can\'t explain why. What\'s the BEST first step?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'Ignore the feeling—it will pass',
          'Immediately confront the other person',
          'Take time to reflect and identify what need wasn\'t met',
          'Vent to someone else about it'
        ],
        correctOptionIndex: [2],
        explanation: 'Before you can communicate effectively, you need to understand your own needs. Taking time to reflect helps you identify what\'s actually bothering you so you can address it constructively.'
      },
      {
        orderIndex: 1,
        question: 'Which of these are valid emotional needs in relationships? (Select all that apply)',
        questionType: 'multiple_choice',
        mediaUrl: '',
        options: [
          'Feeling heard and understood',
          'Having your partner read your mind',
          'Feeling appreciated and valued',
          'Having some autonomy and independence'
        ],
        correctOptionIndex: [0, 2, 3],
        explanation: 'Feeling heard, appreciated, and having autonomy are all valid needs. Expecting someone to read your mind isn\'t realistic—we need to communicate our needs clearly.'
      }
    ]
  },
  5: {
    questions: [
      {
        orderIndex: 0,
        question: 'Which statement is the BEST example of an "I" statement?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'You never help with household chores!',
          'I feel overwhelmed when I\'m doing all the chores alone.',
          'You\'re so lazy.',
          'Why don\'t you ever contribute around here?'
        ],
        correctOptionIndex: [1],
        explanation: 'An "I" statement focuses on your feelings and experience: "I feel overwhelmed when..." describes your emotional state without blaming or attacking the other person.'
      },
      {
        orderIndex: 1,
        question: 'What makes "I" statements more effective than "You" statements?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'They make the other person feel guilty',
          'They\'re shorter and easier to say',
          'They reduce defensiveness by focusing on your experience',
          'They avoid conflict entirely'
        ],
        correctOptionIndex: [2],
        explanation: '"I" statements reduce defensiveness because they describe your feelings without blaming. This makes it easier for the other person to hear you and respond with empathy rather than defensiveness.'
      }
    ]
  },
  6: {
    questions: [
      {
        orderIndex: 0,
        question: 'Your partner wants to spend every evening together, but you need alone time. What\'s the BEST way to set this boundary?',
        questionType: 'single_choice',
        mediaUrl: '',
        options: [
          'Start avoiding them without explanation',
          'Say "I need two evenings a week to myself to recharge. Can we plan which nights work for both of us?"',
          'Tell them they\'re being too clingy',
          'Just deal with it to avoid conflict'
        ],
        correctOptionIndex: [1],
        explanation: 'The best boundary is clear, specific, and respectful. Stating your need and inviting collaboration shows you value both your needs and the relationship.'
      },
      {
        orderIndex: 1,
        question: 'Setting boundaries is important because: (Select all that apply)',
        questionType: 'multiple_choice',
        mediaUrl: '',
        options: [
          'It prevents resentment from building up',
          'It shows you don\'t care about the other person',
          'It helps others understand how to treat you',
          'It protects your emotional well-being'
        ],
        correctOptionIndex: [0, 2, 3],
        explanation: 'Boundaries prevent resentment, communicate your limits, and protect your well-being. Setting boundaries actually shows you care about the relationship\'s health by being honest about your needs.'
      }
    ]
  }
};

// Mock Concept Summaries
export const conceptSummaries: { [key: number]: ConceptSummary } = {
  1: {
    keyPoints: [
      'Reflective listening is about truly hearing and understanding others.',
      'By paraphrasing what you\'ve heard and acknowledging emotions, you show that you\'re engaged and create space for deeper connection.',
      'Remember: it\'s not about having the perfect response—it\'s about making the other person feel heard.'
    ],
    nextSteps: 'Up next, you\'ll learn about reading non-verbal cues—the unspoken signals that often reveal more than words alone.'
  },
  2: {
    keyPoints: [
      'Non-verbal communication—body language, tone, and facial expressions—often reveals what words don\'t.',
      'By paying attention to these cues and addressing mismatches between words and body language, you can understand the complete message and respond more effectively.'
    ],
    nextSteps: 'Next, you\'ll discover how asking open questions can transform surface-level chats into meaningful conversations.'
  },
  3: {
    keyPoints: [
      'Open questions invite elaboration and show genuine interest in others\' experiences.',
      'By asking "what," "how," and "tell me about" instead of yes/no questions, you create opportunities for richer, more meaningful dialogue that strengthens your connections.'
    ],
    nextSteps: 'You\'ve completed all concepts in this module! Time to reflect on what you\'ve learned.'
  },
  4: {
    keyPoints: [
      'Identifying your needs is the foundation of effective communication.',
      'When you understand what you need emotionally, physically, and mentally, you can express those needs clearly and work collaboratively to meet them.'
    ],
    nextSteps: 'Up next, you\'ll learn how to express those needs using "I" statements that reduce defensiveness and increase understanding.'
  },
  5: {
    keyPoints: [
      '"I" statements transform how you communicate by focusing on your feelings and experiences rather than blaming.',
      'This approach reduces defensiveness and makes it easier for others to hear and respond to your needs with empathy.'
    ],
    nextSteps: 'Next, you\'ll learn about setting boundaries—a crucial skill for protecting your well-being while maintaining healthy relationships.'
  },
  6: {
    keyPoints: [
      'Setting boundaries is an act of self-care and honesty.',
      'By clearly communicating your limits with respect and firmness, you prevent resentment, protect your well-being, and create healthier relationships where everyone\'s needs matter.'
    ],
    nextSteps: 'You\'ve completed all concepts in this module! Time to reflect on what you\'ve learned.'
  }
};

// Mock Module Reflections
export const moduleReflections: { [key: number]: ModuleReflection } = {
  1: {
    type: 'text',
    prompt: 'Think about a recent conversation where you could have used active listening skills. How might that conversation have gone differently if you had used reflective listening, paid attention to non-verbal cues, and asked open questions?',
    mediaUrl: '',
    guidancePoints: [
      'Consider a specific conversation where you felt misunderstood or where the other person seemed disengaged.',
      'Reflect on how you could have used reflective listening to show you were truly hearing them.',
      'Think about how paying attention to non-verbal cues might have helped you understand their true feelings.',
      'Consider how asking open questions could have led to a deeper, more meaningful conversation.'
    ]
  },
  2: {
    type: 'text',
    prompt: 'Reflect on a time when you didn\'t express a need clearly. What held you back? How might you approach that situation differently now using what you\'ve learned about identifying needs, "I" statements, and setting boundaries?',
    mediaUrl: '',
    guidancePoints: [
      'Think of a specific situation where you felt your needs weren\'t met.',
      'Identify what held you back from expressing your needs clearly.',
      'Consider how identifying your needs more clearly could have helped you communicate more effectively.',
      'Reflect on how using "I" statements might have reduced defensiveness and increased understanding.',
      'Think about how setting boundaries could have protected your well-being while maintaining the relationship.'
    ]
  }
};