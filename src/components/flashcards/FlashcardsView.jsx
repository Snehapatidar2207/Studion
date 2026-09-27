import React, { useState, useEffect } from 'react';
import {
  Layers,
  RotateCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Brain,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  HelpCircle
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const FlashcardsView = () => {
  const {
    decks,
    activeDeckId,
    setActiveDeckId,
    addDeck,
    addCardToDeck,
    rateCard,
    triggerConfetti,
  } = useStudion();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNewDeckModalOpen, setIsNewDeckModalOpen] = useState(false);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);

  // New deck form
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckCategory, setNewDeckCategory] = useState('Computer Science');

  // New card form
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  const currentDeck = decks.find((d) => d.id === activeDeckId) || decks[0];
  const cards = currentDeck?.cards || [];
  const currentCard = cards[currentCardIndex];

  // Reset flip state when card or deck changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex, activeDeckId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length, currentCardIndex]);

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Loop or finish
      setCurrentCardIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    } else {
      setCurrentCardIndex(cards.length - 1);
    }
  };

  const handleRating = (rating) => {
    if (currentCard) {
      rateCard(currentDeck.id, currentCard.id, rating);
      if (rating === 'Easy') {
        triggerConfetti();
      }
      handleNext();
    }
  };

  const handleShuffle = () => {
    setCurrentCardIndex(Math.floor(Math.random() * cards.length));
    setIsFlipped(false);
  };

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (!newDeckName.trim()) return;
    addDeck(newDeckName.trim(), newDeckCategory);
    setNewDeckName('');
    setIsNewDeckModalOpen(false);
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!newCardFront.trim() || !newCardBack.trim()) return;
    if (!currentDeck) {
      addToast('Please create a deck first before adding cards!', 'warning');
      setIsNewDeckModalOpen(true);
      return;
    }
    addCardToDeck(currentDeck.id, newCardFront.trim(), newCardBack.trim());
    setNewCardFront('');
    setNewCardBack('');
    setIsNewCardModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Header & CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-cyan-400" />
            <span>Interactive 3D Flashcards</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Master complex concepts through active recall, 3D flip animation, and spaced repetition.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setIsNewDeckModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1b1d2e] hover:bg-[#23253b] text-gray-200 text-xs font-semibold border border-[#2e314a] hover:border-purple-500/40 transition-all"
          >
            <Plus className="w-4 h-4 text-purple-400" />
            <span>New Deck</span>
          </button>
          <button
            onClick={() => {
              if (decks.length === 0) {
                addToast('Create your first deck before adding cards!', 'info');
                setIsNewDeckModalOpen(true);
              } else {
                setIsNewCardModalOpen(true);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
          </button>
        </div>
      </div>

      {/* Deck Selector Tabs */}
      {decks.length > 0 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {decks.map((deck) => {
            const isSelected = deck.id === currentDeck?.id;
            return (
              <button
                key={deck.id}
                onClick={() => {
                  setActiveDeckId(deck.id);
                  setCurrentCardIndex(0);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                  isSelected
                    ? 'bg-purple-600/30 text-white border-purple-500/60 shadow-glow-sm'
                    : 'bg-[#151624] text-gray-400 hover:text-gray-200 border-[#25273d] hover:border-purple-500/30'
                }`}
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>{deck.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#202236] text-purple-300">
                  {deck.cards.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Flashcard Study Arena */}
      {decks.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-[#141524] border border-[#26283e] space-y-4">
          <Layers className="w-14 h-14 text-cyan-400/40 mx-auto" />
          <h3 className="text-lg font-bold text-white">No flashcard decks created yet</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Build customized study decks for each of your subjects (e.g., Computer Science, Biology, Calculus) and practice with 3D active recall.
          </p>
          <button
            onClick={() => setIsNewDeckModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all"
          >
            + Create First Deck
          </button>
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#141524] border border-[#26283e] space-y-4">
          <BookOpen className="w-12 h-12 text-purple-400/40 mx-auto" />
          <h3 className="text-lg font-bold text-white">This deck is currently empty</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Add your first flashcard to start training your memory and mastering your exam syllabus.
          </p>
          <button
            onClick={() => setIsNewCardModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-sm"
          >
            Create First Card
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Deck Progress Bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span>Card</span>
              <strong className="text-purple-400">{currentCardIndex + 1}</strong>
              <span>of</span>
              <strong className="text-white">{cards.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400">
                Difficulty: <strong className="text-cyan-300">{currentCard?.difficulty || 'New'}</strong>
              </span>
              <span className="text-[11px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Streak: {currentCard?.streak || 0} 🔥
              </span>
            </div>
          </div>

          <div className="w-full bg-[#1e2033] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            />
          </div>

          {/* 3D Flashcard Container */}
          <div
            className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer select-none"
            onClick={() => setIsFlipped(!isFlipped)}
            id="flashcard-3d-card"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-b from-[#18192a] to-[#12131f] border-2 border-purple-500/40 shadow-2xl shadow-purple-950/40 group hover:border-purple-400 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-widest font-extrabold text-[11px] text-purple-400 bg-purple-500/15 px-3 py-1 rounded-full border border-purple-500/30">
                    Question
                  </span>
                  <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Click or Space to Flip
                  </span>
                </div>

                <div className="my-auto text-center px-4">
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed tracking-wide">
                    {currentCard?.front}
                  </p>
                </div>

                <div className="flex items-center justify-center text-xs text-purple-300 font-semibold gap-2 opacity-80 group-hover:opacity-100">
                  <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Reveal Solution</span>
                </div>
              </div>

              {/* BACK OF CARD (Rotated 180deg) */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-b from-[#1c1b30] to-[#121122] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/40 group">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-widest font-extrabold text-[11px] text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/30">
                    Answer & Explanation
                  </span>
                  <span className="text-gray-400 text-[11px]">Click to flip back</span>
                </div>

                <div className="my-auto px-4 overflow-y-auto max-h-48 text-left">
                  <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                    {currentCard?.back}
                  </p>
                </div>

                <div className="text-center text-[11px] text-gray-400">
                  Rate your recall difficulty below to schedule next review
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Controls Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171828] hover:bg-[#202236] text-gray-300 text-xs font-semibold border border-[#2b2d45] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="p-2 rounded-xl bg-[#171828] hover:bg-[#202236] text-gray-400 hover:text-white border border-[#2b2d45] transition-all"
                title="Shuffle Cards"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-2 rounded-xl bg-[#202236] hover:bg-purple-600/30 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-all"
              >
                Flip (Space)
              </button>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171828] hover:bg-[#202236] text-gray-300 text-xs font-semibold border border-[#2b2d45] transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Spaced Repetition Mastery Rating Buttons */}
          <div className="p-4 rounded-2xl bg-[#131422] border border-[#23253b] space-y-2.5">
            <span className="block text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              Rate Recall Accuracy
            </span>
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={() => handleRating('Again')}
                className="py-2.5 px-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all text-center"
              >
                <div>Again</div>
                <div className="text-[10px] text-rose-400/80 font-normal">1 min</div>
              </button>

              <button
                onClick={() => handleRating('Hard')}
                className="py-2.5 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all text-center"
              >
                <div>Hard</div>
                <div className="text-[10px] text-amber-400/80 font-normal">10 min</div>
              </button>

              <button
                onClick={() => handleRating('Good')}
                className="py-2.5 px-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold transition-all text-center"
              >
                <div>Good</div>
                <div className="text-[10px] text-purple-400/80 font-normal">1 day</div>
              </button>

              <button
                onClick={() => handleRating('Easy')}
                className="py-2.5 px-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all text-center shadow-sm"
              >
                <div>Easy</div>
                <div className="text-[10px] text-emerald-400/80 font-normal">4 days</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Deck Modal */}
      {isNewDeckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Create New Study Deck</h2>
            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Deck Title *
                </label>
                <input
                  type="text"
                  required
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  placeholder="e.g. Cognitive Neuroscience & Brain Waves"
                  className="w-full px-3.5 py-2.5 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newDeckCategory}
                  onChange={(e) => setNewDeckCategory(e.target.value)}
                  placeholder="e.g. Psychology / STEM"
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23253b]">
                <button
                  type="button"
                  onClick={() => setIsNewDeckModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-sm"
                >
                  Create Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Card Modal */}
      {isNewCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">
              Add Card to &quot;{currentDeck?.name}&quot;
            </h2>
            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Front (Question / Prompt) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newCardFront}
                  onChange={(e) => setNewCardFront(e.target.value)}
                  placeholder="e.g. What is the difference between TCP and UDP?"
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Back (Answer / Explanation) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newCardBack}
                  onChange={(e) => setNewCardBack(e.target.value)}
                  placeholder="e.g. TCP is connection-oriented, reliable with flow control. UDP is connectionless, low-latency, and best for real-time video/games."
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23253b]">
                <button
                  type="button"
                  onClick={() => setIsNewCardModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-sm"
                >
                  Save Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
