import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const citizenshipQuestions: Question[] = [
  {
    id: 1,
    text: "According to the Preamble, what are some goals of the Constitution?",
    options: [
      "to unite the states more fully",
      "to keep the peace in the United States",
      "to make all Americans worse off",
      "to protect Americans' freedoms"
    ],
    correctAnswer: "to unite the states more fully, to keep the peace in the United States, to protect Americans' freedoms",
    explanation: "The Preamble states that the Constitution aims to form a more perfect union, establish justice, ensure domestic tranquility, provide for common defense, promote general welfare, and secure liberty."
  },
  {
    id: 2,
    text: "What are the three branches of the U.S. government?",
    options: [
      "Executive, Legislative, Judicial",
      "President, Congress, Supreme Court",
      "Federal, State, Local",
      "Military, Civilian, Diplomatic"
    ],
    correctAnswer: "Executive, Legislative, Judicial",
    explanation: "The three branches are: Executive (President), Legislative (Congress), and Judicial (Supreme Court and federal courts). This system creates checks and balances."
  },
  {
    id: 3,
    text: "Which branch of government makes federal laws?",
    options: [
      "Executive Branch",
      "Legislative Branch",
      "Judicial Branch",
      "State Government"
    ],
    correctAnswer: "Legislative Branch",
    explanation: "The Legislative Branch (Congress) makes federal laws. Congress is divided into two chambers: the Senate and the House of Representatives."
  },
  {
    id: 4,
    text: "What is the system of checks and balances?",
    options: [
      "Each branch can limit the powers of the other branches",
      "The President checks the national budget",
      "The Supreme Court balances federal and state laws",
      "Congress maintains balanced spending"
    ],
    correctAnswer: "Each branch can limit the powers of the other branches",
    explanation: "Checks and balances ensure no branch becomes too powerful. For example, Congress makes laws, the President can veto them, and the Supreme Court can declare them unconstitutional."
  },
  {
    id: 5,
    text: "How many amendments does the Constitution have?",
    options: [
      "10",
      "23",
      "27",
      "50"
    ],
    correctAnswer: "27",
    explanation: "The Constitution has 27 amendments. The first 10 are called the Bill of Rights, which protect individual liberties."
  },
  {
    id: 6,
    text: "What are the first three words of the Constitution?",
    options: [
      "We the Government",
      "We the People",
      "In God We",
      "United States of"
    ],
    correctAnswer: "We the People",
    explanation: "The Constitution begins with 'We the People,' emphasizing that the power of government comes from the citizens."
  },
  {
    id: 7,
    text: "What is one right or freedom from the First Amendment?",
    options: [
      "Right to bear arms",
      "Freedom of speech",
      "Right to vote",
      "Right to education"
    ],
    correctAnswer: "Freedom of speech",
    explanation: "The First Amendment protects several rights including freedom of speech, religion, press, assembly, and petition."
  },
  {
    id: 8,
    text: "Who is the Commander in Chief of the U.S. military?",
    options: [
      "The President",
      "Secretary of Defense",
      "Head of Joint Chiefs",
      "Congress"
    ],
    correctAnswer: "The President",
    explanation: "The Constitution designates the President as Commander in Chief of the U.S. military forces."
  },
  {
    id: 9,
    text: "How many U.S. senators are there?",
    options: [
      "50",
      "100",
      "435",
      "538"
    ],
    correctAnswer: "100",
    explanation: "There are 100 U.S. Senators - two from each state, regardless of the state's population."
  },
  {
    id: 10,
    text: "What is the supreme law of the land?",
    options: [
      "The Constitution",
      "The Bill of Rights",
      "Federal Laws",
      "Supreme Court Decisions"
    ],
    correctAnswer: "The Constitution",
    explanation: "The Constitution is the supreme law of the land. All other laws must follow and agree with the Constitution."
  }
];

const CitizenshipQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = citizenshipQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < citizenshipQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">American Citizenship Quiz</h2>
      
      {!quizCompleted ? (
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">
              Question {currentQuestionIndex + 1} of {citizenshipQuestions.length}
            </p>
            <h3 className="text-xl text-white font-bold mb-4">{currentQuestion.text}</h3>
          </div>

          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  selectedAnswer
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-500/20 text-green-200'
                      : option === selectedAnswer
                      ? 'bg-red-500/20 text-red-200'
                      : 'bg-gray-700/50 text-gray-400'
                    : 'bg-gray-700/50 hover:bg-gray-700/80 text-white'
                }`}
              >
                <div className="flex items-center">
                  {selectedAnswer && (
                    <span className="mr-2">
                      {option === currentQuestion.correctAnswer ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : option === selectedAnswer ? (
                        <X className="w-5 h-5 text-red-400" />
                      ) : null}
                    </span>
                  )}
                  {option}
                </div>
              </motion.button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-blue-500/10 rounded-lg"
            >
              <p className="text-blue-400">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {selectedAnswer && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNextQuestion}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              {currentQuestionIndex < citizenshipQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </motion.button>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 rounded-xl p-6 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h3>
          <p className="text-xl text-gray-300 mb-6">
            You scored {score} out of {citizenshipQuestions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CitizenshipQuiz; 