import React, { useState } from 'react';
import {
  Flame,
  Plus,
  Trash2,
  Brain,
  Droplets,
  BookOpen,
  Activity,
  Layers,
  Sparkles,
  Trophy,
  Check,
  Calendar,
  Zap
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const HabitsView = () => {
  const { habits, toggleHabitDay, addHabit, deleteHabit } = useStudion();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('Study');
  const [habitIcon, setHabitIcon] = useState('Brain');
  const [habitTarget, setHabitTarget] = useState(7);

  const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Overall completion metrics for current week
  const totalSlots = habits.length * 7;
  const completedSlots = habits.reduce(
    (acc, h) => acc + h.completedDays.filter(Boolean).length,
    0
  );
  const weeklyRate = totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0;
  const bestStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    addHabit(habitName.trim(), habitCategory, habitIcon, '#8A2BE2', habitTarget);
    setHabitName('');
    setIsModalOpen(false);
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-pink-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      default:
        return <Brain className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Flame className="w-7 h-7 text-amber-400" />
            <span>Gamified Habit & Consistency Tracker</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Build unshakeable study disciplines, level up your daily streaks, and stay motivated.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          id="add-habit-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Habit</span>
        </button>
      </div>

      {/* Gamified Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Top Streak */}
        <div className="p-5 rounded-2xl bg-[#141524] border border-[#25273d] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Top Active Streak
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">{bestStreak}</span>
              <span className="text-xs text-amber-400 font-bold">Days in a Row 🔥</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Consistency compounds exponentially!</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Weekly Completion Rate */}
        <div className="p-5 rounded-2xl bg-[#141524] border border-[#25273d] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Weekly Completion
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">{weeklyRate}%</span>
              <span className="text-xs text-purple-300 font-bold">Week 39</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              {completedSlots} of {totalSlots} target checkpoints checked
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Motivation Badge */}
        <div className="p-5 rounded-2xl bg-[#141524] border border-[#25273d] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Student Rank
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-purple-300">Scholar Elite</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">
              Top 5% consistency this term
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Gamified Weekly Habit Grid */}
      <div className="p-6 rounded-3xl bg-[#141524] border border-[#25273d] shadow-xl space-y-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px]">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Weekly Habit Checkpoints
            </h2>
            <p className="text-xs text-gray-400">
              Click any box to mark habit done. Keep your streak intact!
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Current Week: Monday - Sunday</span>
          </div>
        </div>

        {/* Grid Header: Days of Week */}
        <div className="min-w-[600px] space-y-3">
          <div className="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-[#212338]">
            <div className="col-span-5">Habit & Frequency</div>
            <div className="col-span-1 text-center">Streak</div>
            <div className="col-span-5 grid grid-cols-7 gap-2 text-center">
              {daysLabels.map((day, idx) => (
                <span key={idx} className={idx === 6 ? 'text-purple-400' : ''}>
                  {day}
                </span>
              ))}
            </div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Grid Rows */}
          {habits.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-[#141524] border border-[#23253b] space-y-3">
              <Flame className="w-12 h-12 text-amber-400/40 mx-auto" />
              <h4 className="text-base font-bold text-white">No habits tracked yet</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Form positive daily rituals like Deep Work, Flashcard practice, or reading.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all"
              >
                + Add First Habit
              </button>
            </div>
          ) : (
            habits.map((habit) => {
            const completedCountThisWeek = habit.completedDays.filter(Boolean).length;
            const habitPercent = Math.round((completedCountThisWeek / 7) * 100);

            return (
              <div
                key={habit.id}
                className="grid grid-cols-12 gap-3 items-center p-3 rounded-2xl bg-[#191a2c] border border-[#2b2d45] hover:border-purple-500/40 transition-all group"
              >
                {/* Column: Info */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#23253b] border border-[#323552] flex items-center justify-center shrink-0">
                    {getIconComponent(habit.icon)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{habit.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-400">{habit.category}</span>
                      <span className="text-[10px] text-purple-300 font-semibold">
                        {completedCountThisWeek}/7 this week ({habitPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column: Streak */}
                <div className="col-span-1 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30 shadow-sm">
                    {habit.streak}d 🔥
                  </span>
                </div>

                {/* Column: 7 Days Checkboxes */}
                <div className="col-span-5 grid grid-cols-7 gap-2">
                  {habit.completedDays.map((isDone, dayIdx) => (
                    <button
                      key={dayIdx}
                      onClick={() => toggleHabitDay(habit.id, dayIdx)}
                      className={`h-9 rounded-xl flex items-center justify-center transition-all transform active:scale-90 ${
                        isDone
                          ? 'bg-gradient-to-tr from-purple-700 to-purple-500 text-white shadow-glow-sm border border-purple-400/40'
                          : 'bg-[#222438] hover:bg-[#2c2f48] text-gray-500 border border-[#30334c]'
                      }`}
                      title={`${daysLabels[dayIdx]}: ${isDone ? 'Completed' : 'Pending'}`}
                    >
                      {isDone ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="text-[11px] font-bold opacity-40">{daysLabels[dayIdx][0]}</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Column: Actions */}
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Habit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
          )}
        </div>
      </div>

      {/* Add Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Build a New Habit
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Habit Name *
                </label>
                <input
                  type="text"
                  required
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g. Read 15 pages of textbook"
                  className="w-full px-3.5 py-2.5 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={habitCategory}
                    onChange={(e) => setHabitCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Study">Study & Focus</option>
                    <option value="Memory">Memory & Recall</option>
                    <option value="Health">Health & Hydration</option>
                    <option value="Wellness">Wellness & Sport</option>
                    <option value="Learning">Learning & Reading</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={habitIcon}
                    onChange={(e) => setHabitIcon(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Brain">Brain (Focus)</option>
                    <option value="Droplets">Droplets (Water)</option>
                    <option value="BookOpen">Book (Reading)</option>
                    <option value="Activity">Activity (Workout)</option>
                    <option value="Layers">Layers (Flashcards)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Target Frequency: {habitTarget} days / week
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={habitTarget}
                  onChange={(e) => setHabitTarget(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23253b]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-sm"
                >
                  Start Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
