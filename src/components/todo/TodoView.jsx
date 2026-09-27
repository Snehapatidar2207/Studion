import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Trash2,
  Filter,
  Calendar,
  Clock,
  BookOpen,
  Tag,
  Search,
  Sparkles,
  Check
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const TodoView = () => {
  const { tasks, toggleTask, addTask, deleteTask } = useStudion();

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Active', 'Completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Quick inline add or modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCourse, setNewTaskCourse] = useState('CS 101');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskCategory, setNewTaskCategory] = useState('Academics');
  const [newTaskDueDate, setNewTaskDueDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [newTaskEstMinutes, setNewTaskEstMinutes] = useState(30);

  const categories = ['All', 'Academics', 'Assignments', 'Reading', 'Projects', 'Personal'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === 'All'
        ? true
        : filterStatus === 'Active'
        ? !task.completed
        : task.completed;
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle.trim(),
      course: newTaskCourse,
      priority: newTaskPriority,
      category: newTaskCategory,
      dueDate: newTaskDueDate,
      estimatedMinutes: Number(newTaskEstMinutes) || 30,
    });
    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <CheckCircle2 className="w-7 h-7 text-purple-400" />
            <span>Daily Task Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Organize study priorities, track completion with smooth animations, and crush your goals.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          id="open-add-task-modal-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Progress & Stat Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#141524] border border-[#25273d] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 font-extrabold text-lg">
            {progressPercent}%
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Task Completion Progress</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {completedCount} of {tasks.length} tasks completed today • {pendingCount} tasks remaining
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 bg-[#23253a] h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full transition-all duration-500 shadow-glow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#131422] border border-[#23253a] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title or course..."
              className="w-full pl-10 pr-4 py-2 bg-[#1a1b2d] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
            />
          </div>

          {/* Status buttons */}
          <div className="flex items-center p-1 bg-[#1a1b2d] rounded-xl border border-[#2c2e47] self-start md:self-auto">
            {['All', 'Active', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-purple-600 text-white shadow-glow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Priorities Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1f2135]">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-purple-400" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'text-gray-400 hover:text-gray-200 bg-[#171828] border border-transparent hover:border-[#2a2c42]'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-[#2a2c42] mx-1" />

          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            Priority:
          </span>
          {priorities.map((pri) => (
            <button
              key={pri}
              onClick={() => setFilterPriority(pri)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterPriority === pri
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'text-gray-400 hover:text-gray-200 bg-[#171828] border border-transparent hover:border-[#2a2c42]'
              }`}
            >
              {pri}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Items */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 p-8 rounded-2xl bg-[#141524] border border-[#23253b] space-y-3">
            <CheckCircle2 className="w-12 h-12 text-purple-400/40 mx-auto" />
            <h3 className="text-base font-bold text-white">No tasks match your criteria</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Try adjusting your filter tags, search query, or add a new study task to conquer today.
            </p>
            <button
              onClick={() => {
                setFilterCategory('All');
                setFilterPriority('All');
                setFilterStatus('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group ${
                task.completed
                  ? 'bg-[#11121c]/70 border-[#1c1d2e] opacity-60'
                  : 'bg-[#151624] border-[#25273d] hover:border-purple-500/40 hover:bg-[#18192a] hover:shadow-glow-sm'
              }`}
            >
              {/* Left: Custom Checkbox & Content */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  id={`checkbox-${task.id}`}
                  className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                    task.completed
                      ? 'bg-purple-600 border-purple-500 text-white shadow-glow-sm'
                      : 'border-[#383a54] bg-[#1e2033] hover:border-purple-400'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold transition-all duration-200 truncate ${
                      task.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-100 group-hover:text-white'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">
                      {task.course}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-[#1f2134] px-2 py-0.5 rounded flex items-center gap-1">
                      <Tag className="w-3 h-3 text-gray-400" />
                      {task.category}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-400" />
                      {task.estimatedMinutes}m
                    </span>
                    {task.dueDate && (
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Priority Badge & Delete */}
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    task.priority === 'High'
                      ? 'text-rose-400 bg-rose-500/15 border-rose-500/30'
                      : task.priority === 'Medium'
                      ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
                      : 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                  }`}
                >
                  {task.priority}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#23253b]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                Add New Study Task
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Read Chapter 4 on Distributed Consensus"
                  className="w-full px-3.5 py-2.5 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={newTaskCourse}
                    onChange={(e) => setNewTaskCourse(e.target.value)}
                    placeholder="e.g. CS 320"
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Academics">Academics</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Reading">Reading</option>
                    <option value="Projects">Projects</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Estimated Minutes: {newTaskEstMinutes}m
                </label>
                <input
                  type="range"
                  min="10"
                  max="180"
                  step="5"
                  value={newTaskEstMinutes}
                  onChange={(e) => setNewTaskEstMinutes(e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
