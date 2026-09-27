import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  Brain,
  ArrowRight,
  Plus,
  Play,
  Calendar,
  Layers,
  FileText,
  AlertTriangle,
  Award,
  RotateCcw,
  Upload,
  HardDrive
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const DashboardView = () => {
  const {
    tasks,
    toggleTask,
    assignments,
    habits,
    toggleHabitDay,
    notes,
    setActiveTab,
    setActiveNoteId,
    setPomodoroOpen,
    setPomoRunning,
    openDataModal,
    restoreDefaultData,
  } = useStudion();

  // Calculations
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Urgent assignments (incomplete, sorted by earliest due date)
  const urgentAssignments = [...assignments]
    .filter((a) => a.progress < 100)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // Highest habit streak
  const bestStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Helper for deadline countdown
  const getDaysLeftText = (isoDate) => {
    const diff = new Date(isoDate).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return { text: 'Overdue', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
    if (days === 0) return { text: 'Due Today', color: 'text-rose-400 bg-rose-500/20 border-rose-500/40' };
    if (days === 1) return { text: '1 Day Left', color: 'text-amber-400 bg-amber-500/20 border-amber-500/40' };
    return { text: `${days} Days Left`, color: 'text-purple-300 bg-purple-500/20 border-purple-500/30' };
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* 3D Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-[#12131f] shadow-2xl">
        {/* Background glow & 3D art */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img
            src="/assets/hero-workspace.jpg"
            alt="Studion 3D Workspace"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d15] via-[#0c0d15]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Fall Semester 2026 • Finals Sprint</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {getGreeting()}, <span className="text-glow-purple text-purple-400">Alex</span> 👋
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
              You have <span className="text-purple-300 font-bold">{tasks.length - completedTasks} tasks</span> and{' '}
              <span className="text-rose-400 font-bold">{urgentAssignments.length} upcoming deadlines</span> scheduled. Keep up your{' '}
              <span className="text-amber-400 font-bold">{bestStreak}-day habit streak</span>!
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setPomodoroOpen(true);
                  setPomoRunning(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-md hover:shadow-glow-lg transition-all active:scale-95"
                id="hero-start-focus-btn"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Focus Session</span>
              </button>
              <button
                onClick={() => setActiveTab('todos')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1d2e] hover:bg-[#23253b] text-gray-200 text-xs font-semibold border border-[#2e314a] hover:border-purple-500/40 transition-all"
              >
                <span>Manage Tasks</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </button>
              <button
                onClick={() => setActiveTab('flashcards')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1d2e] hover:bg-[#23253b] text-gray-200 text-xs font-semibold border border-[#2e314a] hover:border-purple-500/40 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Review Flashcards</span>
              </button>
              <button
                onClick={() => openDataModal('reset')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1d2e] hover:bg-rose-500/20 text-rose-300 hover:text-white text-xs font-semibold border border-rose-500/30 hover:border-rose-500/50 transition-all"
                title="Reset or upload new workspace data"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                <span>Reset & Upload Data</span>
              </button>
            </div>
          </div>

          {/* Quick Motivational Stat Card */}
          <div className="hidden lg:flex flex-col gap-3 p-4 rounded-2xl bg-[#171829]/90 backdrop-blur-md border border-purple-500/30 w-72 shrink-0 shadow-xl">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                Daily Completion
              </span>
              <span className="text-purple-300 font-bold">{taskProgress}%</span>
            </div>
            <div className="w-full bg-[#24263b] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-glow-sm"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 italic">
              &quot;Success is the sum of small efforts, repeated day in and day out.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Tasks */}
        <div
          onClick={() => setActiveTab('todos')}
          className="p-5 rounded-2xl bg-[#141523] border border-[#25273c] hover:border-purple-500/50 hover:shadow-glow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Today&apos;s To-Dos
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {completedTasks}/{tasks.length}
            </span>
            <span className="text-xs text-gray-400 font-medium">Completed</span>
          </div>
          <p className="text-xs text-purple-300/80 mt-2 flex items-center gap-1">
            <span>{tasks.length - completedTasks} remaining</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        {/* Metric 2: Urgent Deadlines */}
        <div
          onClick={() => setActiveTab('assignments')}
          className="p-5 rounded-2xl bg-[#141523] border border-[#25273c] hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-950/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Urgent Deadlines
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {urgentAssignments.length}
            </span>
            <span className="text-xs text-gray-400 font-medium">Pending</span>
          </div>
          <p className="text-xs text-rose-300/80 mt-2 flex items-center gap-1">
            <span>Next: {urgentAssignments[0]?.course || 'None'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        {/* Metric 3: Habit Streak */}
        <div
          onClick={() => setActiveTab('habits')}
          className="p-5 rounded-2xl bg-[#141523] border border-[#25273c] hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-950/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Habit Streak
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{bestStreak}</span>
            <span className="text-xs text-amber-300 font-medium">Days on Fire 🔥</span>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <span>{habits.length} habits tracked</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        {/* Metric 4: Flashcards */}
        <div
          onClick={() => setActiveTab('flashcards')}
          className="p-5 rounded-2xl bg-[#141523] border border-[#25273c] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Study Decks
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">3</span>
            <span className="text-xs text-cyan-300 font-medium">Active Decks</span>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <span>Spaced Repetition</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>

      {/* Main Grid: Urgent Deadlines & Today's To-Do List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Tasks (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide">Today&apos;s To-Do Focus</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                {tasks.filter((t) => !t.completed).length} Pending
              </span>
            </div>
            <button
              onClick={() => setActiveTab('todos')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#151624] border border-[#23253a] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-purple-400/40 mx-auto" />
                <h4 className="text-sm font-bold text-white">No tasks scheduled</h4>
                <p className="text-xs text-gray-400">
                  Your task list is clean! Add a new task, upload data, or restore sample study items.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveTab('todos')}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    + Add Task
                  </button>
                  <button
                    onClick={() => openDataModal('upload')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1e2034] hover:bg-[#282a45] text-purple-300 text-xs font-semibold border border-purple-500/30"
                  >
                    Upload JSON
                  </button>
                  <button
                    onClick={restoreDefaultData}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1e2034] hover:bg-[#282a45] text-gray-300 text-xs font-semibold border border-[#2c2e47]"
                  >
                    Restore Demo
                  </button>
                </div>
              </div>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 group ${
                    task.completed
                      ? 'bg-[#12131d]/60 border-[#1f2133] opacity-60'
                      : 'bg-[#151624] border-[#25273d] hover:border-purple-500/40 hover:bg-[#18192a]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 rounded text-purple-600 bg-[#222438] border-[#363852] focus:ring-purple-500 focus:ring-offset-[#151624] cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium truncate ${
                          task.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-200 group-hover:text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20">
                          {task.course}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Est. {task.estimatedMinutes}m
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        task.priority === 'High'
                          ? 'text-rose-400 bg-rose-500/15 border border-rose-500/30'
                          : task.priority === 'Medium'
                          ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30'
                          : 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Urgent Deadlines Countdown & Habit Tracker (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Deadlines Widget */}
          <div className="p-5 rounded-2xl bg-[#141524] border border-[#25273d] shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                Urgent Deadlines
              </h2>
              <button
                onClick={() => setActiveTab('assignments')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {urgentAssignments.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#191a2c] border border-[#27293d] text-center text-xs text-gray-400 space-y-2">
                  <Clock className="w-8 h-8 text-rose-400/40 mx-auto" />
                  <p className="font-semibold text-gray-300">No urgent deadlines pending</p>
                  <button
                    onClick={() => setActiveTab('assignments')}
                    className="px-3 py-1 rounded-lg bg-purple-600/30 text-purple-300 hover:text-white border border-purple-500/40 text-[11px] font-bold"
                  >
                    + Track Assignment
                  </button>
                </div>
              ) : (
                urgentAssignments.map((asg) => {
                  const countdown = getDaysLeftText(asg.dueDate);
                  return (
                    <div
                      key={asg.id}
                      className="p-3 rounded-xl bg-[#191a2c] border border-[#2b2d45] hover:border-purple-500/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/15 px-1.5 py-0.5 rounded">
                            {asg.course}
                          </span>
                          <h4 className="text-xs font-semibold text-white mt-1 truncate">
                            {asg.title}
                          </h4>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${countdown.color}`}
                        >
                          {countdown.text}
                        </span>
                      </div>

                      <div className="space-y-1 mt-2">
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                          <span>Progress: {asg.progress}%</span>
                          <span>Weight: {asg.weight}</span>
                        </div>
                        <div className="w-full bg-[#27293f] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-rose-400 rounded-full"
                            style={{ width: `${asg.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Mini Habit Tracker preview */}
          <div className="p-5 rounded-2xl bg-[#141524] border border-[#25273d] shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Daily Habit Streaks
              </h2>
              <button
                onClick={() => setActiveTab('habits')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Full Grid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {habits.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#191a2c] border border-[#27293d] text-center text-xs text-gray-400 space-y-2">
                  <Flame className="w-8 h-8 text-amber-400/40 mx-auto" />
                  <p className="font-semibold text-gray-300">No daily habits active</p>
                  <button
                    onClick={() => setActiveTab('habits')}
                    className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 text-[11px] font-bold"
                  >
                    + Start Habit
                  </button>
                </div>
              ) : (
                habits.slice(0, 3).map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#191a2c] border border-[#2a2c42]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-medium text-gray-200 truncate">
                        {habit.name}
                      </span>
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                        {habit.streak}d 🔥
                      </span>
                    </div>

                    {/* 7-day checkboxes */}
                    <div className="flex items-center gap-1">
                      {habit.completedDays.map((isDone, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleHabitDay(habit.id, idx)}
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                            isDone
                              ? 'bg-purple-600 text-white shadow-glow-sm'
                              : 'bg-[#25273d] text-gray-500 hover:bg-[#31344f]'
                          }`}
                          title={`Day ${idx + 1}`}
                        >
                          {daysOfWeek[idx]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
