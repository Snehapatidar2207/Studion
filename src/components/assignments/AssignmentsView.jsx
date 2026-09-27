import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Trash2,
  ArrowUpDown,
  Filter,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const AssignmentsView = () => {
  const {
    assignments,
    addAssignment,
    updateAssignmentProgress,
    deleteAssignment,
  } = useStudion();

  const [sortOption, setSortOption] = useState('earliest'); // earliest, latest, progress, priority
  const [courseFilter, setCourseFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS 300');
  const [dueDate, setDueDate] = useState('');
  const [weight, setWeight] = useState('15%');
  const [priority, setPriority] = useState('High');
  const [type, setType] = useState('Programming Project');
  const [description, setDescription] = useState('');

  // Extract unique courses
  const uniqueCourses = ['All', ...new Set(assignments.map((a) => a.course))];

  // Helper for countdown
  const getCountdownInfo = (isoDate) => {
    const diff = new Date(isoDate).getTime() - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diff < 0) {
      return {
        label: 'Overdue',
        badge: 'text-red-400 bg-red-500/15 border-red-500/30',
        urgency: 'critical',
      };
    }
    if (days === 0 && hours <= 12) {
      return {
        label: `${hours}h Left (Urgent)`,
        badge: 'text-rose-400 bg-rose-500/20 border-rose-500/40 animate-pulse',
        urgency: 'critical',
      };
    }
    if (days === 0) {
      return {
        label: `${hours} Hours Left`,
        badge: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
        urgency: 'critical',
      };
    }
    if (days === 1) {
      return {
        label: '1 Day Left',
        badge: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
        urgency: 'warning',
      };
    }
    if (days <= 3) {
      return {
        label: `${days} Days Left`,
        badge: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
        urgency: 'warning',
      };
    }
    return {
      label: `${days} Days Left`,
      badge: 'text-purple-300 bg-purple-500/20 border-purple-500/30',
      urgency: 'safe',
    };
  };

  // Filter & Chronological Sorting
  const sortedAssignments = [...assignments]
    .filter((a) => courseFilter === 'All' || a.course === courseFilter)
    .sort((a, b) => {
      if (sortOption === 'earliest') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortOption === 'latest') {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      if (sortOption === 'progress') {
        return b.progress - a.progress;
      }
      if (sortOption === 'priority') {
        const pOrder = { High: 3, Medium: 2, Low: 1 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      return 0;
    });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    addAssignment({
      title: title.trim(),
      course,
      dueDate,
      progress: 0,
      weight,
      priority,
      type,
      description: description || 'Assignment details and requirements.',
    });
    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Clock className="w-7 h-7 text-rose-400" />
            <span>Assignment & Deadline Tracker</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time countdowns, syllabus progress bars, and chronological tracking to keep you ahead.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          id="add-assignment-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Track Assignment</span>
        </button>
      </div>

      {/* Sorting & Filter Controls */}
      <div className="p-4 rounded-2xl bg-[#131422] border border-[#23253b] flex flex-wrap items-center justify-between gap-3">
        {/* Course Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-purple-400" />
            Courses:
          </span>
          {uniqueCourses.map((c) => (
            <button
              key={c}
              onClick={() => setCourseFilter(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                courseFilter === c
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-glow-sm'
                  : 'bg-[#1a1b2d] text-gray-400 hover:text-white border border-[#2a2c42]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Chronological Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
            Sort By:
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1.5 bg-[#1a1b2d] border border-[#2c2e47] rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-purple-500/60"
          >
            <option value="earliest">Earliest Due (Default)</option>
            <option value="latest">Latest Due</option>
            <option value="progress">Highest Progress</option>
            <option value="priority">Highest Priority</option>
          </select>
        </div>
      </div>

      {/* Assignments Card Grid */}
      {assignments.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#141524] border border-[#23253b] space-y-4">
          <Clock className="w-14 h-14 text-rose-400/40 mx-auto" />
          <h3 className="text-lg font-bold text-white">No assignments or exams tracked yet</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Stay ahead of deadlines, monitor project weights, and track coursework progress.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all"
          >
            + Track First Assignment
          </button>
        </div>
      ) : sortedAssignments.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-2xl bg-[#141524] border border-[#23253b] space-y-3">
          <Clock className="w-12 h-12 text-rose-400/40 mx-auto" />
          <h3 className="text-base font-bold text-white">No assignments match your filter</h3>
          <p className="text-xs text-gray-400">Try switching your status filter or clearing your search.</p>
          <button
            onClick={() => {
              setFilterStatus('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedAssignments.map((asg) => {
            const countdown = getCountdownInfo(asg.dueDate);
            const isFinished = asg.progress === 100;
            const formattedDate = new Date(asg.dueDate).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={asg.id}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 group ${
                  isFinished
                    ? 'bg-[#12141c]/60 border-[#202236] opacity-75'
                    : 'bg-[#141524] border-[#26283f] hover:border-purple-500/50 hover:shadow-glow-sm hover:-translate-y-0.5'
                }`}
              >
              <div>
                {/* Header row: Course, Type, and Countdown */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wider">
                      {asg.course}
                    </span>
                    <span className="text-[11px] text-gray-400 bg-[#1c1d2e] px-2 py-0.5 rounded-md">
                      {asg.type}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${countdown.badge}`}
                  >
                    {isFinished ? 'Submitted ✓' : countdown.label}
                  </span>
                </div>

                {/* Assignment Title */}
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                  {asg.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {asg.description}
                </p>
              </div>

              {/* Progress & Actions Footer */}
              <div className="mt-5 pt-4 border-t border-[#202238] space-y-3">
                {/* Progress bar and label */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-400 font-medium">Completion Progress</span>
                    <span className="font-mono font-bold text-white">{asg.progress}%</span>
                  </div>
                  <div className="w-full bg-[#202238] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isFinished
                          ? 'bg-emerald-500 shadow-glow-sm'
                          : asg.progress > 50
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-400'
                          : 'bg-gradient-to-r from-rose-500 to-purple-600'
                      }`}
                      style={{ width: `${asg.progress}%` }}
                    />
                  </div>
                </div>

                {/* Metadata & Quick Adjustment */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formattedDate}
                    </span>
                    <span>Weight: <strong className="text-purple-300">{asg.weight}</strong></span>
                  </div>

                  {/* Quick increment buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        updateAssignmentProgress(asg.id, Math.min(100, asg.progress + 25))
                      }
                      className="px-2 py-0.5 rounded bg-[#1e2033] hover:bg-purple-600/30 text-purple-300 hover:text-white text-[11px] font-semibold border border-[#2b2d45] transition-colors"
                      title="Add +25% progress"
                    >
                      +25%
                    </button>
                    <button
                      onClick={() =>
                        updateAssignmentProgress(asg.id, asg.progress === 100 ? 0 : 100)
                      }
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                        isFinished
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-[#1e2033] hover:bg-emerald-600/30 text-gray-300 hover:text-emerald-300 border-[#2b2d45]'
                      }`}
                    >
                      {isFinished ? 'Reset' : 'Done'}
                    </button>
                    <button
                      onClick={() => deleteAssignment(asg.id)}
                      className="p-1 rounded text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-1"
                      title="Delete assignment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}

      {/* Add Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#23253b]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                Track New Assignment or Exam
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Systems Consensus Project"
                  className="w-full px-3.5 py-2.5 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. CS 320"
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Due Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Programming Project">Programming Project</option>
                    <option value="Problem Set">Problem Set</option>
                    <option value="Lab Report">Lab Report</option>
                    <option value="Term Paper">Term Paper</option>
                    <option value="Midterm Exam">Midterm Exam</option>
                    <option value="Final Exam">Final Exam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Grade Weight
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 20%"
                    className="w-full px-3 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Description & Deliverables
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline key deliverables, rubric details, and submission portal links..."
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23253b]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#1f2134] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-sm transition-all"
                >
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
