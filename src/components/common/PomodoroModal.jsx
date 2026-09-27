import React from 'react';
import { X, Play, Pause, RotateCcw, Coffee, Zap, Moon } from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const PomodoroModal = () => {
  const {
    pomodoroOpen,
    setPomodoroOpen,
    pomoMode,
    switchPomoMode,
    pomoSecondsLeft,
    setPomoSecondsLeft,
    pomoRunning,
    setPomoRunning,
    pomoSessions
  } = useStudion();

  if (!pomodoroOpen) return null;

  const totalSeconds =
    pomoMode === 'work' ? 25 * 60 : pomoMode === 'shortBreak' ? 5 * 60 : 15 * 60;
  const progressPercent = ((totalSeconds - pomoSecondsLeft) / totalSeconds) * 100;

  const minutes = Math.floor(pomoSecondsLeft / 60);
  const seconds = pomoSecondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const resetTimer = () => {
    setPomoRunning(false);
    setPomoSecondsLeft(totalSeconds);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 bg-[#131422] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-950/50">
        {/* Close Button */}
        <button
          onClick={() => setPomodoroOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2134] transition-colors"
          id="close-pomo-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-wide">Study Focus Timer</h2>
          <p className="text-xs text-gray-400 mt-1">
            Pomodoro Technique: 25m Focus • 5m Short Break • 15m Deep Rest
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1 bg-[#1a1b2d] rounded-xl border border-[#27293e] mb-6">
          <button
            onClick={() => switchPomoMode('work')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              pomoMode === 'work'
                ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white shadow-glow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Focus (25m)
          </button>
          <button
            onClick={() => switchPomoMode('shortBreak')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              pomoMode === 'shortBreak'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            Short Break (5m)
          </button>
          <button
            onClick={() => switchPomoMode('longBreak')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              pomoMode === 'longBreak'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            Rest (15m)
          </button>
        </div>

        {/* Circular Display */}
        <div className="relative flex items-center justify-center my-6">
          {/* SVG Progress Ring */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-[#222438]"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className={`transition-all duration-500 ease-linear ${
                  pomoMode === 'work'
                    ? 'stroke-purple-500'
                    : pomoMode === 'shortBreak'
                    ? 'stroke-cyan-400'
                    : 'stroke-indigo-400'
                }`}
                strokeWidth="5"
                strokeDasharray="276.4"
                strokeDashoffset={276.4 - (276.4 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Centered Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-5xl font-extrabold tracking-wider text-white text-glow-purple">
                {formattedTime}
              </span>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mt-1">
                {pomoRunning ? 'In Session' : 'Paused'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={resetTimer}
            className="p-3 rounded-xl bg-[#1b1d2e] border border-[#2c2e47] text-gray-400 hover:text-white hover:border-purple-500/40 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setPomoRunning(!pomoRunning)}
            id="pomo-play-pause-btn"
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-glow-md active:scale-95 ${
              pomoRunning
                ? 'bg-amber-600 hover:bg-amber-500'
                : 'bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500'
            }`}
          >
            {pomoRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Session</span>
              </>
            )}
          </button>
        </div>

        {/* Session Milestone Info */}
        <div className="mt-6 pt-4 border-t border-[#202238] flex items-center justify-between text-xs text-gray-400">
          <span>Sessions Completed Today</span>
          <span className="font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
            {pomoSessions} 🍅
          </span>
        </div>
      </div>
    </div>
  );
};
