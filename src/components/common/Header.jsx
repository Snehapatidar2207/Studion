import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Play,
  Pause,
  Timer,
  Plus,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
  Bookmark,
  Menu,
  X,
  Sparkles,
  RotateCcw,
  Upload,
  HardDrive,
  User,
  LogIn,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const Header = ({ onOpenMobileMenu }) => {
  const {
    globalSearch,
    setGlobalSearch,
    tasks,
    assignments,
    notes,
    resources,
    setActiveTab,
    setActiveNoteId,
    timerSecondsLeft,
    timerRunning,
    timerSessionLabel,
    startFlexibleTimer,
    pauseFlexibleTimer,
    setTimerModalOpen,
    addTask,
    addAssignment,
    createNote,
    openDataModal,
    currentUser,
    setShowAuthView,
    logoutUser,
  } = useStudion();

  const [searchFocused, setSearchFocused] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const quickAddRef = useRef(null);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (quickAddRef.current && !quickAddRef.current.contains(e.target)) {
        setQuickAddOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format seconds to hh:mm:ss or mm:ss
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter search results
  const searchResults = globalSearch.trim()
    ? [
        ...tasks
          .filter((t) => t.title.toLowerCase().includes(globalSearch.toLowerCase()))
          .map((t) => ({ type: 'Task', title: t.title, meta: t.course, tab: 'todos' })),
        ...assignments
          .filter((a) => a.title.toLowerCase().includes(globalSearch.toLowerCase()))
          .map((a) => ({ type: 'Assignment', title: a.title, meta: a.course, tab: 'assignments' })),
        ...notes
          .filter((n) => n.title.toLowerCase().includes(globalSearch.toLowerCase()))
          .map((n) => ({ type: 'Note', title: n.title, meta: n.folder, tab: 'notes', id: n.id })),
        ...resources
          .filter((r) => r.title.toLowerCase().includes(globalSearch.toLowerCase()))
          .map((r) => ({ type: 'Resource', title: r.title, meta: r.category, tab: 'resources' })),
      ].slice(0, 6)
    : [];

  const notifications = [
    {
      id: 'n-1',
      title: 'Lab 4 Consensus Deadline',
      time: 'Due tonight at 11:59 PM',
      read: false,
      tag: 'Urgent',
      tagColor: 'text-rose-400 bg-rose-500/20'
    },
    {
      id: 'n-2',
      title: 'Habit Streak Milestone!',
      time: 'You hit an 8-day streak on Deep Work',
      read: false,
      tag: 'Streak',
      tagColor: 'text-amber-400 bg-amber-500/20'
    },
    {
      id: 'n-3',
      title: 'Shared Note Cloned',
      time: 'Marcus Chen imported your SVD notes',
      read: true,
      tag: 'Social',
      tagColor: 'text-purple-400 bg-purple-500/20'
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0e0f18]/85 backdrop-blur-xl border-b border-[#202234]">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1b2c] transition-colors"
          id="mobile-menu-toggle-btn"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              id="global-search-input"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search tasks, notes, deadlines, resources... (Ctrl+K)"
              className="w-full pl-10 pr-12 py-2 bg-[#151624] hover:bg-[#191b2c] focus:bg-[#18192a] text-sm text-gray-200 placeholder-gray-500 rounded-xl border border-[#27293d] focus:border-purple-500/70 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 p-0.5 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search suggestions dropdown */}
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 p-2 bg-[#151624] border border-[#2a2c42] rounded-xl shadow-2xl z-50 divide-y divide-[#202236]">
              <div className="px-2 py-1 text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                Matching Results
              </div>
              <div className="pt-1 space-y-1">
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab(item.tab);
                      if (item.id) setActiveNoteId(item.id);
                      setGlobalSearch('');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-purple-600/20 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#202236] text-purple-300">
                        {item.type}
                      </span>
                      <span className="text-xs truncate font-medium">{item.title}</span>
                    </div>
                    {item.meta && (
                      <span className="text-[11px] text-gray-500 ml-2 shrink-0">{item.meta}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right controls: Pomodoro, Quick Add, Notifications */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Flexible Timer Widget */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161726] border border-purple-500/30 hover:border-purple-500/60 shadow-sm transition-all group">
          <button
            onClick={() => setTimerModalOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white"
            title="Open Flexible Study Focus Timer"
            id="header-timer-btn"
          >
            <Timer className={`w-4 h-4 ${timerRunning ? 'text-purple-400 animate-pulse' : 'text-zinc-400'}`} />
            <span className="capitalize max-w-[90px] truncate">{timerSessionLabel || 'Focus'}:</span>
            <span className="font-mono text-white text-sm font-bold tracking-wider">
              {formatTime(timerSecondsLeft)}
            </span>
          </button>
          <div className="h-4 w-[1px] bg-[#2a2c42]" />
          <button
            onClick={() => (timerRunning ? pauseFlexibleTimer() : startFlexibleTimer())}
            className="p-1 rounded-lg text-purple-300 hover:text-white hover:bg-purple-600/30 transition-colors"
            title={timerRunning ? 'Pause' : 'Start Focus'}
          >
            {timerRunning ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
          </button>
        </div>

        {/* Reset & Upload Data Button */}
        <button
          onClick={() => openDataModal('reset')}
          id="header-reset-data-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1b2d] hover:bg-rose-500/20 text-rose-300 hover:text-rose-100 border border-rose-500/30 hover:border-rose-500/60 text-xs font-bold transition-all shadow-sm active:scale-95 group"
          title="Reset existing data or upload new custom study data"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-400 group-hover:-rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline">Reset / Upload</span>
        </button>

        {/* Quick Add Menu Dropdown */}
        <div className="relative" ref={quickAddRef}>
          <button
            onClick={() => setQuickAddOpen(!quickAddOpen)}
            id="quick-add-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New</span>
          </button>

          {quickAddOpen && (
            <div className="absolute right-0 mt-2 w-52 p-1.5 bg-[#171827] border border-[#2c2e46] rounded-xl shadow-2xl z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  addTask({
                    title: 'New Study Task',
                    course: 'CS 101',
                    priority: 'Medium',
                    category: 'Academics',
                    dueDate: new Date().toISOString().split('T')[0],
                    estimatedMinutes: 30,
                  });
                  setActiveTab('todos');
                  setQuickAddOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Add Task</span>
              </button>
              <button
                onClick={() => {
                  addAssignment({
                    title: 'New Course Assignment',
                    course: 'CS 300',
                    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
                    progress: 0,
                    weight: '10%',
                    priority: 'Medium',
                    type: 'Homework',
                    description: 'Enter assignment details here',
                  });
                  setActiveTab('assignments');
                  setQuickAddOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4 text-rose-400" />
                <span>Track Assignment</span>
              </button>
              <button
                onClick={() => {
                  createNote();
                  setActiveTab('notes');
                  setQuickAddOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Create Study Note</span>
              </button>
              
              <div className="pt-1 mt-1 border-t border-[#23253b]">
                <button
                  onClick={() => {
                    openDataModal('upload');
                    setQuickAddOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-purple-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4 text-purple-400" />
                  <span>Upload / Import Data</span>
                </button>
                <button
                  onClick={() => {
                    openDataModal('reset');
                    setQuickAddOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span>Reset Workspace Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            id="notifications-bell-btn"
            className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1b2c] border border-transparent hover:border-[#27293d] transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[#0e0f18] animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 p-3 bg-[#151624] border border-[#2c2e46] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#222436] mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Notifications & Alerts
                </span>
                <span className="text-[10px] text-purple-400 hover:underline cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-lg bg-[#1a1b2c] hover:bg-[#1f2136] transition-colors border border-[#27293d]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white">{n.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${n.tagColor}`}>
                        {n.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account / Auth Widget */}
        <div className="relative" ref={userMenuRef}>
          {currentUser?.isLoggedIn ? (
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              id="header-user-btn"
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-[#151624] hover:bg-[#1a1b2c] border border-purple-500/30 hover:border-purple-500/60 transition-all group shadow-sm"
              title={`${currentUser.name} (${currentUser.email})`}
            >
              <img
                src={currentUser.avatar || '/assets/student-avatar.jpg'}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/50"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                }}
              />
              <span className="hidden sm:inline text-xs font-semibold text-zinc-200 group-hover:text-white max-w-[100px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => setShowAuthView(true)}
              id="header-login-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:shadow-[0_0_25px_rgba(138,43,226,0.8)] transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}

          {/* User profile dropdown */}
          {userMenuOpen && currentUser?.isLoggedIn && (
            <div className="absolute right-0 mt-2 w-64 p-3 bg-[#151624] border border-[#2c2e46] rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2.5">
              <div className="flex items-center gap-3 pb-2.5 border-b border-[#222436]">
                <img
                  src={currentUser.avatar || '/assets/student-avatar.jpg'}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/40"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-zinc-400 truncate">{currentUser.email}</div>
                  <div className="text-[10px] text-purple-400 font-medium truncate">{currentUser.major}</div>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowAuthView(true);
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition text-left"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span>Switch Account / Sign In</span>
                </button>
                <button
                  onClick={() => {
                    logoutUser();
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-300 hover:text-white hover:bg-rose-500/20 rounded-xl transition text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
