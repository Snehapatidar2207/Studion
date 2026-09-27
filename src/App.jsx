import React, { useState } from 'react';
import { StudionProvider, useStudion } from './context/StudionContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { PomodoroModal } from './components/common/PomodoroModal';
import { ToastContainer } from './components/common/ToastContainer';
import { DataManagementModal } from './components/common/DataManagementModal';

// Feature Views
import { DashboardView } from './components/dashboard/DashboardView';
import { TodoView } from './components/todo/TodoView';
import { AssignmentsView } from './components/assignments/AssignmentsView';
import { FlashcardsView } from './components/flashcards/FlashcardsView';
import { ResourcesView } from './components/resources/ResourcesView';
import { HabitsView } from './components/habits/HabitsView';
import { NotesView } from './components/notes/NotesView';

const MainLayout = () => {
  const { activeTab, sidebarCollapsed } = useStudion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'todos':
        return <TodoView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'resources':
        return <ResourcesView />;
      case 'habits':
        return <HabitsView />;
      case 'notes':
        return <NotesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f1f1f5] flex relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Background ambient neon glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/3 w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-[#10111a] border-r border-[#202236] shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Header */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <PomodoroModal />
      <DataManagementModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <StudionProvider>
      <MainLayout />
    </StudionProvider>
  );
}

export default App;
