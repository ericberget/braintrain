import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Calculator, BookOpen } from 'lucide-react';
import { jsPDF } from "jspdf";
import { cn } from '../lib/utils';

type WorksheetType = 'fractions' | 'percentages' | 'simple' | 'grammar' | 'vocabulary' | 'parts-of-speech';

interface WorksheetQuestion {
  question: string;
  answer: string;
  workSpace?: string; // Optional hint or grid type
  boxPosition?: 'numerator' | 'denominator';
}

const WorksheetGenerator = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<WorksheetType | null>(null);
  const [questions, setQuestions] = useState<WorksheetQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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
          boxPosition: 'numerator'
        };
      } else {
        return {
          question: `${fraction.num}/${fraction.den} = ${fraction.num * multiplier}/${fraction.den * multiplier}`,
          answer: `${fraction.num}`,
          boxPosition: 'numerator'
        };
      }
    };

    // Change to 20 questions
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

  const generateSimpleQuestions = (): WorksheetQuestion[] => {
    const questionTypes = [
      // Find the whole when given a part and fraction
      () => {
        const denominators = [2, 3, 4, 5, 6, 8, 10];
        const denominator = denominators[Math.floor(Math.random() * denominators.length)];
        const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
        const whole = Math.floor(Math.random() * 8) + 2; // Random number between 2-10
        const part = (whole * numerator) / denominator;
        
        return {
          question: `If ${part} is ${numerator}/${denominator} of a number, what is the number?`,
          answer: whole.toString(),
          workSpace: "box"
        };
      },
      // Find the part when given the whole and fraction
      () => {
        const denominators = [2, 3, 4, 5, 6, 8, 10];
        const denominator = denominators[Math.floor(Math.random() * denominators.length)];
        const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
        const whole = Math.floor(Math.random() * 8) + 2; // Random number between 2-10
        const part = (whole * numerator) / denominator;

        return {
          question: `What is ${numerator}/${denominator} of ${whole}?`,
          answer: part.toString(),
          workSpace: "box"
        };
      }
    ];

    return Array.from({ length: 12 }, () => {
      const typeIndex = Math.floor(Math.random() * questionTypes.length);
      return questionTypes[typeIndex]();
    });
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
        word: 'ubiquitous',
        correct: 'omnipresent',
        wrong: ['rare', 'limited']
      },
      { 
        word: 'tenacious',
        correct: 'persistent',
        wrong: ['yielding', 'weak']
      },
      { 
        word: 'ephemeral',
        correct: 'fleeting',
        wrong: ['lasting', 'permanent']
      },
      { 
        word: 'pragmatic',
        correct: 'practical',
        wrong: ['idealistic', 'fanciful']
      },
      { 
        word: 'benevolent',
        correct: 'kind',
        wrong: ['cruel', 'evil']
      },
      { 
        word: 'meticulous',
        correct: 'precise',
        wrong: ['careless', 'sloppy']
      },
      { 
        word: 'verbose',
        correct: 'wordy',
        wrong: ['concise', 'brief']
      },
      { 
        word: 'audacious',
        correct: 'bold',
        wrong: ['timid', 'fearful']
      },
      { 
        word: 'diligent',
        correct: 'hardworking',
        wrong: ['lazy', 'negligent']
      },
      { 
        word: 'eloquent',
        correct: 'articulate',
        wrong: ['inarticulate', 'awkward']
      }
    ];

    return Array.from({ length: 20 }, () => {
      const word = vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
      
      return {
        question: `${word.word}\n\na) ${word.correct}   b) ${word.wrong[0]}   c) ${word.wrong[1]}`,
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
          newQuestions = generateSimpleQuestions();
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
        // Add other worksheet types here
      }

      setQuestions(newQuestions);
      setIsGenerating(false);
    }, 600);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Set background to white (default in jsPDF)
    pdf.setFillColor(255, 255, 255);

    // Add title
    pdf.setFontSize(20);
    const title = selectedType === 'simple' ? 'Word Problems' : 
      `${selectedType?.charAt(0).toUpperCase() + selectedType?.slice(1)} Practice`;
    pdf.text(title, pageWidth / 2, yPosition, { align: 'center' });
    
    // Add date and name fields
    yPosition += 15;
    pdf.setFontSize(12);
    pdf.text(`Name: ________________________________    Date: ________________`, margin, yPosition);
    
    // Start questions
    yPosition += 25;
    pdf.setFontSize(14);

    if (selectedType === 'simple' || selectedType === 'percentages') {
      // Word problems and percentages - two columns
      const colWidth = (pageWidth - (margin * 3)) / 2;
      questions.forEach((q, i) => {
        const isSecondColumn = i % 2 === 1;
        const xPosition = isSecondColumn ? margin + colWidth + margin : margin;
        
        if (i % 2 === 0 && i > 0) {
          yPosition += 35;
        }
        
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.text(`${i + 1}. ${q.question}`, xPosition, yPosition);
        pdf.rect(xPosition, yPosition + 5, 40, 15);
      });
    } else if (selectedType === 'fractions') {
      // Fraction problems - two columns
      let currentColumn = 0;
      const colWidth = (pageWidth - (margin * 3)) / 2;

      questions.forEach((q) => {
        const xPosition = margin + (currentColumn * (colWidth + margin));
        const [left, right] = q.question.split(' = ');
        const [leftNum, leftDen] = left.split('/');
        const [rightNum, rightDen] = right.split('/');
        
        if (q.boxPosition === 'numerator') {
          pdf.rect(xPosition + 20, yPosition - 5, 15, 10);
          pdf.text('/', xPosition + 40, yPosition);
          pdf.text(leftDen, xPosition + 45, yPosition);
          pdf.text('=', xPosition + 60, yPosition);
          pdf.text(rightNum, xPosition + 75, yPosition);
          pdf.text('/', xPosition + 85, yPosition);
          pdf.text(rightDen, xPosition + 90, yPosition);
        }
        
        currentColumn++;
        if (currentColumn === 2) {
          currentColumn = 0;
          yPosition += 30;
        }
      });
    } else {
      // Language Arts worksheets (vocabulary, grammar, parts of speech)
      const colWidth = (pageWidth - (margin * 3)) / 2;
      questions.forEach((q, i) => {
        const isSecondColumn = i % 2 === 1;
        const xPosition = isSecondColumn ? margin + colWidth + margin : margin;
        
        if (i % 2 === 0 && i > 0) {
          yPosition += 40;
        }
        
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        // Split long questions into multiple lines
        const maxWidth = colWidth - 10;
        const lines = pdf.splitTextToSize(`${i + 1}. ${q.question}`, maxWidth);
        
        // Add each line of the question
        lines.forEach((line: string, lineIndex: number) => {
          // Check if line contains bold text (marked with **)
          if (line.includes('**')) {
            const parts = line.split('**');
            let xOffset = 0;
            parts.forEach((part, idx) => {
              if (idx % 2 === 1) {
                // Bold text
                pdf.setFont('helvetica', 'bold');
              } else {
                pdf.setFont('helvetica', 'normal');
              }
              pdf.text(part, xPosition + xOffset, yPosition + (lineIndex * 7));
              xOffset += pdf.getTextWidth(part);
            });
          } else {
            pdf.setFont('helvetica', 'normal');
            pdf.text(line, xPosition, yPosition + (lineIndex * 7));
          }
        });

        // Don't add answer boxes for vocabulary questions
        if (selectedType !== 'vocabulary') {
          const questionHeight = lines.length * 7;
          pdf.rect(xPosition, yPosition + questionHeight + 2, 40, 15);
        }
      });
    }

    pdf.save(`${selectedType}_practice.pdf`);
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

      {/* Preview Section */}
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
            </div>

            {/* Questions */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {questions.map((q, i) => (
                <div key={i} className="text-xs text-gray-900">
                  {selectedType === 'fractions' ? (
                    // Special formatting for fraction problems
                    <div className="flex items-center gap-2">
                      <span>{i + 1}.</span>
                      {q.question.split(' = ').map((part, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          {idx > 0 && <span>=</span>}
                          {part.split('/').map((num, numIdx) => (
                            <span key={numIdx} className="relative">
                              {numIdx === 0 ? (
                                <div className="border-b border-gray-400 pb-1">{num}</div>
                              ) : (
                                num
                              )}
                            </span>
                          ))}
                        </span>
                      ))}
                      <div className="w-12 h-6 border border-gray-300"></div>
                    </div>
                  ) : (
                    // Standard formatting for other problems
                    <div>
                      <div>{i + 1}. {q.question}</div>
                      {q.workSpace && (
                        <div className="mt-1 h-6 border border-gray-200"></div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
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