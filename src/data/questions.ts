import { Question } from '../types';

export const mathProblems: Question[] = [
  {
    question: "Solve: 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctIndex: 1,
    explanation: "To solve, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
    topic: "algebra",
    grade: 7
  },
  {
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correctIndex: 1,
    explanation: "To find 25% of 80, multiply 80 by 0.25 or divide by 4: 80 × 0.25 = 20"
  },
  {
    question: "If a rectangle has a length of 12 cm and a width of 5 cm, what is its area?",
    options: ["17 square cm", "34 square cm", "60 square cm", "85 square cm"],
    correctIndex: 2,
    explanation: "Area = length × width = 12 × 5 = 60 square centimeters"
  },
  {
    question: "What is the greatest common factor (GCF) of 24 and 36?",
    options: ["6", "12", "18", "24"],
    correctIndex: 1,
    explanation: "Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. The greatest common factor is 12."
  },
  {
    question: "If 3/4 of a number is 18, what is the number?",
    options: ["13.5", "22", "24", "27"],
    correctIndex: 2,
    explanation: "If 3/4 × n = 18, then n = 18 ÷ (3/4) = 18 × (4/3) = 24"
  },
  {
    question: "Which expression represents 'twice a number increased by 5'?",
    options: ["2 + 5x", "2x + 5", "5x + 2", "x + 25"],
    correctIndex: 1,
    explanation: "Twice a number is 2x, increased by 5 means add 5: 2x + 5"
  },
  {
    question: "Convert 0.625 to a fraction in simplest form.",
    options: ["5/8", "6/10", "62/100", "625/1000"],
    correctIndex: 0,
    explanation: "0.625 = 625/1000, which simplifies to 5/8"
  },
  {
    question: "What is the ratio of 3 hours to 1 day in simplest form?",
    options: ["1:8", "1:6", "1:12", "1:24"],
    correctIndex: 0,
    explanation: "There are 24 hours in a day. 3:24 simplifies to 1:8"
  }
];

export const writingProblems: Question[] = [
  {
    question: "Which sentence uses correct punctuation?",
    options: [
      "The cat slept on the windowsill, it was sunny.",
      "The cat slept on the windowsill; it was sunny.",
      "The cat slept on the windowsill it was sunny.",
      "The cat slept on the windowsill... it was sunny."
    ],
    correctIndex: 1,
    explanation: "A semicolon correctly joins two related independent clauses.",
    topic: "punctuation",
    grade: 7
  },
  {
    question: "Choose the sentence with correct subject-verb agreement.",
    options: [
      "The group of students were late.",
      "The group of students was late.",
      "The students in the group were late.",
      "The students in the group was late."
    ],
    correctIndex: 1,
    explanation: "'Group' is a singular collective noun, so it takes a singular verb (was)."
  }
];

export const smartyPantsProblems: Question[] = [
  {
    question: "Which of these inventions came first?",
    options: [
      "Television",
      "Telephone",
      "Internet",
      "Radio"
    ],
    correctIndex: 1,
    explanation: "The telephone was invented by Alexander Graham Bell in 1876, before the radio (1895), television (1920s), and internet (1960s)."
  },
  {
    question: "What causes a rainbow to appear?",
    options: [
      "Heat from the sun",
      "Clouds moving together",
      "Light reflecting off water droplets",
      "Wind patterns"
    ],
    correctIndex: 2,
    explanation: "Rainbows appear when sunlight reflects and refracts (bends) through water droplets in the air."
  },
  {
    question: "Which continent has the most countries?",
    options: [
      "Asia",
      "Africa",
      "Europe",
      "South America"
    ],
    correctIndex: 1,
    explanation: "Africa has 54 countries, more than any other continent."
  }
];

export const vocabWords: Question[] = [
  {
    word: 'Emerge',
    options: [
      'To stay hidden',
      'To come out or appear',
      'To go back in',
      'To disappear'
    ],
    correctIndex: 1,
    example: 'The butterfly emerged from its cocoon.'
  },
  {
    word: 'Abundant',
    options: [
      'Very rare',
      'Present in large quantity',
      'Completely missing',
      'Small amount'
    ],
    correctIndex: 1,
    example: 'The garden had abundant flowers in spring.'
  },
  {
    word: 'Ambiguous',
    options: [
      "Having more than one possible meaning",
      "Perfectly clear",
      "Very large",
      "Extremely small"
    ],
    correctIndex: 0,
    example: "The poem's meaning was ambiguous and could be interpreted in several ways."
  },
  {
    word: 'Benevolent',
    options: [
      "Kind and generous",
      "Angry and mean",
      "Fast and quick",
      "Slow and steady"
    ],
    correctIndex: 0,
    example: "The benevolent donor gave millions to charity."
  },
  {
    word: 'Gregarious',
    options: [
      "Fond of company; sociable",
      "Always alone",
      "Angry at others",
      "Afraid of people"
    ],
    correctIndex: 0,
    example: "The gregarious puppy loved meeting new people at the park."
  },
  {
    word: 'Heinous',
    options: [
      "Utterly odious or wicked",
      "Very pleasant",
      "Slightly annoying",
      "Perfectly normal"
    ],
    correctIndex: 0,
    example: "The heinous crime shocked the entire community."
  },
  {
    word: 'Impetuous',
    options: [
      "Quickly and without thought",
      "Slowly and carefully",
      "With great planning",
      "Never at all"
    ],
    correctIndex: 0,
    example: "His impetuous decision to quit his job was one he later regretted."
  },
  {
    word: 'Conundrum',
    options: [
      "A confusing or difficult problem",
      "A type of food",
      "A musical instrument",
      "A small animal"
    ],
    correctIndex: 0,
    example: "The puzzle presented quite a conundrum that took hours to solve."
  },
  {
    word: 'Desolate',
    options: [
      "Empty, lonely, and sad",
      "Happy and cheerful",
      "Busy and crowded",
      "Loud and noisy"
    ],
    correctIndex: 0,
    example: "The abandoned town was desolate, with no signs of life."
  },
  {
    word: 'Eloquent',
    options: [
      "Fluent and persuasive in speaking",
      "Unable to speak well",
      "Always silent",
      "Speaking too quickly"
    ],
    correctIndex: 0,
    example: "The eloquent speaker held the audience's attention throughout her speech."
  },
  {
    word: 'Formidable',
    options: [
      "Inspiring fear or respect through power",
      "Very weak and small",
      "Easy to defeat",
      "Friendly and approachable"
    ],
    correctIndex: 0,
    example: "The mountain climber faced a formidable challenge scaling the steep cliff."
  },
  {
    word: 'Juxtapose',
    options: [
      "Place close together or side by side",
      "Keep things far apart",
      "Throw something away",
      "Mix things together"
    ],
    correctIndex: 0,
    example: "The artist chose to juxtapose bright colors with dark ones to create contrast."
  },
  {
    word: 'Labyrinth',
    options: [
      "A complicated network of paths",
      "A straight line",
      "A simple circle",
      "A short road"
    ],
    correctIndex: 0,
    example: "The ancient castle contained a labyrinth of secret passages."
  },
  {
    word: 'Malevolent',
    options: [
      "Having a wish to do evil",
      "Wanting to help others",
      "Being friendly",
      "Feeling happy"
    ],
    correctIndex: 0,
    example: "The malevolent witch in the story cast evil spells on the village."
  },
  {
    word: 'Nefarious',
    options: [
      "Wicked or criminal",
      "Legal and proper",
      "Fun and exciting",
      "Boring and normal"
    ],
    correctIndex: 0,
    example: "The detective uncovered the criminal's nefarious plot."
  },
  {
    word: 'Obsolete',
    options: [
      "No longer in use or useful",
      "Brand new",
      "Very popular",
      "Currently trending"
    ],
    correctIndex: 0,
    example: "The old computer became obsolete when newer models were released."
  },
  {
    word: 'Persevere',
    options: [
      "Continue despite difficulty",
      "Give up easily",
      "Take a break",
      "Change direction"
    ],
    correctIndex: 0,
    example: "Despite many setbacks, she continued to persevere until she achieved her goal."
  },
  {
    word: 'Quandary',
    options: [
      "A state of uncertainty or perplexity",
      "A clear solution",
      "An easy choice",
      "A simple answer"
    ],
    correctIndex: 0,
    example: "He found himself in a quandary when both job offers seemed equally appealing."
  },
  {
    word: 'Resilient',
    options: [
      "Able to recover quickly from difficulties",
      "Easily defeated",
      "Never changing",
      "Always struggling"
    ],
    correctIndex: 0,
    example: "The resilient community quickly rebuilt after the storm."
  },
  {
    word: 'Scrutinize',
    options: [
      "Examine closely and thoroughly",
      "Look away quickly",
      "Ignore completely",
      "Forget about"
    ],
    correctIndex: 0,
    example: "The scientist began to scrutinize the data for any anomalies."
  },
  {
    word: 'Tenacious',
    options: [
      "Holding firmly to something",
      "Letting go easily",
      "Changing often",
      "Giving up quickly"
    ],
    correctIndex: 0,
    example: "The tenacious climber refused to give up until she reached the summit."
  },
  {
    word: 'Ubiquitous',
    options: [
      "Present or found everywhere",
      "Very rare",
      "Never seen",
      "Hidden away"
    ],
    correctIndex: 0,
    example: "Smartphones have become ubiquitous in modern society."
  },
  {
    word: 'Peculiar',
    options: [
      "Perfectly normal",
      "Strange or unusual",
      "Very common",
      "Exactly the same"
    ],
    correctIndex: 1,
    example: "The peculiar smell in the kitchen turned out to be burnt cookies."
  },
  {
    word: 'Reluctant',
    options: [
      "Eager and excited",
      "Quick to agree",
      "Unwilling or hesitant",
      "Very happy"
    ],
    correctIndex: 2,
    example: "The reluctant swimmer stayed in the shallow end of the pool."
  },
  {
    word: 'Diligent',
    options: [
      "Lazy and careless",
      "Quick but messy",
      "Slow and steady",
      "Hardworking and careful"
    ],
    correctIndex: 3,
    example: "The diligent student always completed her homework on time."
  },
  {
    word: 'Bewildered',
    options: [
      "Happy and content",
      "Angry and upset",
      "Confused or puzzled",
      "Calm and relaxed"
    ],
    correctIndex: 2,
    example: "The bewildered tourist couldn't find his way back to the hotel."
  },
  {
    word: 'Courteous',
    options: [
      "Rude and mean",
      "Loud and noisy",
      "Quiet and shy",
      "Polite and respectful"
    ],
    correctIndex: 3,
    example: "The courteous waiter helped the elderly customer to her seat."
  },
  {
    word: 'Timid',
    options: [
      "Bold and brave",
      "Shy and nervous",
      "Loud and confident",
      "Strong and fierce"
    ],
    correctIndex: 1,
    example: "The timid mouse hid when anyone entered the room."
  },
  {
    word: 'Generous',
    options: [
      "Being selfish",
      "Taking from others",
      "Willing to give and share",
      "Keeping everything"
    ],
    correctIndex: 2,
    example: "The generous neighbor shared her garden vegetables with everyone."
  },
  {
    word: 'Curious',
    options: [
      "Not interested",
      "Afraid to ask",
      "Avoiding new things",
      "Eager to learn or know"
    ],
    correctIndex: 3,
    example: "The curious child asked many questions about how rainbows form."
  },
  {
    word: 'Confident',
    options: [
      "Full of doubt",
      "Sure of oneself",
      "Very worried",
      "Always scared"
    ],
    correctIndex: 1,
    example: "The confident speaker gave an excellent presentation to the class."
  },
  {
    word: 'Sincere',
    options: [
      "Fake or pretending",
      "Being tricky",
      "Honest and genuine",
      "Lying often"
    ],
    correctIndex: 2,
    example: "Her sincere apology helped repair their friendship."
  }
];

export const readingPassages = [
  {
    title: "The Scientific Method",
    text: `The scientific method is a systematic approach used by scientists to investigate phenomena, acquire new knowledge, and correct and integrate existing knowledge. It consists of several steps: observation, question formulation, hypothesis development, prediction, testing, and analysis.

    The process begins with careful observation of a phenomenon. Scientists then formulate questions about their observations and develop hypotheses—tentative explanations that can be tested. These hypotheses lead to predictions that can be investigated through controlled experiments. The results of these experiments either support or contradict the original hypothesis, leading to refinement of scientific understanding.`,
    questions: [
      {
        question: "What is the primary purpose of the scientific method?",
        options: [
          "To prove existing theories correct",
          "To systematically investigate and understand phenomena",
          "To develop new technologies",
          "To document observations only"
        ],
        correctIndex: 1,
        explanation: "The passage states that the scientific method is used to 'investigate phenomena, acquire new knowledge, and correct and integrate existing knowledge.'"
      }
    ]
  },
  {
    title: "The Great Depression",
    text: `The Great Depression was a severe worldwide economic downturn that began in 1929 and lasted until the late 1930s. It was the longest and most severe depression ever experienced by the industrialized world. The economic crisis originated in the United States but quickly spread globally.

    The depression had devastating effects on both rich and poor countries. Personal income, tax revenue, profits, and prices dropped dramatically. International trade fell by more than 50%, and unemployment in the United States rose to 25%. Construction projects halted, farm prices fell by roughly 60%, and manufacturing output plunged.`,
    questions: [
      {
        question: "When did the Great Depression begin?",
        options: [
          "1919",
          "1929",
          "1939",
          "1949"
        ],
        correctIndex: 1,
        explanation: "The passage clearly states that the Great Depression began in 1929."
      }
    ]
  }
]; 