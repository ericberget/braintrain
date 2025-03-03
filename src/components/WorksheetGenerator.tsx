import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, Calculator, BookOpen, ChevronUp, ChevronDown, Eye, EyeOff, BarChart } from 'lucide-react';
import { jsPDF } from "jspdf";
import { cn } from '../lib/utils';

type WorksheetType = 'fractions' | 'percentages' | 'simple' | 'grammar' | 'vocabulary' | 'parts-of-speech' | 'coordinate-geometry' | 'statistics' | 'volume-surface-area';

interface WorksheetQuestion {
  question: string;
  answer: string;
  workSpace?: string; // Optional hint or grid type
  boxPosition?: 'numerator' | 'denominator';
  steps?: string[];
}

interface DifficultyLevel {
  label: string;
  value: 'easy' | 'medium' | 'hard';
  description: string;
}

const difficultyLevels: DifficultyLevel[] = [
  {
    label: 'Easy',
    value: 'easy',
    description: 'Basic concepts with straightforward calculations'
  },
  {
    label: 'Medium',
    value: 'medium',
    description: 'Mixed operations and moderate complexity'
  },
  {
    label: 'Hard',
    value: 'hard',
    description: 'Complex problems requiring multiple steps'
  }
];

interface TopicCategory {
  label: string;
  value: string;
  description: string;
}

const mathTopics: TopicCategory[] = [
  {
    label: 'Number Sense',
    value: 'number-sense',
    description: 'Integers, fractions, decimals, and percentages'
  },
  {
    label: 'Algebra',
    value: 'algebra',
    description: 'Variables, expressions, and equations'
  },
  {
    label: 'Geometry',
    value: 'geometry',
    description: 'Shapes, area, perimeter, and volume'
  },
  {
    label: 'Coordinate Geometry',
    value: 'coordinate-geometry',
    description: 'Plotting points, distances, and shapes on coordinate plane'
  },
  {
    label: 'Statistics',
    value: 'statistics',
    description: 'Mean, median, mode, range, and data analysis'
  },
  {
    label: 'Volume & Surface Area',
    value: 'volume-surface-area',
    description: '3D shapes, volume, and surface area calculations'
  },
  {
    label: 'Measurement',
    value: 'measurement',
    description: 'Units, conversion, and real-world applications'
  }
];

const WorksheetGenerator = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<WorksheetType | null>(null);
  const [questions, setQuestions] = useState<WorksheetQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Move questionTemplates here
  const questionTemplates = {
    // ... existing templates ...
  } as const;

  const handleSubjectClick = (type: WorksheetType) => {
    setSelectedType(type);
    setSelectedSubject(type);
  };

  const handleGenerateClick = () => {
    if (!selectedType) return;
    
    setIsGenerating(true);
    generateWorksheet();
  };

  const generateFractionQuestions = (): WorksheetQuestion[] => {
    const generateEquivalentFraction = () => {
      // Use common multipliers that create nice numbers
      const multipliers = [2, 3, 4, 5, 6, 8, 10];
      
      // Start with simple fractions
      const commonFractions = [
        { num: 1, den: 2 }, { num: 1, den: 3 }, { num: 1, den: 4 },
        { num: 2, den: 3 }, { num: 3, den: 4 }, { num: 2, den: 5 },
        { num: 3, den: 5 }, { num: 4, den: 5 }, { num: 5, den: 6 },
        { num: 3, den: 8 }, { num: 5, den: 8 }, { num: 7, den: 8 }
      ];

      const fraction = commonFractions[Math.floor(Math.random() * commonFractions.length)];
      const multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];

      // Randomly decide whether to show the multiplied version or the original
      const showOriginal = Math.random() > 0.5;

      if (showOriginal) {
        return {
          question: `${fraction.num}/${fraction.den} = ${fraction.num * multiplier}/${fraction.den * multiplier}`,
          answer: `${fraction.num * multiplier}`,
          boxPosition: 'numerator' as const
        };
      } else {
        return {
          question: `${fraction.num}/${fraction.den} = ${fraction.num * multiplier}/${fraction.den * multiplier}`,
          answer: `${fraction.num}`,
          boxPosition: 'numerator' as const
        };
      }
    };

    return Array.from({ length: 20 }, () => generateEquivalentFraction());
  };

  const generatePercentageQuestions = (): WorksheetQuestion[] => {
    const questionTypes = [
      // Find the whole when given the part and percentage
      () => {
        const percentages = [10, 20, 25, 50, 75];
        const percentage = percentages[Math.floor(Math.random() * percentages.length)];
        const whole = [20, 40, 50, 60, 80, 100, 120, 200][Math.floor(Math.random() * 8)];
        const part = (percentage * whole) / 100;
        return {
          question: `${part} is ${percentage}% of what number?`,
          answer: whole.toString(),
          workSpace: "box"
        };
      },
      // Find percentage of a number
      () => {
        const percentages = [10, 20, 25, 40, 50, 75];
        const percentage = percentages[Math.floor(Math.random() * percentages.length)];
        const numbers = [20, 40, 50, 60, 80, 100, 120, 200];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        return {
          question: `What is ${percentage}% of ${number}?`,
          answer: ((percentage * number) / 100).toString(),
          workSpace: "box"
        };
      }
    ];

    // Generate 12 questions, alternating between types
    return Array.from({ length: 12 }, (_, i) => {
      const typeIndex = i % 2; // Alternates between 0 and 1
      return questionTypes[typeIndex]();
    });
  };

  const generateSimpleQuestions = (difficulty: string, topics: string[]): WorksheetQuestion[] => {
    const questionTemplates = {
      'algebra': {
        easy: [
          {
            template: "One-step equations with whole numbers",
            generate: () => {
              const x = Math.floor(Math.random() * 10) + 2;
              const b = Math.floor(Math.random() * 20) + 5;
              const result = x * b;
              return {
                question: `A number times ${b} equals ${result}. What is the number?`,
                answer: x.toString(),
                workSpace: "box",
                steps: [
                  `Let x be the unknown number`,
                  `Write the equation: x × ${b} = ${result}`,
                  `Divide both sides by ${b}: x = ${result} ÷ ${b} = ${x}`
                ]
              } as WorksheetQuestion;
            }
          },
          {
            template: "Unit rate problems",
            generate: () => {
              const items = Math.floor(Math.random() * 5) + 2;
              const cost = items * (Math.floor(Math.random() * 4) + 2);
              return {
                question: `If ${items} notebooks cost $${cost}, how much does one notebook cost?`,
                answer: (cost/items).toString(),
                workSpace: "box",
                steps: [
                  `To find the cost of one notebook, divide the total cost by the number of notebooks`,
                  `$${cost} ÷ ${items} = $${cost/items}`
                ]
              } as WorksheetQuestion;
            }
          }
        ],
        medium: [
          {
            template: "Two-step equations",
            generate: () => {
              const x = Math.floor(Math.random() * 10) + 2;
              const a = Math.floor(Math.random() * 5) + 2;
              const b = Math.floor(Math.random() * 20) + 5;
              const result = (x * a) + b;
              return {
                question: `When a number is multiplied by ${a} and then increased by ${b}, the result is ${result}. What is the number?`,
                answer: x.toString(),
                workSpace: "box",
                steps: [
                  `Let x be the unknown number`,
                  `Write the equation: ${a}x + ${b} = ${result}`,
                  `Subtract ${b} from both sides: ${a}x = ${result - b}`,
                  `Divide both sides by ${a}: x = ${result - b} ÷ ${a} = ${x}`
                ]
              } as WorksheetQuestion;
            }
          },
          {
            template: "Ratio word problems",
            generate: () => {
              const ratio = Math.floor(Math.random() * 3) + 2;
              const total = (ratio + 1) * (Math.floor(Math.random() * 4) + 3);
              const part = Math.floor(total / (ratio + 1));
              return {
                question: `In a bag of marbles, there are ${ratio} times as many blue marbles as red marbles. If there are ${total} marbles in total, how many red marbles are there?`,
                answer: part.toString(),
                workSpace: "box",
                steps: [
                  `Let x be the number of red marbles`,
                  `Then there are ${ratio}x blue marbles`,
                  `Total marbles equation: x + ${ratio}x = ${total}`,
                  `Simplify: ${ratio + 1}x = ${total}`,
                  `Solve for x: x = ${total} ÷ ${ratio + 1} = ${part}`
                ]
              } as WorksheetQuestion;
            }
          }
        ],
        hard: [
          {
            template: "Multi-step word problems",
            generate: () => {
              const rate = Math.floor(Math.random() * 20) + 30;
              const time = Math.floor(Math.random() * 2) + 2;
              const distance = rate * time;
              const remaining = Math.floor(Math.random() * 30) + 50;
              return {
                question: `A cyclist travels ${distance} miles in ${time} hours. At this same rate, how long will it take them to travel ${remaining} more miles?`,
                answer: ((remaining / rate)).toString(),
                workSpace: "box",
                steps: [
                  `Find the rate: ${distance} miles ÷ ${time} hours = ${rate} miles per hour`,
                  `Use rate to find time: ${remaining} miles ÷ ${rate} miles per hour = ${remaining / rate} hours`
                ]
              } as WorksheetQuestion;
            }
          },
          {
            template: "Percent increase/decrease",
            generate: () => {
              const original = Math.floor(Math.random() * 50) + 50;
              const percent = Math.floor(Math.random() * 4) + 2;
              const increase = original * (percent * 0.1);
              return {
                question: `A store increases all prices by ${percent * 10}%. If a shirt originally cost $${original}, what is the amount of the increase in dollars?`,
                answer: increase.toString(),
                workSpace: "box",
                steps: [
                  `Convert ${percent * 10}% to decimal: ${percent * 0.1}`,
                  `Multiply original price by decimal: $${original} × ${percent * 0.1} = $${increase}`
                ]
              } as WorksheetQuestion;
            }
          }
        ]
      },
      'geometry': {
        easy: [
          {
            template: "Rectangle area word problems",
            generate: () => {
              const width = Math.floor(Math.random() * 8) + 3;
              const length = width + (Math.floor(Math.random() * 4) + 2);
              const area = length * width;
              return {
                question: `A rectangular garden has a width of ${width} yards and a length of ${length} yards. What is its area in square yards?`,
                answer: area.toString(),
                workSpace: "box",
                steps: [
                  `Area of a rectangle = length × width`,
                  `Area = ${length} × ${width} = ${area} square yards`
                ]
              } as WorksheetQuestion;
            }
          }
        ],
        medium: [
          {
            template: "Perimeter with missing side",
            generate: () => {
              const width = Math.floor(Math.random() * 6) + 4;
              const length = width + (Math.floor(Math.random() * 4) + 2);
              const perimeter = 2 * (length + width);
              return {
                question: `The perimeter of a rectangle is ${perimeter} feet. If the width is ${width} feet, what is the length?`,
                answer: length.toString(),
                workSpace: "box",
                steps: [
                  `Perimeter = 2 × (length + width)`,
                  `${perimeter} = 2 × (length + ${width})`,
                  `${perimeter} = 2length + ${2 * width}`,
                  `2length = ${perimeter} - ${2 * width}`,
                  `length = ${length}`
                ]
              } as WorksheetQuestion;
            }
          }
        ],
        hard: [
          {
            template: "Area and cost problems",
            generate: () => {
              const length = Math.floor(Math.random() * 10) + 8;
              const width = Math.floor(Math.random() * 6) + 5;
              const area = length * width;
              const costPerUnit = Math.floor(Math.random() * 5) + 3;
              return {
                question: `A rectangular floor measures ${length} feet by ${width} feet. If carpet costs $${costPerUnit} per square foot, how much will it cost to carpet the entire floor?`,
                answer: (area * costPerUnit).toString(),
                workSpace: "box",
                steps: [
                  `Find the area: ${length} × ${width} = ${area} square feet`,
                  `Multiply area by cost per square foot: ${area} × $${costPerUnit} = $${area * costPerUnit}`
                ]
              } as WorksheetQuestion;
            }
          }
        ]
      },
      'measurement': {
        easy: [
          {
            template: "Simple unit conversion",
            generate: () => {
              const feet = Math.floor(Math.random() * 20) + 10;
              return {
                question: `Convert ${feet} feet to inches. (Hint: 1 foot = 12 inches)`,
                answer: (feet * 12).toString(),
                workSpace: "box",
                steps: [
                  `Multiply feet by 12 to convert to inches`,
                  `${feet} × 12 = ${feet * 12} inches`
                ]
              } as WorksheetQuestion;
            }
          }
        ],
        medium: [
          {
            template: "Rate and time problems",
            generate: () => {
              const rate = Math.floor(Math.random() * 15) + 25;
              const time = Math.floor(Math.random() * 3) + 2;
              return {
                question: `If a car travels at ${rate} miles per hour, how far will it travel in ${time} hours?`,
                answer: (rate * time).toString(),
                workSpace: "box",
                steps: [
                  `Distance = rate × time`,
                  `Distance = ${rate} × ${time} = ${rate * time} miles`
                ]
              } as WorksheetQuestion;
            }
          }
        ],
        hard: [
          {
            template: "Complex unit conversion",
            generate: () => {
              const gallons = Math.floor(Math.random() * 10) + 5;
              const cups = gallons * 16;
              return {
                question: `Convert ${gallons} gallons to cups. (Hints: 1 gallon = 4 quarts, 1 quart = 2 pints, 1 pint = 2 cups)`,
                answer: cups.toString(),
                workSpace: "box",
                steps: [
                  `First convert gallons to quarts: ${gallons} × 4 = ${gallons * 4} quarts`,
                  `Then convert quarts to pints: ${gallons * 4} × 2 = ${gallons * 8} pints`,
                  `Finally convert pints to cups: ${gallons * 8} × 2 = ${cups} cups`
                ]
              } as WorksheetQuestion;
            }
          }
        ]
      }
    } as const;

    let questions: WorksheetQuestion[] = [];
    const questionsPerTopic = Math.ceil(20 / topics.length);

    topics.forEach(topic => {
      const topicTemplates = questionTemplates[topic as keyof typeof questionTemplates];
      if (topicTemplates) {
        const difficultyTemplates = topicTemplates[difficulty as keyof typeof topicTemplates];
        if (difficultyTemplates) {
          for (let i = 0; i < questionsPerTopic; i++) {
            const template = difficultyTemplates[Math.floor(Math.random() * difficultyTemplates.length)];
            questions.push(template.generate());
          }
        }
      }
    });

    // If we don't have enough questions, fill with algebra questions
    if (questions.length === 0) {
      const template = questionTemplates['algebra'].medium[0];
      questions = Array.from({ length: 20 }, () => template.generate());
    }

    return questions.slice(0, 20);
  };

  const generateGrammarQuestions = (): WorksheetQuestion[] => {
    const questionTypes = [
      // Subject-Verb Agreement
      () => {
        const sentences = [
          { 
            base: "The group of students ___ (walk/walks) to school.",
            correct: "walks",
            explanation: "Collective nouns like 'group' take singular verbs."
          },
          {
            base: "Neither the dogs nor the cat ___ (want/wants) to eat.",
            correct: "wants",
            explanation: "When using 'neither/nor', the verb agrees with the closest subject."
          },
          {
            base: "Each of the players ___ (have/has) a uniform.",
            correct: "has",
            explanation: "'Each' is always singular."
          },
          {
            base: "The team ___ (practice/practices) every day.",
            correct: "practices",
            explanation: "Collective nouns like 'team' take singular verbs."
          },
          {
            base: "Mathematics ___ (is/are) my favorite subject.",
            correct: "is",
            explanation: "Subjects that look plural but represent one thing take singular verbs."
          }
        ];
        const sentence = sentences[Math.floor(Math.random() * sentences.length)];
        return {
          question: `Choose the correct verb: ${sentence.base}`,
          answer: sentence.correct,
          workSpace: "line"
        };
      },
      // Pronouns
      () => {
        const problems = [
          {
            base: "Sarah and ___ (I/me) went to the store.",
            correct: "I",
            explanation: "Use 'I' as a subject pronoun."
          },
          {
            base: "Please give the book to John and ___ (I/me).",
            correct: "me",
            explanation: "Use 'me' as an object pronoun."
          },
          {
            base: "The homework was completed by ___ (they/them).",
            correct: "them",
            explanation: "Use 'them' as an object pronoun."
          },
          {
            base: "___ (Your/You're) going to love this book!",
            correct: "You're",
            explanation: "'You're' is a contraction of 'you are'."
          },
          {
            base: "The dog chased ___ (its/it's) tail.",
            correct: "its",
            explanation: "'Its' shows possession, 'it's' means 'it is'."
          }
        ];
        const problem = problems[Math.floor(Math.random() * problems.length)];
        return {
          question: `Choose the correct pronoun: ${problem.base}`,
          answer: problem.correct,
          workSpace: "line"
        };
      },
      // Punctuation
      () => {
        const sentences = [
          {
            base: "I packed a lunch___ went to the park___ and had a picnic.",
            correct: ", , ",
            explanation: "Use commas to separate independent clauses with coordinating conjunctions."
          },
          {
            base: "The store sells books___ magazines___ and newspapers.",
            correct: ", ,",
            explanation: "Use commas in a series."
          },
          {
            base: "I love reading___ however___ I don't like writing reports.",
            correct: "; ,",
            explanation: "Use a semicolon before and comma after transitional expressions."
          },
          {
            base: "Please bring the following items___ pencils___ paper___ and erasers.",
            correct: ": , ,",
            explanation: "Use a colon to introduce a list, then commas to separate items."
          }
        ];
        const sentence = sentences[Math.floor(Math.random() * sentences.length)];
        return {
          question: `Add proper punctuation where the underscores are: ${sentence.base}`,
          answer: sentence.correct,
          workSpace: "line"
        };
      }
    ];

    // Generate 20 questions, roughly equal distribution of each type
    return Array.from({ length: 20 }, (_, i) => {
      const typeIndex = Math.floor(i / 7); // Ensures even distribution
      return questionTypes[typeIndex % 3]();
    });
  };

  const generateVocabularyQuestions = (): WorksheetQuestion[] => {
    const vocabularyWords = [
      { 
        word: 'surreptitious',
        correct: 'secretive',
        wrong: ['obvious', 'noticeable'],
        hint: 'Done in a way to avoid being noticed'
      },
      { 
        word: 'cacophony',
        correct: 'discord',
        wrong: ['harmony', 'melody'],
        hint: 'A harsh mixture of sounds'
      },
      { 
        word: 'paradigm',
        correct: 'model',
        wrong: ['exception', 'deviation'],
        hint: 'A typical pattern or example'
      },
      { 
        word: 'ephemeral',
        correct: 'transient',
        wrong: ['permanent', 'enduring'],
        hint: 'Lasting for a very short time'
      },
      { 
        word: 'ambivalent',
        correct: 'uncertain',
        wrong: ['decisive', 'determined'],
        hint: 'Having mixed feelings about something'
      },
      { 
        word: 'fastidious',
        correct: 'meticulous',
        wrong: ['careless', 'sloppy'],
        hint: 'Very attentive to detail'
      },
      { 
        word: 'enigmatic',
        correct: 'mysterious',
        wrong: ['obvious', 'clear'],
        hint: 'Difficult to interpret or understand'
      },
      { 
        word: 'precarious',
        correct: 'unstable',
        wrong: ['secure', 'safe'],
        hint: 'Not securely held in position'
      },
      { 
        word: 'circumvent',
        correct: 'bypass',
        wrong: ['confront', 'face'],
        hint: 'Find a way around an obstacle'
      },
      { 
        word: 'paradoxical',
        correct: 'contradictory',
        wrong: ['logical', 'consistent'],
        hint: 'Seemingly absurd but true'
      },
      { 
        word: 'quintessential',
        correct: 'archetypal',
        wrong: ['unusual', 'atypical'],
        hint: 'Representing the most perfect example'
      },
      { 
        word: 'ubiquitous',
        correct: 'omnipresent',
        wrong: ['rare', 'scarce'],
        hint: 'Found everywhere'
      },
      { 
        word: 'clandestine',
        correct: 'covert',
        wrong: ['public', 'open'],
        hint: 'Done in secret'
      },
      { 
        word: 'pragmatic',
        correct: 'practical',
        wrong: ['idealistic', 'theoretical'],
        hint: 'Dealing with things sensibly'
      },
      { 
        word: 'arbitrary',
        correct: 'random',
        wrong: ['planned', 'reasoned'],
        hint: 'Based on chance rather than reason'
      },
      { 
        word: 'peripheral',
        correct: 'marginal',
        wrong: ['central', 'essential'],
        hint: 'On the outer edge'
      },
      { 
        word: 'ambiguous',
        correct: 'vague',
        wrong: ['clear', 'definite'],
        hint: 'Open to more than one interpretation'
      },
      { 
        word: 'tenuous',
        correct: 'flimsy',
        wrong: ['strong', 'solid'],
        hint: 'Very weak or slight'
      },
      { 
        word: 'esoteric',
        correct: 'obscure',
        wrong: ['common', 'familiar'],
        hint: 'Intended for a select few'
      },
      { 
        word: 'analogous',
        correct: 'comparable',
        wrong: ['different', 'unrelated'],
        hint: 'Similar in some respects'
      }
    ];

    return Array.from({ length: 20 }, () => {
      const word = vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
      
      return {
        question: `${word.word}\n\na) ${word.correct}   b) ${word.wrong[0]}   c) ${word.wrong[1]}\n\nHint: ${word.hint}`,
        answer: 'a',  // Always making first option correct
        workSpace: "none"
      };
    });
  };

  const generatePartsOfSpeechQuestions = (): WorksheetQuestion[] => {
    const sentences = [
      {
        text: "The energetic puppy playfully chased the red ball.",
        words: [
          { word: "energetic", type: "adjective" },
          { word: "playfully", type: "adverb" },
          { word: "chased", type: "verb" },
          { word: "ball", type: "noun" }
        ]
      },
      {
        text: "She quickly finished her homework before dinner.",
        words: [
          { word: "quickly", type: "adverb" },
          { word: "finished", type: "verb" },
          { word: "homework", type: "noun" },
          { word: "dinner", type: "noun" }
        ]
      },
      {
        text: "The old tree gracefully swayed in the strong wind.",
        words: [
          { word: "old", type: "adjective" },
          { word: "gracefully", type: "adverb" },
          { word: "swayed", type: "verb" },
          { word: "wind", type: "noun" }
        ]
      }
    ];

    return Array.from({ length: 20 }, () => {
      const sentence = sentences[Math.floor(Math.random() * sentences.length)];
      const word = sentence.words[Math.floor(Math.random() * sentence.words.length)];
      
      return {
        question: `In the sentence "${sentence.text}", what part of speech is the word "${word.word}"?
                  Options: noun, verb, adjective, adverb`,
        answer: word.type,
        workSpace: "box"
      };
    });
  };

  const generateCoordinateGeometryQuestions = (): WorksheetQuestion[] => {
    const templates = questionTemplates['coordinate-geometry'];
    const questions: WorksheetQuestion[] = [];
    
    // Use selected difficulty level instead of mixing
    const difficultyTemplates = templates[selectedDifficulty as keyof typeof templates];
    if (difficultyTemplates) {
      for (let i = 0; i < 20; i++) {
        const template = difficultyTemplates[Math.floor(Math.random() * difficultyTemplates.length)];
        questions.push(template.generate());
      }
    }

    return questions;
  };

  const generateStatisticsQuestions = (): WorksheetQuestion[] => {
    const templates = questionTemplates['statistics'];
    const questions: WorksheetQuestion[] = [];
    
    // Use selected difficulty level instead of mixing
    const difficultyTemplates = templates[selectedDifficulty as keyof typeof templates];
    if (difficultyTemplates) {
      for (let i = 0; i < 20; i++) {
        const template = difficultyTemplates[Math.floor(Math.random() * difficultyTemplates.length)];
        questions.push(template.generate());
      }
    }

    return questions;
  };

  const generateVolumeSurfaceAreaQuestions = (): WorksheetQuestion[] => {
    const templates = questionTemplates['volume-surface-area'];
    const questions: WorksheetQuestion[] = [];
    
    // Use selected difficulty level instead of mixing
    const difficultyTemplates = templates[selectedDifficulty as keyof typeof templates];
    if (difficultyTemplates) {
      for (let i = 0; i < 20; i++) {
        const template = difficultyTemplates[Math.floor(Math.random() * difficultyTemplates.length)];
        questions.push(template.generate());
      }
    }

    return questions;
  };

  const generateWorksheet = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let newQuestions: WorksheetQuestion[] = [];

      switch (selectedType) {
        case 'fractions':
          newQuestions = generateFractionQuestions();
          break;
        case 'percentages':
          newQuestions = generatePercentageQuestions();
          break;
        case 'simple':
          newQuestions = generateSimpleQuestions(selectedDifficulty, selectedTopics);
          break;
        case 'grammar':
          newQuestions = generateGrammarQuestions();
          break;
        case 'vocabulary':
          newQuestions = generateVocabularyQuestions();
          break;
        case 'parts-of-speech':
          newQuestions = generatePartsOfSpeechQuestions();
          break;
        case 'coordinate-geometry':
          newQuestions = generateCoordinateGeometryQuestions();
          break;
        case 'statistics':
          newQuestions = generateStatisticsQuestions();
          break;
        case 'volume-surface-area':
          newQuestions = generateVolumeSurfaceAreaQuestions();
          break;
        // Add other worksheet types here
      }

      setQuestions(newQuestions);
      setIsGenerating(false);
    }, 600);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Set up consistent styling
    const titleSize = 16;
    const questionSize = 12;
    const workspaceHeight = 30;
    const questionsPerPage = 5;
    const questionSpacing = 8;

    // Add header
    pdf.setFontSize(titleSize);
    pdf.setFont('helvetica', 'bold');
    const title = selectedType ? `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Practice` : 'Math Practice';
    pdf.text(title, pageWidth / 2, yPosition, { align: 'center' });
    
    // Add metadata line
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const date = new Date().toLocaleDateString();
    pdf.text(`Name: ________________________________    Date: ${date}`, margin, yPosition);
    
    // Add difficulty level if applicable
    if (selectedDifficulty) {
      yPosition += 6;
      pdf.text(`Difficulty: ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}`, margin, yPosition);
    }

    yPosition += 15;
    pdf.setFontSize(questionSize);

    // Generate questions
    questions.forEach((question, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }

      // Question number and text
      pdf.setFont('helvetica', 'bold');
      const questionNum = `${index + 1}. `;
      const questionWidth = pdf.getTextWidth(questionNum);
      pdf.text(questionNum, margin, yPosition);
      
      // Question text with word wrap
      pdf.setFont('helvetica', 'normal');
      const maxWidth = pageWidth - (2 * margin) - questionWidth;
      const splitQuestion = pdf.splitTextToSize(question.question, maxWidth);
      
      // Add each line of the question
      splitQuestion.forEach((line: string, lineIndex: number) => {
        const xPosition = lineIndex === 0 ? margin + questionWidth : margin + questionWidth;
        pdf.text(line, xPosition, yPosition + (lineIndex * 6));
      });

      // Move position below question text
      yPosition += (splitQuestion.length * 6) + questionSpacing;

      // Add workspace box if needed
      if (question.workSpace === "box") {
        // Draw workspace box
        pdf.rect(margin, yPosition, pageWidth - (2 * margin), workspaceHeight);
        
        // Add "Work Space" label
        pdf.setFontSize(8);
        pdf.text("Work Space", margin + 2, yPosition + 6);
        pdf.setFontSize(questionSize);
        
        yPosition += workspaceHeight + questionSpacing;
      }

      // Add extra spacing between questions
      yPosition += 10;
    });

    // Add page numbers
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    // Save the PDF
    const filename = `${selectedType || 'math'}_practice_${selectedDifficulty || 'mixed'}.pdf`;
    pdf.save(filename);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-400 mb-2">Worksheet Generator</h2>
      <p className="text-gray-400 mb-8">Create customized practice worksheets for your students</p>

      <div className="grid gap-8">
        {/* Mathematics Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-emerald-400 mb-4">Mathematics</h3>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleSubjectClick('fractions')}
              className={cn(
                "p-4 rounded-lg transition-colors",
                selectedType === 'fractions'
                  ? "bg-emerald-600/50 text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              )}
            >
              <div className="text-sm">Fractions</div>
            </button>
            <button 
              onClick={() => handleSubjectClick('percentages')}
              className={cn(
                "p-4 rounded-lg transition-colors",
                selectedType === 'percentages'
                  ? "bg-emerald-600/50 text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              )}
            >
              <div className="text-sm">Percentages</div>
            </button>
            <button 
              onClick={() => handleSubjectClick('simple')}
              className={cn(
                "p-4 rounded-lg transition-colors",
                selectedType === 'simple'
                  ? "bg-emerald-600/50 text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              )}
            >
              <div className="text-sm">Word Problems</div>
            </button>
          </div>
        </div>

        {/* Language Arts Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-400">Language Arts</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleSubjectClick('grammar')}
              className={cn(
                "p-4 rounded-lg transition-colors",
                selectedType === 'grammar'
                  ? "bg-emerald-600/50 text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              )}
            >
              <div className="text-sm">Grammar</div>
            </button>
            <button 
              onClick={() => handleSubjectClick('vocabulary')}
              className={cn(
                "p-4 rounded-lg transition-colors",
                selectedType === 'vocabulary'
                  ? "bg-emerald-600/50 text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              )}
            >
              <div className="text-sm">Vocabulary</div>
            </button>
            <button 
              onClick={() => handleSubjectClick('parts-of-speech')}
              className={cn(
                "p-4 rounded-lg transition-colors",
                selectedType === 'parts-of-speech'
                  ? "bg-emerald-600/50 text-white"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              )}
            >
              <div className="text-sm">Parts of Speech</div>
            </button>
          </div>
        </div>

        {/* Difficulty Selection - Now visible in main UI */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-400">Difficulty Level</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {difficultyLevels.map(level => (
              <button
                key={level.value}
                onClick={() => setSelectedDifficulty(level.value)}
                className={cn(
                  "p-4 rounded-lg transition-all",
                  selectedDifficulty === level.value
                    ? "bg-emerald-600/50 text-white ring-2 ring-emerald-500"
                    : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
                )}
              >
                <div className="text-sm font-medium">{level.label}</div>
                <div className="text-xs mt-1 opacity-75">{level.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-gray-600">
          {selectedType 
            ? `Ready to generate ${selectedType} worksheet` 
            : 'Select a subject then click Generate to create a worksheet'}
        </p>
        <button 
          onClick={handleGenerateClick}
          disabled={!selectedType}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors",
            selectedType
              ? "bg-blue-600/80 hover:bg-blue-500"
              : "bg-gray-600/50 cursor-not-allowed"
          )}
        >
          <RefreshCw className={cn(
            "w-5 h-5",
            isGenerating && "animate-spin"
          )} />
          Generate New
        </button>
      </div>

      {/* Show loading state or generated worksheet */}
      {isGenerating && (
        <div className="mt-8 text-center text-gray-400">
          Generating worksheet...
        </div>
      )}

      {/* Preview Section with Enhanced Features */}
      {questions.length > 0 && !isGenerating && (
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-xl p-8 border shadow-xl max-h-[800px] overflow-y-auto">
            {/* Header */}
            <div className="text-gray-900 text-center mb-6">
              <h3 className="text-xl font-bold mb-4">
                {selectedType === 'simple' ? 'Word Problems' : 
                  `${selectedType?.charAt(0).toUpperCase()}${selectedType?.slice(1)} Practice`}
              </h3>
              <div className="text-sm">
                Name: ________________________________    Date: ________________
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Difficulty: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
              </div>
            </div>

            {/* Questions with Solutions Toggle */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowSolutions(!showSolutions)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                {showSolutions ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Solutions
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Solutions
                  </>
                )}
              </button>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {questions.map((q, i) => (
                <motion.div
                  key={i}
                  className="text-gray-900 p-4 rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="font-medium mb-2">
                    {i + 1}. {q.question}
                  </div>
                  
                  {/* Work Space */}
                  {q.workSpace && (
                    <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200 min-h-[60px]" />
                  )}

                  {/* Solution Steps */}
                  {showSolutions && q.steps && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-200"
                    >
                      <div className="text-sm text-emerald-600 font-medium mb-1">Solution:</div>
                      {q.steps.map((step, idx) => (
                        <div key={idx} className="text-sm text-gray-600 ml-2">
                          {idx + 1}. {step}
                        </div>
                      ))}
                      <div className="text-sm font-medium text-emerald-600 mt-2">
                        Answer: {q.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleGenerateClick}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Generate New
            </button>
            
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksheetGenerator; 