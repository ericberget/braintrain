import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { 
  Calculator, 
  Home, 
  Star, 
  Trophy, 
  Zap, 
  Calendar, 
  Pen, 
  BookOpen, 
  GraduationCap,
  Brain,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Alert } from './ui/alert';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { loadProgress, saveProgress, getInitialProgress } from '../lib/storage';

const vocabWords = [
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
    word: 'Ancient',
    options: [
      'New and modern',
      'Very old',
      'From last year',
      'Currently happening'
    ],
    correctIndex: 1,
    example: 'The ancient pyramids were built thousands of years ago.'
  },
  {
    word: 'Vacant',
    options: [
      'Full of people',
      'Empty or unused',
      'Very busy',
      'Crowded'
    ],
    correctIndex: 1,
    example: 'The vacant seat was available for anyone to use.'
  },
  {
    word: 'Rapid',
    options: [
      'Very slow',
      'Quick and fast',
      'Steady and careful',
      'Stopping often'
    ],
    correctIndex: 1,
    example: 'The rapid river moved quickly over the rocks.'
  },
  {
    word: 'Delicate',
    options: [
      'Very strong',
      'Easily broken or damaged',
      'Heavy and solid',
      'Rough and tough'
    ],
    correctIndex: 1,
    example: 'The delicate glass vase needed careful handling.'
  },
  {
    word: 'Fragment',
    options: [
      'A whole piece',
      'A broken piece or part',
      'A large amount',
      'A complete set'
    ],
    correctIndex: 1,
    example: 'We found a fragment of the broken plate.'
  },
  {
    word: 'Migrate',
    options: [
      'To stay in one place',
      'To move to a new area',
      'To build a nest',
      'To sleep all winter'
    ],
    correctIndex: 1,
    example: 'Birds migrate south for the winter.'
  },
  {
    word: 'Summit',
    options: [
      'The bottom',
      'The highest point',
      'The middle',
      'The entrance'
    ],
    correctIndex: 1,
    example: 'They reached the summit of the mountain.'
  },
  {
    word: 'Descend',
    options: [
      'To climb up',
      'To go down',
      'To stay level',
      'To move sideways'
    ],
    correctIndex: 1,
    example: 'We descended the stairs to the basement.'
  },
  {
    word: 'Dozen',
    options: [
      'A single item',
      'Twelve of something',
      'Half of something',
      'Twenty of something'
    ],
    correctIndex: 1,
    example: 'A dozen eggs fills the carton.'
  },
  {
    word: 'Flock',
    options: [
      'One bird alone',
      'A group of birds together',
      'A single sheep',
      'A type of cloud'
    ],
    correctIndex: 1,
    example: 'A flock of geese flew overhead.'
  },
  {
    word: 'Consume',
    options: [
      'To throw away',
      'To eat or use up',
      'To save for later',
      'To give away'
    ],
    correctIndex: 1,
    example: 'The fire consumed all the wood.'
  },
  {
    word: 'Parallel',
    options: [
      'Lines that cross',
      'Lines that never meet',
      'Lines that curve',
      'Lines that touch'
    ],
    correctIndex: 1,
    example: 'Railroad tracks are parallel lines.'
  },
  {
    word: 'Transparent',
    options: [
      'Impossible to see through',
      'Easy to see through',
      'Completely solid',
      'Very colorful'
    ],
    correctIndex: 1,
    example: 'The window glass is transparent.'
  },
  {
    word: 'Vertical',
    options: [
      'Lying flat',
      'Standing straight up and down',
      'At an angle',
      'Curved around'
    ],
    correctIndex: 1,
    example: 'The flag pole stands vertical to the ground.'
  },
  {
    word: 'Enormous',
    options: [
      'Tiny and small',
      'Huge and very large',
      'Medium sized',
      'Regular sized'
    ],
    correctIndex: 1,
    example: 'The enormous elephant was bigger than a car.'
  },
  {
    word: 'Dense',
    options: [
      'Light and airy',
      'Thick and packed together',
      'Spread out',
      'Empty inside'
    ],
    correctIndex: 1,
    example: 'The dense forest was hard to walk through.'
  },
  {
    word: 'Shallow',
    options: [
      'Very deep',
      'Not deep',
      'Empty',
      'Overflowing'
    ],
    correctIndex: 1,
    example: 'The shallow end of the pool is safe for small children.'
  },
  {
    word: 'Soar',
    options: [
      'To crawl slowly',
      'To fly high',
      'To swim underwater',
      'To walk quickly'
    ],
    correctIndex: 1,
    example: 'Eagles soar high in the sky.'
  },
  {
    word: 'Colony',
    options: [
      'A single animal',
      'A group living together',
      'A empty place',
      'A type of plant'
    ],
    correctIndex: 1,
    example: 'Ants live together in a colony.'
  },
  {
    word: 'Orbit',
    options: [
      'To stay still',
      'To move around something',
      'To fall down',
      'To jump up'
    ],
    correctIndex: 1,
    example: 'The Earth orbits around the Sun.'
  },
  {
    word: 'Toxic',
    options: [
      'Very healthy',
      'Poisonous or harmful',
      'Clean and pure',
      'Safe to eat'
    ],
    correctIndex: 1,
    example: 'The toxic waste was dangerous to touch.'
  },
  {
    word: 'Swarm',
    options: [
      'A single bug',
      'A large moving group',
      'A quiet crowd',
      'An empty space'
    ],
    correctIndex: 1,
    example: 'A swarm of bees surrounded the hive.'
  },
  {
    word: 'Camouflage',
    options: [
      'To stand out',
      'To blend in with surroundings',
      'To glow brightly',
      'To make noise'
    ],
    correctIndex: 1,
    example: "The lizard's camouflage helps it hide from predators."
  },
  {
    word: 'Grove',
    options: [
      'A single tree',
      'A group of trees',
      'A flower garden',
      'A grassy field'
    ],
    correctIndex: 1,
    example: 'We had a picnic in the orange grove.'
  },
  {
    word: 'Drift',
    options: [
      'To move quickly',
      'To move slowly with no direction',
      'To stay in place',
      'To sink quickly'
    ],
    correctIndex: 1,
    example: 'The leaves drift slowly to the ground.'
  },
  {
    word: 'Arctic',
    options: [
      'Very hot',
      'Very cold',
      'Mild temperature',
      'Rainy weather'
    ],
    correctIndex: 1,
    example: 'Polar bears live in arctic regions.'
  },
  {
    word: 'Barrier',
    options: [
      'An open path',
      'Something that blocks the way',
      'A welcome sign',
      'A clear road'
    ],
    correctIndex: 1,
    example: 'The fence was a barrier around the yard.'
  },
  {
    word: 'Blend',
    options: [
      'To separate things',
      'To mix things together',
      'To break apart',
      'To keep away'
    ],
    correctIndex: 1,
    example: 'The chef will blend the ingredients together.'
  },
  {
    word: 'Perch',
    options: [
      'To lie down',
      'To sit on something high',
      'To swim deep',
      'To run fast'
    ],
    correctIndex: 1,
    example: 'The bird found a perch on the telephone wire.'
  },
  {
    word: 'Harvest',
    options: [
      'To plant seeds',
      'To gather crops',
      'To water plants',
      'To dig holes'
    ],
    correctIndex: 1,
    example: 'Farmers harvest their corn in the fall.'
  },
  {
    word: 'Lecture',
    options: [
      'To listen quietly',
      'To teach by speaking',
      'To read silently',
      'To write notes'
    ],
    correctIndex: 1,
    example: 'The professor gave a lecture about history.'
  },
  {
    word: 'Symbol',
    options: [
      'A long word',
      'A sign representing something',
      'A full sentence',
      'A page of text'
    ],
    correctIndex: 1,
    example: 'A heart symbol means love.'
  },
  {
    word: 'Sprout',
    options: [
      'To die away',
      'To begin to grow',
      'To fall down',
      'To dry up'
    ],
    correctIndex: 1,
    example: 'The seeds will sprout into plants.'
  },
  {
    word: 'Huddle',
    options: [
      'To spread out',
      'To crowd close together',
      'To run away',
      'To stand alone'
    ],
    correctIndex: 1,
    example: 'The team will huddle to discuss their plan.'
  },
  {
    word: 'Permanent',
    options: [
      'Lasting a short time',
      'Lasting forever',
      'Changing often',
      'Disappearing quickly'
    ],
    correctIndex: 1,
    example: "The permanent marker won't wash off."
  },
  {
    word: 'Valuable',
    options: [
      'Worth nothing',
      'Worth a lot',
      'Very common',
      'Easily replaced'
    ],
    correctIndex: 1,
    example: 'The diamond ring was very valuable.'
  },
  {
    word: 'Horizon',
    options: [
      'The ground below',
      'Where sky meets earth',
      'Top of a mountain',
      'Bottom of the sea'
    ],
    correctIndex: 1,
    example: 'The sun set at the horizon.'
  },
  {
    word: 'Moisture',
    options: [
      'Very dry',
      'Wetness or water',
      'Hot and sunny',
      'Cold and frozen'
    ],
    correctIndex: 1,
    example: 'Plants need moisture to grow.'
  },
  {
    word: 'Glimpse',
    options: [
      'A long look',
      'A quick look',
      'To stare at',
      'To ignore'
    ],
    correctIndex: 1,
    example: 'We caught a glimpse of the deer running away.'
  },
  {
    word: 'Sturdy',
    options: [
      'Weak and fragile',
      'Strong and well-built',
      'Light and delicate',
      'Broken down'
    ],
    correctIndex: 1,
    example: 'The sturdy bridge held many cars.'
  },
  {
    word: 'Ripple',
    options: [
      'Still water',
      'Small waves',
      'Frozen ice',
      'Dry land'
    ],
    correctIndex: 1,
    example: 'Ripples spread across the pond.'
  },
  {
    word: 'Brilliant',
    options: [
      'Very dull',
      'Very bright or smart',
      'Dark and dim',
      'Ordinary'
    ],
    correctIndex: 1,
    example: 'The brilliant diamond sparkled in the light.'
  },
  {
    word: 'Gather',
    options: [
      'To scatter away',
      'To come together',
      'To leave quickly',
      'To stay alone'
    ],
    correctIndex: 1,
    example: 'The family will gather for dinner.'
  },
  {
    word: 'Microscopic',
    options: [
      'Very large',
      'Too small to see without help',
      'Medium sized',
      'Easily visible'
    ],
    correctIndex: 1,
    example: 'Bacteria are microscopic organisms.'
  }
];

const mathProblems = [
  {
    question: 'What is 25% of 80?',
    options: ['15', '20', '25', '30'],
    correctIndex: 1,
    explanation: '25% is the same as ¼, so divide 80 by 4 to get 20'
  },
  {
    question: 'If x + 7 = 15, what is x?',
    options: ['7', '8', '9', '22'],
    correctIndex: 1,
    explanation: 'Subtract 7 from both sides: x = 15 - 7 = 8'
  },
  {
    question: '75% of what number is 30?',
    options: ['40', '45', '35', '25'],
    correctIndex: 0,
    explanation: 'If 75% (¾) of a number is 30, then the whole number is 30 × ⁴⁄₃ = 40'
  },
  {
    question: 'If a triangle has angles measuring 45° and 45°, what is the measure of the third angle?',
    options: ['45°', '90°', '180°', '360°'],
    correctIndex: 1,
    explanation: 'The angles in a triangle sum to 180°. If two angles are 45°, then 180° - (45° + 45°) = 90°'
  },
  { 
    question: 'Solve for x: 3x + 7 = 22',
    options: ['5', '15', '8', '3'],
    correctIndex: 0,
    explanation: 'Subtract 7 from both sides: 3x = 15, then divide by 3: x = 5'
  },
  {
    question: 'If x + 3 = 10, what is x?',
    options: ['5', '7', '13', '6'],
    correctIndex: 1,
    explanation: 'Subtract 3 from both sides: x = 10 - 3 = 7'
  },
  {
    question: 'Solve: 2x = 14',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
    explanation: 'Divide both sides by 2: x = 14 ÷ 2 = 7'
  },
  {
    question: 'What is the value of y if y - 5 = 3?',
    options: ['8', '2', '-2', '6'],
    correctIndex: 0,
    explanation: 'Add 5 to both sides: y = 3 + 5 = 8'
  },
  {
    question: 'If 3x = 21, what is x?',
    options: ['6', '7', '8', '9'],
    correctIndex: 1,
    explanation: 'Divide both sides by 3: x = 21 ÷ 3 = 7'
  },
  {
    question: 'Solve: x + 8 = 15',
    options: ['7', '23', '6', '8'],
    correctIndex: 0,
    explanation: 'Subtract 8 from both sides: x = 15 - 8 = 7'
  },
  {
    question: 'What is n if n ÷ 4 = 3?',
    options: ['12', '7', '1', '15'],
    correctIndex: 0,
    explanation: 'Multiply both sides by 4: n = 3 × 4 = 12'
  },
  {
    question: 'If y - 3 = 7, what is y?',
    options: ['4', '10', '5', '8'],
    correctIndex: 1,
    explanation: 'Add 3 to both sides: y = 7 + 3 = 10'
  },
  {
    question: 'Solve: 5x = 25',
    options: ['5', '20', '4', '6'],
    correctIndex: 0,
    explanation: 'Divide both sides by 5: x = 25 ÷ 5 = 5'
  },
  {
    question: 'What is x if x + 5 = 12?',
    options: ['7', '17', '6', '8'],
    correctIndex: 0,
    explanation: 'Subtract 5 from both sides: x = 12 - 5 = 7'
  },
  {
    question: 'If 2y = 16, what is y?',
    options: ['32', '14', '8', '4'],
    correctIndex: 2,
    explanation: 'Divide both sides by 2: y = 16 ÷ 2 = 8'
  },
];

const readingPassages = [
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
      },
      {
        question: "According to the passage, what follows hypothesis development?",
        options: [
          "Observation",
          "Question formulation",
          "Prediction",
          "Analysis"
        ],
        correctIndex: 2,
        explanation: "The passage lists the steps in order, with prediction following hypothesis development."
      }
    ]
  },
  {
    title: "The Great Depression",
    text: `The Great Depression was a severe worldwide economic downturn that began in 1929 and lasted until the late 1930s. It was the longest and most severe depression ever experienced by the industrialized world. The economic crisis originated in the United States but quickly spread globally.

    The depression had devastating effects on both rich and poor countries. Personal income, tax revenue, profits, and prices dropped dramatically. International trade fell by more than 50%, and unemployment in the United States rose to 25%. Construction projects halted, farm prices fell by roughly 60%, and manufacturing output plunged.`,
    questions: [
      {
        question: "What aspect of the Great Depression does the passage emphasize?",
        options: [
          "Its political causes",
          "Its global impact",
          "Its effect on agriculture only",
          "Its resolution"
        ],
        correctIndex: 1,
        explanation: "The passage emphasizes the worldwide impact of the Depression, mentioning its effects on both rich and poor countries and international trade."
      },
      {
        question: "Based on the passage, which sector was NOT directly mentioned as being affected?",
        options: [
          "Manufacturing",
          "Construction",
          "Agriculture",
          "Education"
        ],
        correctIndex: 3,
        explanation: "The passage mentions effects on manufacturing, construction, and farming, but does not directly mention education."
      }
    ]
  }
];

const writingProblems = [
  {
    context: "Choose the correct word: affect vs effect",
    sentence: "The medicine will [affect / effect] how quickly you recover.",
    options: [
      "affect",
      "effect",
      "effekt",
      "affekt"
    ],
    correctIndex: 0,
    explanation: "'Affect' is a verb meaning to influence something. 'Effect' is usually a noun meaning the result."
  },
  {
    context: "Choose the correct word: their, there, or they're",
    sentence: "The students left [their / there / they're] books on the desk.",
    options: [
      "there",
      "their",
      "they're",
      "there're"
    ],
    correctIndex: 1,
    explanation: "'Their' shows possession - the books belong to the students."
  },
  {
    context: "Choose the correct word: their, there, or they're",
    sentence: "[Their / There / They're] going to love the surprise party!",
    options: [
      "Their",
      "There",
      "They're",
      "There're"
    ],
    correctIndex: 2,
    explanation: "'They're' is a contraction of 'they are' - They are going to love the party."
  },
  {
    context: "Choose the correct word: their, there, or they're",
    sentence: "Put the box over [their/there/they're] by the door.",
    options: [
      "their",
      "there",
      "they're",
      "there're"
    ],
    correctIndex: 1,
    explanation: "'There' refers to a location or place - in this case, by the door."
  },
  {
    context: "Choose the correct word: accept vs except",
    sentence: "I will [accept/except] your apology.",
    options: [
      "accept",
      "except",
      "acept",
      "excepts"
    ],
    correctIndex: 0,
    explanation: "'Accept' means to receive or agree to something. 'Except' means to exclude."
  },
  {
    context: "Choose the correct punctuation.",
    sentence: "The scientist explained her findings[,] and then she answered questions from the audience.",
    options: [
      ", and then",
      "; and then",
      ". Then",
      "; then"
    ],
    correctIndex: 2,
    explanation: "These are independent clauses that can stand alone as complete sentences. Use a period to avoid a run-on sentence."
  },
  {
    context: "Choose the most concise version.",
    sentence: "[Due to the fact that] it was raining, the game was cancelled.",
    options: [
      "Due to the fact that",
      "Because",
      "As a result of",
      "Owing to the fact that"
    ],
    correctIndex: 1,
    explanation: "Use 'Because' for a more concise and direct expression."
  },
  {
    context: "Choose the correct word: loose vs lose",
    sentence: "Don't [loose / lose] your keys again!",
    options: [
      "loose",
      "lose",
      "lost",
      "loost"
    ],
    correctIndex: 1,
    explanation: "'Lose' means to misplace something. 'Loose' means not tight."
  },
  {
    context: "Choose the correct word: weather vs whether",
    sentence: "I don't know [weather/whether] to bring a jacket.",
    options: [
      "weather",
      "whether",
      "wether",
      "wheather"
    ],
    correctIndex: 1,
    explanation: "'Whether' expresses a choice or doubt. 'Weather' refers to atmospheric conditions."
  },
  {
    context: "Choose the correct verb form.",
    sentence: "Each of the students [have] completed their assignments.",
    options: [
      "have",
      "has",
      "having",
      "had"
    ],
    correctIndex: 1,
    explanation: "The subject 'Each' is singular, so use the singular verb 'has'."
  },
  {
    context: "Choose the correct pronoun.",
    sentence: "The award was shared between Sarah and [I/me].",
    options: [
      "I",
      "me",
      "myself",
      "mine"
    ],
    correctIndex: 1,
    explanation: "Use the object pronoun 'me' after prepositions like 'between'."
  },
  {
    context: "Choose the best word order.",
    sentence: "The teacher [quickly and efficiently graded] all the tests.",
    options: [
      "quickly and efficiently graded",
      "graded quickly and efficiently",
      "did grade quickly and efficiently",
      "was quick and efficient in grading"
    ],
    correctIndex: 1,
    explanation: "Place adverbs after the verb they modify for clearer meaning."
  },
  {
    context: "Fix the parallel structure.",
    sentence: "The coach told the team to [run fast, jumping high, and score points].",
    options: [
      "run fast, jumping high, and score points",
      "run fast, jump high, and score points",
      "run fast, to jump high, and scoring points",
      "running fast, jumping high, and scoring points"
    ],
    correctIndex: 1,
    explanation: "Use parallel structure with three infinitive verbs: run, jump, score."
  },
  {
    context: "Choose the correct verb tense.",
    sentence: "Yesterday, she [go] to the store.",
    options: [
      "go",
      "goes",
      "went",
      "going"
    ],
    correctIndex: 2,
    explanation: "Use the past tense 'went' for actions that happened in the past (yesterday)."
  },
  {
    context: "Fix the spelling error.",
    sentence: "The [recieved] package arrived on time.",
    options: [
      "recieved",
      "received",
      "receved",
      "receieved"
    ],
    correctIndex: 1,
    explanation: "Remember the rule: 'i' before 'e' except after 'c'."
  },
  {
    context: "Choose the correct word.",
    sentence: "[Your/You're] going to love this movie!",
    options: [
      "your",
      "you're",
      "youre",
      "yours"
    ],
    correctIndex: 1,
    explanation: "'You're' is a contraction of 'you are'. 'Your' shows possession."
  },
  {
    context: "Fix the sentence.",
    sentence: "The dog [who/which] lives next door barks a lot.",
    options: [
      "who",
      "which",
      "that",
      "whom"
    ],
    correctIndex: 1,
    explanation: "Use 'which' for things and animals, 'who' for people."
  },
  {
    context: "Choose the correct plural form.",
    sentence: "There are three [child] playing in the park.",
    options: [
      "child",
      "childs",
      "childrens",
      "children"
    ],
    correctIndex: 3,
    explanation: "'Children' is an irregular plural - it doesn't follow the normal 's' rule."
  },
  {
    context: "Fix the capitalization.",
    sentence: "[john] lives in new york city.",
    options: [
      "john lives in new york city",
      "John lives in new york city",
      "John lives in New York City",
      "john lives in New york City"
    ],
    correctIndex: 2,
    explanation: "Capitalize names (John) and place names (New York City)."
  },
  {
    context: "Choose the correct word.",
    sentence: "Can you [their/there/they're] help me with this?",
    options: [
      "their",
      "there",
      "they're",
      "theyre"
    ],
    correctIndex: 1,
    explanation: "'There' refers to location or existence. 'Their' shows possession. 'They're' means 'they are'."
  },
  {
    context: "Fix the sentence structure.",
    sentence: "[Me and Tom] went to the movies.",
    options: [
      "Me and Tom",
      "Tom and me",
      "Tom and I",
      "Me and I"
    ],
    correctIndex: 2,
    explanation: "Use 'I' when it's the subject, and put the other person first."
  },
];

const smartyPantsProblems = [
  {
    question: 'Which ancient civilization built the pyramids of Giza?',
    options: ['Romans', 'Greeks', 'Egyptians', 'Persians'],
    correctIndex: 2,
    explanation: 'The pyramids of Giza were built by the ancient Egyptians around 2500 BCE as tombs for their pharaohs.'
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctIndex: 1,
    explanation: 'Leonardo da Vinci painted the Mona Lisa in the early 16th century. It is now displayed in the Louvre Museum in Paris.'
  },
  {
    question: 'The Mediterranean Sea is bordered by all of these countries EXCEPT:',
    options: ['Germany', 'Spain', 'Greece', 'Italy'],
    correctIndex: 0,
    explanation: 'Germany is nowhere near the Mediterranean Sea - it\'s located in northern Europe on the North and Baltic Seas. Spain, Greece, and Italy are all famous for their Mediterranean coastlines and beaches.'
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
    correctIndex: 1,
    explanation: 'Jupiter is the largest planet in our solar system - it could fit over 1,300 Earths inside it!'
  },
  {
    question: 'Which of these animals is NOT a mammal?',
    options: ['Dolphin', 'Snake', 'Bat', 'Whale'],
    correctIndex: 1,
    explanation: 'Snakes are reptiles, while dolphins, bats, and whales are all mammals.'
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Diamond', 'Iron', 'Platinum'],
    correctIndex: 1,
    explanation: 'Diamonds are the hardest natural substance found on Earth, rating 10 on the Mohs scale of hardness.'
  },
  {
    question: 'Which continent is the driest on Earth?',
    options: ['Africa', 'Antarctica', 'Asia', 'Australia'],
    correctIndex: 1,
    explanation: 'Antarctica is the driest continent, technically a desert due to its extremely low precipitation.'
  },
  {
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correctIndex: 2,
    explanation: '2 is the smallest prime number and the only even prime number.'
  },
  {
    question: 'Which gas do plants absorb from the air?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctIndex: 1,
    explanation: 'Plants absorb carbon dioxide from the air during photosynthesis and release oxygen.'
  },
  {
    question: 'What is the main function of white blood cells?',
    options: ['Carry oxygen', 'Fight infection', 'Carry nutrients', 'Clot blood'],
    correctIndex: 1,
    explanation: 'White blood cells are part of the immune system and help fight infections in the body.'
  }
];

const playSound = (soundName: 'correct' | 'incorrect', volume: number = 0.2) => {
  const audio = new Audio(`/sounds/${soundName === 'correct' ? 'correctding' : 'wrong'}.wav`);
  audio.volume = volume;
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
};

interface AnswerButtonProps {
  option: string;
  index: number;
  isCorrect: boolean;
  onClick: (index: number) => void;
  revealed: boolean;
}

const AnswerButton = ({ option, index, isCorrect, onClick, revealed }: AnswerButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => onClick(index)}
      className={cn(
        "w-full p-4 rounded-lg text-left transition-colors",
        revealed
          ? isCorrect
            ? "bg-green-500/20 text-green-200"
            : "bg-gray-700 text-gray-400"
          : "bg-gray-700 hover:bg-gray-600 text-gray-200"
      )}
    >
      {option}
    </motion.button>
  );
};

interface TimeBombState {
  timeLeft: number;
  strikes: number;
  correctAnswers: number;
  isActive: boolean;
}

interface DailyChallengeState {
  timeLeft: number;
  isActive: boolean;
  currentCategory: 'math' | 'writing' | 'smartypants';
  progress: {
    math: number;
    writing: number;
    smartypants: number;
  };
  correctAnswers: {
    math: number;
    writing: number;
    smartypants: number;
  };
  points: number;
  currentQuestionIndex: number;
  streak: number;
  multiplier: number;
}

type SectionKey = 'home' | 'vocabulary' | 'math' | 'comprehension' | 'writing' | 'daily' | 'smartypants';

interface Section {
  title: string;
  icon: JSX.Element;
  content: JSX.Element;
}

// Add this type for the progress and correctAnswers objects
type CategoryScores = {
  math: number;
  writing: number;
  smartypants: number;
};

// Then update the DailyProgress interface
interface DailyProgress {
  completed: boolean;
  score: number;
  timeRemaining: number;
  currentCategory: keyof CategoryScores;
  correctAnswers: CategoryScores;
  lastPlayed: string; // Add this missing property
  currentQuestionIndex: number;
}

interface UserProgress {
  points: number;
  streak: number;
  lastPlayed: string;
  dailyChallenge: DailyProgress;
  completedQuestions: {
    vocab: number[];
    math: number[];
    reading: number[];
    writing: number[];
    smartypants: number[];
  };
}

interface GameOverProps {
  points: number;
  streak: number;
  onClose: () => void;
}

const GameOver = ({ points, streak, onClose }: GameOverProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl max-w-lg w-full p-8"
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-emerald-400">
            Challenge Complete! 🎉
          </h2>
          <div className="py-8 space-y-6">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {points}
              </div>
              <div className="text-gray-400">Points Earned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {streak} Day Streak
              </div>
              <div className="text-gray-400">Keep it going!</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add this component for milestone celebrations
const Celebration = ({ message }: { message: string }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.5, opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center pointer-events-none"
  >
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-2xl font-bold">
      {message}
    </div>
  </motion.div>
);

const SATPrep = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [currentWord, setCurrentWord] = useState(() => {
    // Initialize with a random word index
    return Math.floor(Math.random() * vocabWords.length);
  });
  const [currentProblem, setCurrentProblem] = useState(0);
  const [currentPassage, setCurrentPassage] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => 
    loadProgress() || getInitialProgress()
  );
  const [mathMode, setMathMode] = useState<'relaxed' | 'timebomb'>('relaxed');
  const [timeBombState, setTimeBombState] = useState<TimeBombState>({
    timeLeft: 180, // 3 minutes in seconds
    strikes: 3,
    correctAnswers: 0,
    isActive: false
  });
  const [dailyChallengeState, setDailyChallengeState] = useState<DailyChallengeState>(() => ({
    timeLeft: userProgress.dailyChallenge.timeRemaining,
    isActive: false,
    currentCategory: userProgress.dailyChallenge.currentCategory,
    progress: userProgress.dailyChallenge.correctAnswers,
    correctAnswers: userProgress.dailyChallenge.correctAnswers,
    points: userProgress.dailyChallenge.score,
    currentQuestionIndex: userProgress.dailyChallenge.currentQuestionIndex,
    streak: 0,
    multiplier: 1
  }));
  
  const timerRef = useRef<NodeJS.Timeout>();
  const dailyTimerRef = useRef<NodeJS.Timeout>();

  const getRandomQuestion = (questions: any[], type: 'vocab' | 'math' | 'reading' | 'writing' | 'smartypants' = 'vocab') => {
    const completed = userProgress.completedQuestions[type as keyof typeof userProgress.completedQuestions];
    const available = questions
      .map((_, index) => index)
      .filter(index => !completed.includes(index));

    if (available.length === 0) {
      setUserProgress(prev => ({
        ...prev,
        completedQuestions: {
          ...prev.completedQuestions,
          [type]: []
        }
      }));
      return Math.floor(Math.random() * questions.length);
    }

    return available[Math.floor(Math.random() * available.length)];
  };

  useEffect(() => {
    saveProgress(userProgress);
  }, [userProgress]);

  useEffect(() => {
    if (dailyChallengeState.isActive) {
      setUserProgress(prev => ({
        ...prev,
        dailyChallenge: {
          ...prev.dailyChallenge,
          timeRemaining: dailyChallengeState.timeLeft,
          currentCategory: dailyChallengeState.currentCategory,
          correctAnswers: dailyChallengeState.correctAnswers,
          score: dailyChallengeState.points,
          currentQuestionIndex: dailyChallengeState.currentQuestionIndex
        }
      }));
    }
  }, [dailyChallengeState]);

  useEffect(() => {
    setCurrentWord(getRandomQuestion(vocabWords, 'vocab'));
    setCurrentProblem(getRandomQuestion(mathProblems, 'math'));
  }, []);

  useEffect(() => {
    if (timeBombState.isActive) {
      timerRef.current = setInterval(() => {
        setTimeBombState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(timerRef.current);
            return { ...prev, timeLeft: 0, isActive: false };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timeBombState.isActive]);

  useEffect(() => {
    if (dailyChallengeState.isActive) {
      clearInterval(dailyTimerRef.current);
      dailyTimerRef.current = setInterval(() => {
        setDailyChallengeState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(dailyTimerRef.current);
            return { ...prev, timeLeft: 0, isActive: false };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => {
      if (dailyTimerRef.current) {
        clearInterval(dailyTimerRef.current);
      }
    };
  }, [dailyChallengeState.isActive]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section as SectionKey);
    setShowFeedback(false);
    
    if (section === 'vocabulary') {
      setCurrentWord(Math.floor(Math.random() * vocabWords.length));
    } else if (section === 'comprehension') {
      setCurrentPassage(Math.floor(Math.random() * readingPassages.length));
    } else if (section === 'smartypants') {
      setCurrentProblem(0); // Start with the first question
    }
  };

  const handleAnswer = (problemIndex: number, selectedIndex: number, type: 'vocab' | 'math' | 'reading' | 'writing' | 'smartypants' = 'vocab') => {
    let problems;
    let correctIndex;
    
    switch(type) {
      case 'vocab':
        problems = vocabWords;
        correctIndex = problems[problemIndex].correctIndex;
        break;
      case 'math':
        problems = mathProblems;
        correctIndex = problems[problemIndex].correctIndex;
        break;
      case 'reading':
        problems = readingPassages[currentPassage].questions;
        correctIndex = problems[problemIndex].correctIndex;
        break;
      case 'writing':
        problems = writingProblems;
        correctIndex = problems[problemIndex].correctIndex;
        break;
      case 'smartypants':
        problems = smartyPantsProblems;
        correctIndex = problems[problemIndex].correctIndex;
        break;
      default:
        problems = vocabWords;
        correctIndex = problems[problemIndex].correctIndex;
    }
    
    const correct = selectedIndex === correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    playSound(correct ? 'correct' : 'incorrect', 0.1);
    
    if (correct) {
      const streakMultiplier = Math.min(dailyChallengeState.streak + 1, 5);
      const timeBonus = Math.floor(dailyChallengeState.timeLeft / 30) * 5;
      const points = (10 * streakMultiplier) + timeBonus;
      
      setDailyChallengeState(prev => ({
        ...prev,
        points: prev.points + points,
        streak: prev.streak + 1,
        multiplier: streakMultiplier
      }));
    } else {
      setDailyChallengeState(prev => ({
        ...prev,
        streak: 0,
        multiplier: 1
      }));
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (correct) {
        if (type === 'vocab') {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * vocabWords.length);
          } while (newIndex === currentWord);
          setCurrentWord(newIndex);
        } else if (type === 'math') {
          setCurrentProblem(getRandomQuestion(mathProblems, 'math'));
        } else if (type === 'reading') {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * readingPassages.length);
          } while (newIndex === currentPassage);
          setCurrentPassage(newIndex);
        } else if (type === 'writing') {
          setCurrentProblem(getRandomQuestion(writingProblems, 'writing'));
        } else if (type === 'smartypants') {
          // Only increment if we haven't reached the end of questions
          if (currentProblem < smartyPantsProblems.length - 1) {
            setCurrentProblem(currentProblem + 1);
          } else {
            // If we've reached the end, go back to the first question
            setCurrentProblem(0);
          }
        }
      }
    }, 1500);
  };

  const startDailyChallenge = () => {
    clearInterval(dailyTimerRef.current);
    setDailyChallengeState({
      timeLeft: 300,
      isActive: true,
      currentCategory: 'math',
      progress: {
        math: 0,
        writing: 0,
        smartypants: 0
      },
      correctAnswers: {
        math: 0,
        writing: 0,
        smartypants: 0
      },
      points: 0,
      currentQuestionIndex: 0,
      streak: 0,
      multiplier: 1
    });
    handleSectionChange('daily');
  };

  const sections: Record<SectionKey, Section> = {
    home: {
      title: "Dashboard",
      icon: <Home className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Home className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Welcome Back!</h2>
              <p className="text-gray-400">Your learning journey continues</p>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-0">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-yellow-400">
                    {userProgress.points}
                  </div>
                  <div className="text-sm text-gray-300">Points</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-0">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-orange-400">{userProgress.streak}</div>
                  <div className="text-sm text-gray-300">Streak</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-0">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-400">
                    {Math.floor(userProgress.points / 100)}
                  </div>
                  <div className="text-sm text-gray-300">Level</div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Challenge Section - Made Larger */}
            <Card className="bg-gray-800 border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="w-10 h-10 text-blue-400" />
                  <h2 className="text-2xl font-bold text-gray-100">Daily Challenge</h2>
                </div>
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">Today's Challenge</h3>
                  <p className="text-gray-300 mb-8 text-lg">Complete 3 questions from each category</p>
                  <button
                    onClick={startDailyChallenge}
                    className="w-full max-w-md px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Start Challenge
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Start / Focused Practice Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-4">Focused Practice</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { key: 'vocabulary', title: 'Vocabulary', icon: <GraduationCap className="w-6 h-6" /> },
                  { key: 'math', title: 'Math', icon: <Calculator className="w-6 h-6" /> },
                  { key: 'comprehension', title: 'Reading', icon: <BookOpen className="w-6 h-6" /> },
                  { key: 'writing', title: 'Writing', icon: <Pen className="w-6 h-6" /> },
                  { key: 'smartypants', title: 'Smarty Pants', icon: <Lightbulb className="w-6 h-6" /> }
                ].map(({ key, title, icon }) => (
                  <button
                    key={key}
                    onClick={() => handleSectionChange(key)}
                    className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center group"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors">
                        {icon}
                      </div>
                      <span className="font-medium">{title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    vocabulary: {
      title: "Vocabulary",
      icon: <GraduationCap className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Vocabulary Builder</h2>
              <p className="text-gray-400">Expand your word knowledge</p>
            </div>
          </div>
          
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                  >
                    "{vocabWords[currentWord].word}"
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-3"
                  >
                    {vocabWords[currentWord].options.map((option, index) => (
                      <AnswerButton
                        key={index}
                        option={option}
                        index={index}
                        isCorrect={index === vocabWords[currentWord].correctIndex}
                        onClick={(idx) => handleAnswer(currentWord, idx, 'vocab')}
                        revealed={showFeedback && index === vocabWords[currentWord].correctIndex}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
                {showFeedback && (
                  <Alert className={isCorrect ? "bg-green-500/20" : "bg-red-500/20"}>
                    <span className="text-white">
                      {isCorrect ? `Correct! +${10 + Math.floor(userProgress.streak / 3) * 5} points` : "Try again!"}
                    </span>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    math: {
      title: "Math Practice",
      icon: <Calculator className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calculator className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-gray-100">Math Practice</h2>
                <p className="text-gray-400">Solve mathematical problems</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setMathMode('relaxed');
                  setTimeBombState(prev => ({ ...prev, isActive: false }));
                }}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  mathMode === 'relaxed' 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                Relaxed Mode
              </button>
              <button
                onClick={() => {
                  setMathMode('timebomb');
                  setTimeBombState({
                    timeLeft: 180,
                    strikes: 3,
                    correctAnswers: 0,
                    isActive: true
                  });
                }}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  mathMode === 'timebomb' 
                    ? "bg-red-500 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                Time Bomb Mode
              </button>
            </div>
          </div>
          
          {mathMode === 'timebomb' && (
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-red-400">
                  <span className="text-lg">⚡ </span>
                  {Array.from({ length: timeBombState.strikes }).map((_, i) => (
                    <span key={i}>❤️</span>
                  ))}
                </div>
                <div className="text-green-400">
                  <span className="text-lg">✓ </span>
                  {timeBombState.correctAnswers}/10
                </div>
              </div>
              <div className="text-xl font-mono">
                {Math.floor(timeBombState.timeLeft / 60)}:
                {(timeBombState.timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
          )}
          
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProblem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-medium p-6 rounded-lg bg-gray-700 text-gray-100"
                  >
                    {mathProblems[currentProblem].question}
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProblem}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-3"
                  >
                    {mathProblems[currentProblem].options.map((option, index) => (
                      <AnswerButton
                        key={index}
                        option={option}
                        index={index}
                        isCorrect={index === mathProblems[currentProblem].correctIndex}
                        onClick={(idx) => {
                          if (mathMode === 'timebomb') {
                            const correct = idx === mathProblems[currentProblem].correctIndex;
                            setTimeBombState(prev => ({
                              ...prev,
                              strikes: correct ? prev.strikes : prev.strikes - 1,
                              correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
                              isActive: prev.strikes > 1 && prev.correctAnswers < 9
                            }));
                          }
                          handleAnswer(currentProblem, idx, 'math');
                        }}
                        revealed={showFeedback && index === mathProblems[currentProblem].correctIndex}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
                {mathMode === 'timebomb' && (
                  timeBombState.correctAnswers >= 10 ? (
                    <div className="text-center p-4 bg-green-500/20 rounded-lg">
                      <h3 className="text-xl font-bold text-green-400">Victory! 🎉</h3>
                      <p className="text-gray-300">You've completed the Time Bomb challenge!</p>
                    </div>
                  ) : timeBombState.strikes <= 0 || timeBombState.timeLeft <= 0 ? (
                    <div className="text-center p-4 bg-red-500/20 rounded-lg">
                      <h3 className="text-xl font-bold text-red-400">Game Over!</h3>
                      <p className="text-gray-300">
                        {timeBombState.strikes <= 0 ? "Out of lives!" : "Time's up!"}
                      </p>
                    </div>
                  ) : null
                )}
                {showFeedback && (
                  <Alert className={isCorrect ? "bg-green-500/20" : "bg-red-500/20"}>
                    {isCorrect ? (
                      <>
                        <span className="text-white">
                          Correct! +{10 + Math.floor(userProgress.streak / 3) * 5} points
                        </span>
                        <br />
                        <span className="text-sm opacity-90">
                          {mathProblems[currentProblem].explanation}
                        </span>
                      </>
                    ) : (
                      <span className="text-white">Try again!</span>
                    )}
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    comprehension: {
      title: "Reading Comprehension",
      icon: <BookOpen className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Reading Comprehension</h2>
              <p className="text-gray-400">Analyze and understand passages</p>
            </div>
          </div>
          
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPassage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-100">{readingPassages[currentPassage].title}</h3>
                    <p className="whitespace-pre-line text-lg text-gray-100">{readingPassages[currentPassage].text}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="space-y-6">
                  {readingPassages[currentPassage].questions.map((q, qIndex) => (
                    <div key={qIndex} className="space-y-4">
                      <h3 className="font-semibold text-lg text-emerald-400">Question {qIndex + 1}</h3>
                      <p className="text-xl text-gray-200 mb-4">{q.question}</p>
                      <div className="space-y-3">
                        {q.options.map((option, index) => (
                          <AnswerButton
                            key={index}
                            option={option}
                            index={index}
                            isCorrect={index === q.correctIndex}
                            onClick={(idx) => handleAnswer(qIndex, idx, 'reading')}
                            revealed={showFeedback && currentProblem === qIndex && index === q.correctIndex}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    writing: {
      title: "Writing & Language",
      icon: <Pen className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Pen className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Writing & Language</h2>
              <p className="text-gray-400">Improve grammar and style</p>
            </div>
          </div>
          
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProblem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-2 text-lg text-emerald-400">{writingProblems[currentProblem].context}</p>
                    <p className="text-2xl text-gray-100">{writingProblems[currentProblem].sentence}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="space-y-3">
                  {writingProblems[currentProblem].options.map((option, index) => (
                    <AnswerButton
                      key={index}
                      option={option}
                      index={index}
                      isCorrect={index === writingProblems[currentProblem].correctIndex}
                      onClick={(idx) => handleAnswer(currentProblem, idx, 'writing')}
                      revealed={showFeedback && index === writingProblems[currentProblem].correctIndex}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    daily: {
      title: "Daily Challenge",
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-gray-100">Daily Challenge</h2>
                <p className="text-gray-400">Complete all categories</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  initial={{ width: '100%' }}
                  animate={{ 
                    width: `${(dailyChallengeState.timeLeft / 300) * 100}%`,
                    backgroundColor: dailyChallengeState.timeLeft < 120 
                      ? dailyChallengeState.timeLeft < 60 
                        ? '#ef4444' // red-500
                        : '#f59e0b' // amber-500
                      : '#10b981' // emerald-500
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="text-xl font-mono text-gray-300 w-16">
                {Math.floor(dailyChallengeState.timeLeft / 60)}:
                {(dailyChallengeState.timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(dailyChallengeState.progress).map(([category, _progress]) => (
              <div
                key={category}
                className={cn(
                  "p-4 rounded-lg",
                  dailyChallengeState.currentCategory === category 
                    ? "bg-gray-800/80" 
                    : "bg-gray-800"
                )}
              >
                <div className="flex flex-col items-center mb-3">
                  {category === 'math' && <Calculator className="w-5 h-5 mb-1 text-blue-400" />}
                  {category === 'writing' && <Pen className="w-5 h-5 mb-1 text-emerald-400" />}
                  {category === 'smartypants' && <Brain className="w-5 h-5 mb-1 text-purple-400" />}
                  <div className="font-medium capitalize text-center">{category}</div>
                </div>
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: 3 }).map((_, index) => {
                    const questionAttempted = index < dailyChallengeState.progress[category as keyof CategoryScores];
                    const isCorrect = index < dailyChallengeState.correctAnswers[category as keyof CategoryScores];
                    return (
                      <div
                        key={index}
                        className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center",
                          questionAttempted
                            ? isCorrect
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-gray-700"
                        )}
                      >
                        {questionAttempted && (
                          isCorrect
                            ? <span className="text-xs">✓</span>
                            : <span className="text-xs">×</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="px-6 py-3 bg-gray-800 rounded-lg">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-emerald-400 font-bold text-xl">
                  +{dailyChallengeState.points} Points
                </span>
                <span className="text-gray-400 text-sm">
                  Total: {userProgress.points}
                </span>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800 border-0">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${dailyChallengeState.currentCategory}-${dailyChallengeState.currentQuestionIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="p-6 rounded-lg bg-gray-700 text-gray-100">
                      <p className="text-2xl">
                        {dailyChallengeState.currentCategory === 'math' 
                          ? mathProblems[dailyChallengeState.currentQuestionIndex].question
                          : dailyChallengeState.currentCategory === 'writing'
                            ? writingProblems[dailyChallengeState.currentQuestionIndex].sentence
                            : smartyPantsProblems[dailyChallengeState.currentQuestionIndex].question
                        }
                      </p>
                    </div>
                    <div className="space-y-3">
                      {(dailyChallengeState.currentCategory === 'math' 
                        ? mathProblems[dailyChallengeState.currentQuestionIndex].options
                        : dailyChallengeState.currentCategory === 'writing'
                          ? writingProblems[dailyChallengeState.currentQuestionIndex].options
                          : smartyPantsProblems[dailyChallengeState.currentQuestionIndex].options
                      ).map((option, index) => (
                        <AnswerButton
                          key={index}
                          option={option}
                          index={index}
                          isCorrect={index === (dailyChallengeState.currentCategory === 'math'
                            ? mathProblems[dailyChallengeState.currentQuestionIndex].correctIndex
                            : dailyChallengeState.currentCategory === 'writing'
                              ? writingProblems[dailyChallengeState.currentQuestionIndex].correctIndex
                              : smartyPantsProblems[dailyChallengeState.currentQuestionIndex].correctIndex)}
                          onClick={(idx) => {
                            const correct = idx === (dailyChallengeState.currentCategory === 'math'
                              ? mathProblems[dailyChallengeState.currentQuestionIndex].correctIndex
                              : dailyChallengeState.currentCategory === 'writing'
                                ? writingProblems[dailyChallengeState.currentQuestionIndex].correctIndex
                                : smartyPantsProblems[dailyChallengeState.currentQuestionIndex].correctIndex);
                            
                            setIsCorrect(correct);
                            setShowFeedback(true);
                            playSound(correct ? 'correct' : 'incorrect', 0.1);
                            
                            setTimeout(() => {
                              setShowFeedback(false);
                              setDailyChallengeState(prev => {
                                const newProgress = {
                                  ...prev.progress,
                                  [prev.currentCategory]: prev.progress[prev.currentCategory] + 1
                                };
                                
                                const newCorrectAnswers = {
                                  ...prev.correctAnswers,
                                  [prev.currentCategory]: correct 
                                    ? prev.correctAnswers[prev.currentCategory] + 1 
                                    : prev.correctAnswers[prev.currentCategory]
                                };
                                
                                const newPoints = prev.points + (correct ? 10 : 0);
                                
                                if (prev.currentCategory === 'math' && newProgress.math >= 3) {
                                  return {
                                    ...prev,
                                    currentCategory: 'writing',
                                    currentQuestionIndex: 0,
                                    progress: newProgress,
                                    correctAnswers: newCorrectAnswers,
                                    points: newPoints
                                  };
                                } else if (prev.currentCategory === 'writing' && newProgress.writing >= 3) {
                                  return {
                                    ...prev,
                                    currentCategory: 'smartypants',
                                    currentQuestionIndex: 0,
                                    progress: newProgress,
                                    correctAnswers: newCorrectAnswers,
                                    points: newPoints
                                  };
                                } else if (newProgress.math >= 3 && newProgress.writing >= 3 && newProgress.smartypants >= 3) {
                                  return {
                                    ...prev,
                                    isActive: false,
                                    points: newPoints
                                  };
                                }
                                
                                return {
                                  ...prev,
                                  currentQuestionIndex: prev.currentQuestionIndex + 1,
                                  progress: newProgress,
                                  correctAnswers: newCorrectAnswers,
                                  points: newPoints
                                };
                              });
                            }, 1500);
                          }}
                          revealed={showFeedback && (index === (dailyChallengeState.currentCategory === 'math'
                            ? mathProblems[dailyChallengeState.currentQuestionIndex].correctIndex
                            : dailyChallengeState.currentCategory === 'writing'
                              ? writingProblems[dailyChallengeState.currentQuestionIndex].correctIndex
                              : smartyPantsProblems[dailyChallengeState.currentQuestionIndex].correctIndex))}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {!dailyChallengeState.isActive && dailyChallengeState.points > 0 && (
            <GameOver
              points={dailyChallengeState.points}
              streak={userProgress.streak + 1}
              onClose={() => {
                setUserProgress(prev => ({
                  ...prev,
                  points: prev.points + dailyChallengeState.points,
                  streak: prev.streak + 1,
                  dailyChallenge: {
                    ...prev.dailyChallenge,
                    completed: true,
                    score: dailyChallengeState.points
                  }
                }));
                handleSectionChange('home');
              }}
            />
          )}

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Daily Progress</span>
              <span>{Math.round((dailyChallengeState.progress.math + dailyChallengeState.progress.writing + dailyChallengeState.progress.smartypants) / 9 * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ 
                  width: `${(dailyChallengeState.progress.math + dailyChallengeState.progress.writing + dailyChallengeState.progress.smartypants) / 9 * 100}%` 
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-400">Math</div>
                <div className="text-lg font-bold text-blue-400">{dailyChallengeState.progress.math}/3</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-400">Writing</div>
                <div className="text-lg font-bold text-purple-400">{dailyChallengeState.progress.writing}/3</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-400">Smarty Pants</div>
                <div className="text-lg font-bold text-emerald-400">{dailyChallengeState.progress.smartypants}/3</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className={cn(
              "px-4 py-2 rounded-full font-mono text-lg",
              dailyChallengeState.timeLeft < 60 ? "bg-red-500/20 text-red-400" : "bg-gray-700 text-gray-300"
            )}>
              {Math.floor(dailyChallengeState.timeLeft / 60)}:{(dailyChallengeState.timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-sm text-gray-400">Bonus Points Available</div>
            <div className="text-2xl font-bold text-yellow-400">
              +{Math.floor(dailyChallengeState.timeLeft / 30) * 5}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="px-4 py-2 bg-gray-700 rounded-full">
              <span className="text-orange-400 font-bold">{dailyChallengeState.streak}×</span>
              <span className="text-gray-400 text-sm ml-1">Streak</span>
            </div>
            {dailyChallengeState.streak > 0 && (
              <div className="text-sm text-gray-400">
                Next answer worth {10 * Math.min(dailyChallengeState.streak + 1, 5)} points
              </div>
            )}
          </div>
        </div>
      )
    },
    smartypants: {
      title: "Smarty Pants",
      icon: <Brain className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Brain className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Smarty Pants</h2>
              <p className="text-gray-400">Test your general knowledge</p>
            </div>
          </div>
          
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                {smartyPantsProblems && smartyPantsProblems[currentProblem] && (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentProblem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-2xl text-gray-100 p-6 rounded-lg bg-gray-700">
                          {smartyPantsProblems[currentProblem].question}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    <div className="space-y-3">
                      {smartyPantsProblems[currentProblem].options.map((option, index) => (
                        <AnswerButton
                          key={index}
                          option={option}
                          index={index}
                          isCorrect={index === smartyPantsProblems[currentProblem].correctIndex}
                          onClick={(idx) => handleAnswer(currentProblem, idx, 'smartypants')}
                          revealed={showFeedback && index === smartyPantsProblems[currentProblem].correctIndex}
                        />
                      ))}
                    </div>
                    {showFeedback && (
                      <Alert className={isCorrect ? "bg-green-500/20" : "bg-red-500/20"}>
                        {isCorrect ? (
                          <>
                            <span className="text-white">
                              Correct! +{10 + Math.floor(userProgress.streak / 3) * 5} points
                            </span>
                            <br />
                            <span className="text-sm opacity-90">
                              {smartyPantsProblems[currentProblem].explanation}
                            </span>
                          </>
                        ) : (
                          <span className="text-white">Try again!</span>
                        )}
                      </Alert>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Add this right after the Brain icon and title section */}
          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-400">
              Question {currentProblem + 1} of {smartyPantsProblems.length}
            </span>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      {/* Show celebrations at certain points */}
      {dailyChallengeState.streak === 5 && (
        <Celebration message="5× Streak! Maximum Multiplier!" />
      )}
      {dailyChallengeState.points >= 100 && (
        <Celebration message="100 Points! You're On Fire! 🔥" />
      )}

      <div className="max-w-6xl mx-auto">
        {/* Top Navigation - Only shows when not on home page */}
        {activeSection !== 'home' && (
          <div className="mb-8">
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2">
              <button 
                onClick={() => handleSectionChange('home')}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2 text-gray-300 hover:text-gray-100"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              
              <div className="flex items-center space-x-1">
                {[
                  { key: 'vocabulary', title: 'Vocabulary', icon: <GraduationCap className="w-5 h-5" /> },
                  { key: 'math', title: 'Math', icon: <Calculator className="w-5 h-5" /> },
                  { key: 'comprehension', title: 'Reading', icon: <BookOpen className="w-5 h-5" /> },
                  { key: 'writing', title: 'Writing', icon: <Pen className="w-5 h-5" /> }
                ].map(({ key, title, icon }) => (
                  <button
                    key={key}
                    onClick={() => handleSectionChange(key)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      activeSection === key 
                        ? "bg-gray-700 text-blue-400" 
                        : "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                    )}
                    title={title}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Title section - Only show on home page */}
        {activeSection === 'home' && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Brain Train
            </h1>
            <p className="text-gray-300">Test Prep for Your Middle School Child</p>
          </div>
        )}

        {activeSection === 'home' ? (
          <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-0">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-yellow-400">
                    {userProgress.points}
                  </div>
                  <div className="text-sm text-gray-300">Points</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-0">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-orange-400">{userProgress.streak}</div>
                  <div className="text-sm text-gray-300">Streak</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-0">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-400">
                    {Math.floor(userProgress.points / 100)}
                  </div>
                  <div className="text-sm text-gray-300">Level</div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Challenge Section - Made Larger */}
            <Card className="bg-gray-800 border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="w-10 h-10 text-blue-400" />
                  <h2 className="text-2xl font-bold text-gray-100">Daily Challenge</h2>
                </div>
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">Today's Challenge</h3>
                  <p className="text-gray-300 mb-8 text-lg">Complete 3 questions from each category</p>
                  <button
                    onClick={startDailyChallenge}
                    className="w-full max-w-md px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Start Challenge
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Start / Focused Practice Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-4">Focused Practice</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { key: 'vocabulary', title: 'Vocabulary', icon: <GraduationCap className="w-6 h-6" /> },
                  { key: 'math', title: 'Math', icon: <Calculator className="w-6 h-6" /> },
                  { key: 'comprehension', title: 'Reading', icon: <BookOpen className="w-6 h-6" /> },
                  { key: 'writing', title: 'Writing', icon: <Pen className="w-6 h-6" /> },
                  { key: 'smartypants', title: 'Smarty Pants', icon: <Lightbulb className="w-6 h-6" /> }
                ].map(({ key, title, icon }) => (
                  <button
                    key={key}
                    onClick={() => handleSectionChange(key)}
                    className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center group"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors">
                        {icon}
                      </div>
                      <span className="font-medium">{title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {sections[activeSection].content}
          </div>
        )}
      </div>
    </div>
  );
};

export default SATPrep;

 