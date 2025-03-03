import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Trash2, Edit2, ChevronLeft, ChevronRight, Library, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

interface FlashcardSet {
  id: string;
  name: string;
  cards: Flashcard[];
  category: string;
  dateCreated: string;
}

const STORAGE_KEY = 'flashcard_sets';

const saveToLocalStorage = (sets: FlashcardSet[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
};

const loadFromLocalStorage = (): FlashcardSet[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const FlashcardCreator = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>(loadFromLocalStorage);
  const [currentSet, setCurrentSet] = useState<FlashcardSet | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [newSetCategory, setNewSetCategory] = useState('');
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSets, setShowSets] = useState(false);

  const createNewSet = () => {
    if (!newSetName.trim()) return;

    const newSet: FlashcardSet = {
      id: Date.now().toString(),
      name: newSetName,
      category: newSetCategory,
      cards: [],
      dateCreated: new Date().toISOString()
    };

    setFlashcardSets(prev => {
      const updated = [...prev, newSet];
      saveToLocalStorage(updated);
      return updated;
    });
    setCurrentSet(newSet);
    setIsCreating(false);
    setNewSetName('');
    setNewSetCategory('');
  };

  const addCardToSet = (front: string, back: string) => {
    if (!currentSet || !front.trim() || !back.trim()) return;

    const newCard: Flashcard = {
      id: Date.now().toString(),
      front,
      back,
      category: currentSet.category
    };

    const updatedSet = {
      ...currentSet,
      cards: [...currentSet.cards, newCard]
    };

    setCurrentSet(updatedSet);
    setFlashcardSets(sets => {
      const updated = sets.map(set => 
        set.id === currentSet.id ? updatedSet : set
      );
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const updateSet = (setId: string, updates: Partial<FlashcardSet>) => {
    setFlashcardSets(sets => {
      const updated = sets.map(set => 
        set.id === setId ? { ...set, ...updates } : set
      );
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const deleteSet = (setId: string) => {
    setFlashcardSets(sets => {
      const updated = sets.filter(set => set.id !== setId);
      saveToLocalStorage(updated);
      return updated;
    });
    if (currentSet?.id === setId) {
      setCurrentSet(null);
    }
  };

  const deleteCard = (cardId: string) => {
    if (!currentSet) return;

    const updatedSet = {
      ...currentSet,
      cards: currentSet.cards.filter(card => card.id !== cardId)
    };

    setCurrentSet(updatedSet);
    setFlashcardSets(sets => {
      const updated = sets.map(set => 
        set.id === currentSet.id ? updatedSet : set
      );
      saveToLocalStorage(updated);
      return updated;
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-400 mb-2">Flashcard Creator</h2>
      <p className="text-gray-400 mb-8">Create and study custom flashcard sets</p>

      {/* Show either create button or view sets button */}
      {!isCreating && !currentSet && !showSets && (
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600/80 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Set
          </button>
          {flashcardSets.length > 0 && (
            <button
              onClick={() => setShowSets(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600/80 hover:bg-emerald-500 rounded-lg text-white font-medium transition-colors"
            >
              <Library className="w-5 h-5" />
              View My Sets
            </button>
          )}
        </div>
      )}

      {/* Sets List View - update styling */}
      {showSets && (
        <div className="space-y-4">
          <button
            onClick={() => setShowSets(false)}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {flashcardSets.map(set => (
              <div key={set.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex justify-between items-center border border-gray-700/50"
              >
                <div>
                  <h3 className="text-xl font-bold text-emerald-500 mb-2">{set.name}</h3>
                  <p className="text-gray-400">{set.cards.length} cards</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setCurrentSet(set);
                      setShowSets(false);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSet(set);
                      setIsPreviewMode(true);
                      setShowSets(false);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
                  >
                    Study
                  </button>
                  <button
                    onClick={() => deleteSet(set.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Set Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Set Name"
            value={newSetName}
            onChange={(e) => setNewSetName(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Category (optional)"
            value={newSetCategory}
            onChange={(e) => setNewSetCategory(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={createNewSet}
              disabled={!newSetName.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:text-gray-400"
            >
              Create Set
            </button>
          </div>
        </motion.div>
      )}

      {/* Current Set View */}
      {currentSet && !isPreviewMode && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-brandon font-black text-white">{currentSet.name}</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setIsPreviewMode(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
              >
                Preview
              </button>
              <button
                onClick={() => setCurrentSet(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Add new card form */}
          <AddCardForm onAdd={addCardToSet} />

          {/* Cards List */}
          <div className="grid gap-4">
            {currentSet.cards.map(card => (
              <FlashcardItem
                key={card.id}
                card={card}
                onDelete={() => {
                  deleteCard(card.id);
                }}
                onEdit={(updatedCard) => {
                  updateSet(currentSet.id, {
                    cards: currentSet.cards.map(card =>
                      card.id === updatedCard.id ? updatedCard : card
                    )
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Preview Mode */}
      {currentSet && isPreviewMode && (
        <FlashcardPreview
          set={currentSet}
          onClose={() => setIsPreviewMode(false)}
        />
      )}
    </div>
  );
};

// Update AddCardForm styling
const AddCardForm = ({ onAdd }: { onAdd: (front: string, back: string) => void }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = () => {
    if (!front.trim() || !back.trim()) return;
    onAdd(front, back);
    setFront('');
    setBack('');
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-gray-700/50">
      <input
        type="text"
        placeholder="Front of card"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Back of card"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
      />
      <button
        onClick={handleSubmit}
        disabled={!front.trim() || !back.trim()}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:text-gray-400"
      >
        Add Card
      </button>
    </div>
  );
};

// Update FlashcardItem styling
const FlashcardItem = ({ card, onDelete, onEdit }: { 
  card: Flashcard;
  onDelete: (id: string) => void;
  onEdit: (card: Flashcard) => void;
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-gray-700/50">
      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="text-white">{card.front}</div>
        <div className="text-gray-400">{card.back}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(card)}
          className="text-gray-400 hover:text-white"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="text-gray-400 hover:text-red-400"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface FlashcardPreviewProps {
  set: FlashcardSet;
  onClose: () => void;
}

const FlashcardPreview = ({ set, onClose }: FlashcardPreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') previousCard();
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === ' ') setIsFlipped(!isFlipped);
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
      if (e.key === 'f') setIsFullscreen(!isFullscreen);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, currentIndex, isFullscreen]);

  useEffect(() => {
    setProgress((currentIndex / (set.cards.length - 1)) * 100);
  }, [currentIndex, set.cards.length]);

  const nextCard = () => {
    if (currentIndex < set.cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 300);
    }
  };

  const resetStudy = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={`${isFullscreen ? 'fixed inset-0 bg-gray-900/95 z-50' : ''} transition-all duration-300`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={`space-y-6 ${isFullscreen ? 'p-8 h-screen flex flex-col' : ''}`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-brandon font-black text-white">{set.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                Card {currentIndex + 1} of {set.cards.length}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50"
                title={isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={resetStudy}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50"
                title="Reset study session"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {set.cards.length > 0 ? (
            <div className={`flex justify-center items-center gap-4 ${isFullscreen ? 'flex-1' : ''}`}>
              <motion.button
                onClick={previousCard}
                disabled={currentIndex === 0}
                className="p-4 text-gray-400 hover:text-white disabled:opacity-50 rounded-full hover:bg-gray-800/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-8 h-8" />
              </motion.button>

              <motion.div
                className={`${isFullscreen ? 'w-[600px] h-[400px]' : 'w-96 h-64'} cursor-pointer perspective-1000`}
                onClick={() => setIsFlipped(!isFlipped)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  className="relative w-full h-full preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute w-full h-full rounded-xl p-6 flex items-center justify-center text-center bg-cover bg-center 
                      border-[8px] border-emerald-500/80 backdrop-blur-sm
                      shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]
                      transition-all duration-300`}
                    style={{ 
                      backgroundImage: 'url(/paper.jpeg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <p className="text-3xl text-gray-800 font-brandon font-black">
                      {set.cards[currentIndex].front}
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute w-full h-full rounded-xl p-6 flex items-center justify-center text-center bg-cover bg-center 
                      border-[8px] border-emerald-500/80 backdrop-blur-sm
                      shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]
                      transition-all duration-300`}
                    style={{ 
                      backgroundImage: 'url(/paper.jpeg)',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      WebkitTransform: 'rotateY(180deg)',
                    }}
                  >
                    <p className="text-3xl text-gray-800 font-brandon font-black">
                      {set.cards[currentIndex].back}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.button
                onClick={nextCard}
                disabled={currentIndex === set.cards.length - 1}
                className="p-4 text-gray-400 hover:text-white disabled:opacity-50 rounded-full hover:bg-gray-800/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-8 h-8" />
              </motion.button>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No cards in this set yet. Add some cards to preview.
            </div>
          )}

          <div className="text-center text-gray-400">
            <kbd className="px-2 py-1 bg-gray-800 rounded-md text-sm mr-1">←</kbd>
            <kbd className="px-2 py-1 bg-gray-800 rounded-md text-sm mr-1">→</kbd>
            to navigate • 
            <kbd className="px-2 py-1 bg-gray-800 rounded-md text-sm mx-1">Space</kbd>
            to flip • 
            <kbd className="px-2 py-1 bg-gray-800 rounded-md text-sm mx-1">F</kbd>
            for fullscreen
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlashcardCreator; 