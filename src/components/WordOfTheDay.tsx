import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X, Loader2 } from 'lucide-react';
import { spellingWords } from '../data/spellingWords';

interface WordOfTheDayProps {
  isOpen: boolean;
  onClose: () => void;
}

const VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX'; // Josh voice - deep male voice

const WordOfTheDay = ({ isOpen, onClose }: WordOfTheDayProps) => {
  console.log('WordOfTheDay component rendering...');
  console.log('Current props:', { isOpen, onClose });

  const [userInput, setUserInput] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([...spellingWords]);

  useEffect(() => {
    if (isOpen) {
      const shuffled = [...spellingWords].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setCurrentWordIndex(0);
      setUserInput('');
      setHasSubmitted(false);
      setIsCorrect(false);
    }
  }, [isOpen]);

  const playFeedback = async (isCorrect: boolean) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY,
          },
          body: JSON.stringify({
            text: isCorrect ? "Boom Sauce." : " Ouch. Not quite.",
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              speaking_rate: 0.65
            }
          }),
        }
      );

      if (!response.ok) throw new Error('Speech generation failed');

      // Play the correct/incorrect sound effect first
      const soundEffect = new Audio(isCorrect ? '/sounds/correctding.wav' : '/sounds/wrong.wav');
      soundEffect.volume = 0.2;
      await soundEffect.play();

      // Then play the voice feedback
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Failed to generate speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    const correct = userInput.toLowerCase().trim() === shuffledWords[currentWordIndex].word.toLowerCase();
    setIsCorrect(correct);
    setHasSubmitted(true);
    playFeedback(correct);
  };

  const handleNext = () => {
    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
      setHasSubmitted(false);
      setIsCorrect(false);
    } else {
      // End of all words
      onClose();
      setCurrentWordIndex(0);
      setUserInput('');
      setHasSubmitted(false);
      setIsCorrect(false);
    }
  };

  const speakWord = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY,
          },
          body: JSON.stringify({
            text: shuffledWords[currentWordIndex].word,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              speaking_rate: 0.75
            }
          }),
        }
      );

      if (!response.ok) throw new Error('Speech generation failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Failed to generate speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const speakSentence = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY,
          },
          body: JSON.stringify({
            text: shuffledWords[currentWordIndex].sentence.replace('______', shuffledWords[currentWordIndex].word),
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              speaking_rate: 0.85
            }
          }),
        }
      );

      if (!response.ok) throw new Error('Speech generation failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Failed to generate speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentWord = shuffledWords[currentWordIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-800 rounded-xl max-w-xl w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-emerald-400">
                  Spelling Practice
                </h2>
                <div className="text-sm text-gray-400">
                  Word {currentWordIndex + 1} of {shuffledWords.length}
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={speakWord}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 p-6 rounded-xl backdrop-blur-sm border border-emerald-500/20 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                    <span className="text-lg font-semibold">Play Word</span>
                  </button>

                  <button
                    onClick={speakSentence}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                    <span className="text-lg font-semibold">Play Sentence</span>
                  </button>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-6 backdrop-blur-sm border border-white/5">
                  <p className="text-2xl font-bold text-white text-center">
                    {shuffledWords[currentWordIndex].sentence}
                  </p>
                </div>

                {!hasSubmitted ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type the word you hear..."
                      className="w-full p-4 bg-gray-700/50 rounded-lg text-white text-2xl font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSubmit}
                      className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-xl font-bold transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className={`p-4 rounded-lg ${
                      isCorrect ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
                    }`}>
                      <p className="text-2xl font-medium mb-2">
                        {isCorrect ? 'Correct! 🎉' : 'Not quite right 🤔'}
                      </p>
                      <p>The word was: <span className="font-bold">{shuffledWords[currentWordIndex].word}</span></p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-blue-400">Definition:</p>
                      <p className="text-white">{shuffledWords[currentWordIndex].definition}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-blue-400">Example:</p>
                      <p className="text-white italic">{shuffledWords[currentWordIndex].example}</p>
                    </div>
                  </motion.div>
                )}

                {hasSubmitted && (
                  <motion.button
                    onClick={handleNext}
                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-xl font-bold transition-colors"
                  >
                    {currentWordIndex === shuffledWords.length - 1 ? 'Finish Practice' : 'Next Word'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WordOfTheDay; 