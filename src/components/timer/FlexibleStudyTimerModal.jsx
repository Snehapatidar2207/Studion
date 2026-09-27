import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Sparkles,
  Plus,
  Minus,
  CheckCircle2,
  BellRing,
  Volume2,
  Flame,
  Award,
  ChevronDown
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const FlexibleStudyTimerModal = () => {
  const {
    timerModalOpen,
    setTimerModalOpen,
    timerHours,
    timerMinutes,
    timerTotalSeconds,
    timerSecondsLeft,
    timerRunning,
    timerSessionLabel,
    timerAlertActive,
    timerSessionsCompleted,
    setFlexibleTimerDuration,
    adjustTimerMinutes,
    startFlexibleTimer,
    pauseFlexibleTimer,
    resetFlexibleTimer,
    dismissTimerAlert,
    playTimerChime,
    addToast
  } = useStudion();

  // Local form inputs for custom hours and minutes
  const [inputHours, setInputHours] = useState(timerHours || 0);
  const [inputMinutes, setInputMinutes] = useState(timerMinutes || 45);
  const [inputLabel, setInputLabel] = useState(timerSessionLabel || 'Deep Focus Sprint');
  const [showConfig, setShowConfig] = useState(false);

  // Sync inputs if timer state changes externally
  useEffect(() => {
    if (!timerRunning) {
      setInputHours(timerHours);
      setInputMinutes(timerMinutes);
      setInputLabel(timerSessionLabel);
    }
  }, [timerHours, timerMinutes, timerSessionLabel, timerRunning]);

  if (!timerModalOpen) return null;

  // Calculate circular progress percentage
  const progressPercent = timerTotalSeconds > 0
    ? Math.min(100, Math.max(0, ((timerTotalSeconds - timerSecondsLeft) / timerTotalSeconds) * 100))
    : 0;

  // Formatted countdown time
  const displayHours = Math.floor(timerSecondsLeft / 3600);
  const displayMinutes = Math.floor((timerSecondsLeft % 3600) / 60);
  const displaySeconds = timerSecondsLeft % 60;

  const formattedTime = displayHours > 0
    ? `${displayHours.toString().padStart(2, '0')}:${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`
    : `${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;

  // Quick Preset options
  const presets = [
    { label: 'Sprint', hours: 0, mins: 15, name: '15m Rapid Sprint' },
    { label: 'Pomodoro', hours: 0, mins: 25, name: '25m Standard Focus' },
    { label: 'Deep Study', hours: 0, mins: 45, name: '45m Deep Study Block' },
    { label: 'Power Hour', hours: 1, mins: 0, name: '60m Lecture / Problem Set' },
    { label: 'Flow State', hours: 1, mins: 30, name: '90m Mastery Session' },
    { label: 'Exam Sim', hours: 2, mins: 0, name: '120m Mock Exam' },
  ];

  const handleApplyCustomTime = (e) => {
    if (e) e.preventDefault();
    const h = Math.max(0, Math.min(12, parseInt(inputHours, 10) || 0));
    const m = Math.max(0, Math.min(59, parseInt(inputMinutes, 10) || 0));
    const finalMinutes = (h === 0 && m === 0) ? 25 : m;
    setFlexibleTimerDuration(h, finalMinutes, inputLabel.trim() || 'Custom Focus Session');
    setShowConfig(false);
    addToast(`Timer configured to ${h > 0 ? `${h}h ` : ''}${finalMinutes}m!`, 'info');
  };

  const handleSelectPreset = (preset) => {
    setInputHours(preset.hours);
    setInputMinutes(preset.mins);
    setInputLabel(preset.name);
    setFlexibleTimerDuration(preset.hours, preset.mins, preset.name);
    setShowConfig(false);
  };

  // SVG parameters
  const radius = 80;
  const circumference = 2 * Math.PI * radius; // ~502.65
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Container Card */}
      <div className={`relative w-full max-w-lg bg-[#121212] border transition-all duration-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(138,43,226,0.35)] overflow-hidden ${
        timerAlertActive
          ? 'border-emerald-500/80 shadow-[0_0_80px_rgba(16,185,129,0.5)] ring-4 ring-emerald-500/20'
          : timerRunning
          ? 'border-purple-500/60 shadow-[0_0_70px_rgba(138,43,226,0.45)]'
          : 'border-purple-500/30'
      }`}>
        
        {/* Ambient background glow */}
        <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          timerAlertActive
            ? 'bg-emerald-500/30'
            : timerRunning
            ? 'bg-purple-600/30 animate-pulse'
            : 'bg-purple-700/20'
        }`} />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setTimerModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/50 backdrop-blur-md transition-all shadow"
          title="Close timer modal"
          id="close-timer-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center relative z-10 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <Timer className="w-3.5 h-3.5 text-purple-400" />
            <span>Custom Study Timer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            <span>{timerSessionLabel || 'Deep Focus Session'}</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Fully flexible study timer • Tailored to your learning rhythm
          </p>
        </div>

        {/* Time's Up Alert Banner (when countdown hits 0) */}
        {timerAlertActive && (
          <div className="relative z-10 mb-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 backdrop-blur-md animate-bounce flex items-center justify-between gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <BellRing className="w-5 h-5 animate-wiggle" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-300">
                  🎉 Time's Up! Focus Milestone Reached!
                </h4>
                <p className="text-xs text-zinc-300">
                  Outstanding job! Take a short stretch or start your next block.
                </p>
              </div>
            </div>
            <button
              onClick={dismissTimerAlert}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition shadow-md whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Quick Presets Bar */}
        <div className="relative z-10 flex flex-wrap gap-1.5 justify-center mb-4">
          {presets.map((preset) => {
            const isCurrentPreset =
              timerHours === preset.hours && timerMinutes === preset.mins && !showConfig;
            return (
              <button
                key={preset.label}
                onClick={() => handleSelectPreset(preset)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all duration-200 border ${
                  isCurrentPreset
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(138,43,226,0.6)] scale-105'
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-purple-500/40'
                }`}
              >
                {preset.label} ({preset.hours > 0 ? `${preset.hours}h ` : ''}{preset.mins}m)
              </button>
            );
          })}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1 ${
              showConfig
                ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                : 'bg-zinc-900/80 text-purple-400 border-purple-500/30 hover:bg-purple-950/40'
            }`}
          >
            <span>Custom</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showConfig ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Custom Input Drawer (Flexible Hours & Minutes) */}
        {showConfig && (
          <form
            onSubmit={handleApplyCustomTime}
            className="relative z-10 mb-5 p-4 rounded-2xl bg-zinc-900/90 border border-purple-500/30 backdrop-blur-md animate-fadeIn space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                Custom Duration Input
              </span>
              <span className="text-[11px] text-purple-400 font-mono">Up to 12h 59m</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Hours Input */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Hours (0 – 12)
                </label>
                <div className="flex items-center rounded-xl bg-black/60 border border-zinc-700/80 focus-within:border-purple-500 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setInputHours((prev) => Math.max(0, (parseInt(prev, 10) || 0) - 1))}
                    className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    value={inputHours}
                    onChange={(e) => setInputHours(e.target.value)}
                    className="w-full bg-transparent text-center font-mono text-base font-bold text-white focus:outline-none py-1"
                    placeholder="0"
                  />
                  <button
                    type="button"
                    onClick={() => setInputHours((prev) => Math.min(12, (parseInt(prev, 10) || 0) + 1))}
                    className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Minutes Input */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Minutes (0 – 59)
                </label>
                <div className="flex items-center rounded-xl bg-black/60 border border-zinc-700/80 focus-within:border-purple-500 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setInputMinutes((prev) => Math.max(0, (parseInt(prev, 10) || 0) - 5))}
                    className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={inputMinutes}
                    onChange={(e) => setInputMinutes(e.target.value)}
                    className="w-full bg-transparent text-center font-mono text-base font-bold text-white focus:outline-none py-1"
                    placeholder="45"
                  />
                  <button
                    type="button"
                    onClick={() => setInputMinutes((prev) => Math.min(59, (parseInt(prev, 10) || 0) + 5))}
                    className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Session Goal Label */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                Study Goal / Topic
              </label>
              <input
                type="text"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
                placeholder="e.g. Organic Chemistry Final Prep"
                className="w-full px-3 py-2 bg-black/60 border border-zinc-700/80 focus:border-purple-500 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>

            {/* Apply Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-[0_0_15px_rgba(138,43,226,0.4)]"
            >
              Set Desired Timer Duration
            </button>
          </form>
        )}

        {/* ============================================================ */}
        {/* SLEEK ANIMATED CIRCULAR PROGRESS BAR & COUNTDOWN DISPLAY */}
        {/* ============================================================ */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_15px_rgba(138,43,226,0.3)]" viewBox="0 0 200 200">
              <defs>
                {/* Vibrant Purple Linear Gradient */}
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#8A2BE2" />
                </linearGradient>

                {/* Emerald Gradient for Alert Completion */}
                <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-zinc-800/80"
                strokeWidth="10"
                fill="transparent"
              />

              {/* Animated Progress Circle with Vibrant Purple Accent Stroke */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke={timerAlertActive ? 'url(#emeraldGradient)' : 'url(#purpleGradient)'}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
                style={{
                  filter: timerRunning
                    ? 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.75))'
                    : 'none'
                }}
              />
            </svg>

            {/* Inner Content Inside the Circular Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 select-none">
              {/* Status pill badge */}
              <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 border transition-colors ${
                timerAlertActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                  : timerRunning
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}>
                {timerAlertActive ? 'Finished' : timerRunning ? 'Focusing' : 'Ready'}
              </div>

              {/* Digital Countdown Numbers */}
              <div className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-wider transition-all duration-300 ${
                timerAlertActive
                  ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]'
                  : timerRunning
                  ? 'text-white drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]'
                  : 'text-zinc-200'
              }`}>
                {formattedTime}
              </div>

              {/* Progress Percentage Display */}
              <div className="text-[11px] font-mono text-zinc-400 mt-1">
                {Math.round(progressPercent)}% elapsed
              </div>

              {/* Quick Nudge Buttons: +5m / -5m */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => adjustTimerMinutes(-5)}
                  className="px-2 py-0.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] font-mono transition"
                  title="Subtract 5 minutes"
                >
                  -5m
                </button>
                <button
                  onClick={() => adjustTimerMinutes(5)}
                  className="px-2 py-0.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] font-mono transition"
                  title="Add 5 minutes"
                >
                  +5m
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CONTROLS: START, PAUSE, RESET */}
        {/* ============================================================ */}
        <div className="relative z-10 flex items-center justify-center gap-3 mt-4">
          {/* Reset Button */}
          <button
            onClick={resetFlexibleTimer}
            className="p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-purple-500/40 transition-all shadow-md active:scale-95"
            title="Reset timer to configured duration"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Primary Action Button (Start / Pause) with Glowing Vibrant Purple Effect */}
          {timerRunning ? (
            <button
              onClick={pauseFlexibleTimer}
              className="flex-1 max-w-[200px] flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-[0_0_25px_rgba(217,119,6,0.45)] hover:shadow-[0_0_35px_rgba(217,119,6,0.65)] active:scale-95"
            >
              <Pause className="w-5 h-5 fill-current" />
              <span>Pause Focus</span>
            </button>
          ) : (
            <button
              onClick={startFlexibleTimer}
              id="start-flexible-timer-btn"
              className="flex-1 max-w-[200px] flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(138,43,226,0.5)] hover:shadow-[0_0_40px_rgba(138,43,226,0.8)] active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Start Focus</span>
            </button>
          )}

          {/* Test Sound Chime Button */}
          <button
            onClick={() => {
              playTimerChime();
              addToast('Synthesized notification chime played!', 'info');
            }}
            className="p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-purple-300 border border-zinc-800 hover:border-purple-500/40 transition-all shadow-md active:scale-95"
            title="Preview completion chime"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Metrics */}
        <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-purple-400" />
            <span>Today's Sessions:</span>
            <span className="font-bold text-white font-mono">{timerSessionsCompleted}</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{(timerSessionsCompleted * (timerTotalSeconds / 3600)).toFixed(1)} hrs focused</span>
          </div>
        </div>

      </div>
    </div>
  );
};
