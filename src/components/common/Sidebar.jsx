import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  Layers,
  Bookmark,
  Flame,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  RotateCcw
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    tasks,
    assignments,
    habits,
    openDataModal,
    currentUser,
    setShowAuthView,
  } = useStudion();

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const urgentAssignmentsCount = assignments.filter((a) => a.progress < 100).length;
  const activeHabitStreak = Math.max(...habits.map((h) => h.streak), 0);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'todos',
      label: 'To-Do List',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
      badgeColor: 'bg-purple-600/30 text-purple-300 border-purple-500/40',
    },
    {
      id: 'assignments',
      label: 'Deadlines & Tracker',
      icon: Clock,
      badge: urgentAssignmentsCount > 0 ? urgentAssignmentsCount : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      icon: Layers,
      badge: '3D',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'resources',
      label: 'Resource Vault',
      icon: Bookmark,
      badge: null,
    },
    {
      id: 'habits',
      label: 'Habit Tracker',
      icon: Flame,
      badge: activeHabitStreak > 0 ? `${activeHabitStreak}d 🔥` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'notes',
      label: 'Notes & Workspace',
      icon: FileText,
      badge: 'Collab',
      badgeColor: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-[#222436] bg-[#10111a]/95 backdrop-blur-xl flex flex-col justify-between ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand & Collapse Header */}
      <div>
        <div className="flex items-center justify-between px-4 py-5 border-b border-[#1e2030]">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-400/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                    Stud<span className="text-purple-400">ion</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Student Productivity Suite</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-400/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2133] transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            id="sidebar-toggle-btn"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`nav-${item.id}`}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-purple-600/20 text-white border border-purple-500/40 shadow-sm shadow-purple-900/30'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-[#181926]'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-r-full shadow-glow-sm" />
                )}
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-300'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left tracking-wide truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#1a1b2b] border border-purple-500/30 rounded-md text-xs font-semibold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Reset/Upload Data Trigger & Profile */}
      <div className="p-3 border-t border-[#1e2030] space-y-2">
        <button
          onClick={() => openDataModal('reset')}
          id="sidebar-reset-data-btn"
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 transition-all group ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
          title="Reset existing data or upload new custom study data"
        >
          <RotateCcw className="w-4 h-4 text-rose-400 group-hover:-rotate-90 transition-transform duration-300 shrink-0" />
          {!sidebarCollapsed && <span className="truncate">Reset / Upload Data</span>}
        </button>

        {!sidebarCollapsed ? (
          currentUser?.isLoggedIn ? (
            <div
              onClick={() => setShowAuthView(true)}
              className="flex items-center gap-3 p-2 rounded-xl bg-[#161724] border border-[#26283b] hover:border-purple-500/60 transition-all cursor-pointer group shadow-sm"
              title="Click to switch account or manage profile"
            >
              <img
                src={currentUser.avatar || '/assets/student-avatar.jpg'}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40 group-hover:ring-purple-400"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                    {currentUser.name}
                  </p>
                  <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                </div>
                <p className="text-[11px] text-gray-400 truncate">{currentUser.major || "Scholar"}</p>
              </div>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold group-hover:bg-purple-500/30">
                ★
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthView(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(138,43,226,0.4)] transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Log In / Sign Up</span>
            </button>
          )
        ) : (
          <div className="flex justify-center">
            <img
              onClick={() => setShowAuthView(true)}
              src={currentUser?.avatar || '/assets/student-avatar.jpg'}
              alt={currentUser?.name || 'Scholar'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40 hover:ring-purple-400 cursor-pointer transition-all"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
              title={currentUser?.isLoggedIn ? `${currentUser.name} - ${currentUser.major}` : 'Log In'}
            />
          </div>
        )}
      </div>
    </aside>
  );
};
