import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialTasks,
  initialAssignments,
  initialDecks,
  initialResources,
  initialHabits,
  initialFolders,
  initialNotes,
  initialSharedVaultNotes
} from '../data/mockData';

const StudionContext = createContext(null);

export const StudionProvider = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // To-Dos
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studion_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Assignments
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('studion_assignments');
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  // Flashcards
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem('studion_decks');
    return saved ? JSON.parse(saved) : initialDecks;
  });
  const [activeDeckId, setActiveDeckId] = useState(initialDecks[0]?.id || '');

  // Resources
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('studion_resources');
    return saved ? JSON.parse(saved) : initialResources;
  });

  // Habits
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('studion_habits');
    return saved ? JSON.parse(saved) : initialHabits;
  });

  // Notes
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('studion_notes');
    return saved ? JSON.parse(saved) : initialNotes;
  });
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('studion_folders');
    return saved ? JSON.parse(saved) : initialFolders;
  });
  const [activeNoteId, setActiveNoteId] = useState(initialNotes[0]?.id || '');
  const [sharedVaultNotes, setSharedVaultNotes] = useState(initialSharedVaultNotes);

  // Data & Reset Modal State
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [dataModalTab, setDataModalTab] = useState('reset'); // 'reset' | 'upload' | 'export'

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8A2BE2', '#9370DB', '#C084FC', '#06b6d4', '#ec4899']
      });
    } catch {
      // Fallback safe
    }
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('studion_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studion_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('studion_decks', JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem('studion_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('studion_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('studion_notes', JSON.stringify(notes));
  }, [notes]);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('studion_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Alex Rivera',
          email: 'alex.rivera@university.edu',
          major: "Computer Science '26",
          avatar: '/assets/student-avatar.jpg',
          isLoggedIn: true
        };
  });
  const [showAuthView, setShowAuthView] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('studion_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('studion_user');
    }
  }, [currentUser]);

  const loginUser = (email, password, rememberMe = true) => {
    const user = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      major: "Computer Science '26",
      avatar: '/assets/student-avatar.jpg',
      isLoggedIn: true
    };
    setCurrentUser(user);
    if (rememberMe) {
      localStorage.setItem('studion_user', JSON.stringify(user));
    }
    setShowAuthView(false);
    triggerConfetti();
    addToast(`Welcome back, ${user.name}! Ready to study?`, 'success');
  };

  const signupUser = (name, email, password, major = 'Computer Science') => {
    const user = {
      name,
      email,
      major,
      avatar: '/assets/student-avatar.jpg',
      isLoggedIn: true
    };
    setCurrentUser(user);
    localStorage.setItem('studion_user', JSON.stringify(user));
    setShowAuthView(false);
    triggerConfetti();
    addToast(`Account created! Welcome to Studion, ${name}.`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser({
      name: 'Guest Student',
      email: '',
      major: 'Guest Session',
      avatar: '/assets/student-avatar.jpg',
      isLoggedIn: false
    });
    localStorage.removeItem('studion_user');
    setShowAuthView(true);
    addToast('Logged out of Studion.', 'info');
  };

  // Flexible Study Timer State
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(45);
  const [timerTotalSeconds, setTimerTotalSeconds] = useState(45 * 60);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSessionLabel, setTimerSessionLabel] = useState('Deep Focus Sprint');
  const [timerAlertActive, setTimerAlertActive] = useState(false);
  const [timerSessionsCompleted, setTimerSessionsCompleted] = useState(3);

  // Synthesize pleasant acoustic chime using Web Audio API
  const playTimerChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Chord Tone 1 (D5 - 587.33Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      // Chord Tone 2 (A5 - 880Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.25);
      gain2.gain.setValueAtTime(0.3, now + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.25);
      osc2.stop(now + 1.8);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Flexible timer countdown ticker
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerAlertActive(true);
      setTimerSessionsCompleted((s) => s + 1);
      playTimerChime();
      triggerConfetti();
      addToast(`🎉 Session Complete: "${timerSessionLabel}" time is up!`, 'success');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft, timerSessionLabel]);

  // Set custom timer parameters
  const setFlexibleTimerDuration = (hours, minutes, label = 'Custom Study Session') => {
    const validHours = Math.max(0, Math.min(12, Number(hours) || 0));
    const validMinutes = Math.max(0, Math.min(59, Number(minutes) || 0));
    const totalSecs = (validHours * 3600) + (validMinutes * 60) || 60; // minimum 1 min

    setTimerHours(validHours);
    setTimerMinutes(validMinutes);
    setTimerTotalSeconds(totalSecs);
    setTimerSecondsLeft(totalSecs);
    setTimerRunning(false);
    setTimerAlertActive(false);
    if (label) setTimerSessionLabel(label);
  };

  const adjustTimerMinutes = (deltaMinutes) => {
    setTimerSecondsLeft((prev) => {
      const updated = Math.max(60, prev + deltaMinutes * 60);
      setTimerTotalSeconds((tot) => Math.max(updated, tot));
      return updated;
    });
  };

  const startFlexibleTimer = () => {
    if (timerSecondsLeft <= 0) {
      setTimerSecondsLeft(timerTotalSeconds);
    }
    setTimerAlertActive(false);
    setTimerRunning(true);
  };

  const pauseFlexibleTimer = () => {
    setTimerRunning(false);
  };

  const resetFlexibleTimer = () => {
    setTimerRunning(false);
    setTimerAlertActive(false);
    setTimerSecondsLeft(timerTotalSeconds);
  };

  const dismissTimerAlert = () => {
    setTimerAlertActive(false);
  };

  // Task Actions
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            triggerConfetti();
            addToast(`Completed: "${t.title}"`, 'success');
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const addTask = (task) => {
    const newTask = {
      id: `task-${Date.now()}`,
      completed: false,
      ...task,
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast('Task added successfully!', 'success');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast('Task removed', 'info');
  };

  // Assignment Actions
  const addAssignment = (asg) => {
    const newAsg = {
      id: `asg-${Date.now()}`,
      status: 'In Progress',
      ...asg,
    };
    setAssignments((prev) => [newAsg, ...prev]);
    addToast('Assignment added to tracker!', 'success');
  };

  const updateAssignmentProgress = (id, progress) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const numericProgress = Math.min(100, Math.max(0, Number(progress)));
          const status = numericProgress === 100 ? 'Submitted' : numericProgress > 0 ? 'In Progress' : 'Not Started';
          if (numericProgress === 100 && a.progress < 100) {
            triggerConfetti();
            addToast(`Submitted assignment: ${a.title}!`, 'success');
          }
          return { ...a, progress: numericProgress, status };
        }
        return a;
      })
    );
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    addToast('Assignment deleted', 'info');
  };

  // Flashcards Actions
  const addDeck = (name, category, color = '#8A2BE2') => {
    const newDeck = {
      id: `deck-${Date.now()}`,
      name,
      category,
      color,
      cards: []
    };
    setDecks((prev) => [...prev, newDeck]);
    setActiveDeckId(newDeck.id);
    addToast(`New deck "${name}" created!`, 'success');
  };

  const addCardToDeck = (deckId, front, back) => {
    const newCard = {
      id: `c-${Date.now()}`,
      front,
      back,
      difficulty: 'New',
      streak: 0
    };
    setDecks((prev) =>
      prev.map((deck) => {
        if (deck.id === deckId) {
          return { ...deck, cards: [...deck.cards, newCard] };
        }
        return deck;
      })
    );
    addToast('Flashcard created!', 'success');
  };

  const rateCard = (deckId, cardId, rating) => {
    setDecks((prev) =>
      prev.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: deck.cards.map((c) => {
              if (c.id === cardId) {
                const streak = rating === 'Easy' ? c.streak + 1 : rating === 'Again' ? 0 : c.streak;
                return { ...c, difficulty: rating, streak };
              }
              return c;
            })
          };
        }
        return deck;
      })
    );
  };

  // Resource Actions
  const addResource = (res) => {
    const newRes = {
      id: `res-${Date.now()}`,
      addedDate: new Date().toISOString().split('T')[0],
      ...res,
    };
    setResources((prev) => [newRes, ...prev]);
    addToast('Resource saved to vault!', 'success');
  };

  const deleteResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    addToast('Resource removed from vault', 'info');
  };

  // Habit Actions
  const toggleHabitDay = (habitId, dayIndex) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextDays = [...h.completedDays];
          nextDays[dayIndex] = !nextDays[dayIndex];
          // Recalculate streak
          const newStreak = nextDays[dayIndex] ? h.streak + 1 : Math.max(0, h.streak - 1);
          if (nextDays[dayIndex] && dayIndex === 6) {
            triggerConfetti();
            addToast(`🔥 Streak continued for "${h.name}"!`, 'success');
          }
          return { ...h, completedDays: nextDays, streak: newStreak };
        }
        return h;
      })
    );
  };

  const addHabit = (name, category, icon = 'Brain', color = '#8A2BE2', targetDaysPerWeek = 7) => {
    const newHabit = {
      id: `h-${Date.now()}`,
      name,
      category,
      icon,
      color,
      targetDaysPerWeek: Number(targetDaysPerWeek),
      streak: 1,
      completedDays: [false, false, false, false, false, false, true]
    };
    setHabits((prev) => [...prev, newHabit]);
    addToast(`Habit "${name}" started! Let's build consistency.`, 'success');
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    addToast('Habit removed', 'info');
  };

  // Notes Actions
  const createNote = (folder = 'Computer Science') => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: 'Untitled Study Note',
      folder,
      tags: ['Study'],
      pinned: false,
      lastEdited: new Date().toISOString(),
      shared: false,
      shareId: `studion-${Math.random().toString(36).substring(2, 9)}`,
      content: '# Untitled Study Note\n\nStart capturing key lecture insights, formulas, and references here...'
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    addToast('New note created in workspace!', 'success');
  };

  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return { ...n, ...updates, lastEdited: new Date().toISOString() };
        }
        return n;
      })
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => {
      const filtered = prev.filter((n) => n.id !== id);
      if (activeNoteId === id && filtered.length > 0) {
        setActiveNoteId(filtered[0].id);
      }
      return filtered;
    });
    addToast('Note deleted', 'info');
  };

  const togglePinNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return { ...n, pinned: !n.pinned };
        }
        return n;
      })
    );
  };

  const forkSharedNote = (sharedNote) => {
    const imported = {
      id: `note-${Date.now()}`,
      title: `[Imported] ${sharedNote.title}`,
      folder: sharedNote.category || 'Computer Science',
      tags: ['Shared', 'VaultImport'],
      pinned: false,
      lastEdited: new Date().toISOString(),
      shared: false,
      shareId: `studion-${Math.random().toString(36).substring(2, 9)}`,
      content: `# ${sharedNote.title}\n*Author: ${sharedNote.author}*\n\n${sharedNote.snippet}\n\n### Full Collaborative Study Guide\n- Captured from Studion Shared Vault\n- Ready for personal annotations, highlights, and exam prep!`
    };
    setNotes((prev) => [imported, ...prev]);
    setActiveNoteId(imported.id);
    setActiveTab('notes');
    triggerConfetti();
    addToast(`Imported "${sharedNote.title}" to your personal notes!`, 'success');
  };

  // Data Management: Reset, Restore, Import, Export
  const openDataModal = (tab = 'reset') => {
    setDataModalTab(tab);
    setDataModalOpen(true);
  };

  const resetAllData = (options = { tasks: true, assignments: true, decks: true, resources: true, habits: true, notes: true }) => {
    if (options.tasks) {
      setTasks([]);
      localStorage.removeItem('studion_tasks');
    }
    if (options.assignments) {
      setAssignments([]);
      localStorage.removeItem('studion_assignments');
    }
    if (options.decks) {
      setDecks([]);
      setActiveDeckId('');
      localStorage.removeItem('studion_decks');
    }
    if (options.resources) {
      setResources([]);
      localStorage.removeItem('studion_resources');
    }
    if (options.habits) {
      setHabits([]);
      localStorage.removeItem('studion_habits');
    }
    if (options.notes) {
      setNotes([]);
      setActiveNoteId('');
      localStorage.removeItem('studion_notes');
    }
    addToast('Selected workspace data has been cleared.', 'info');
  };

  const restoreDefaultData = () => {
    setTasks(initialTasks);
    setAssignments(initialAssignments);
    setDecks(initialDecks);
    setActiveDeckId(initialDecks[0]?.id || '');
    setResources(initialResources);
    setHabits(initialHabits);
    setFolders(initialFolders);
    setNotes(initialNotes);
    setActiveNoteId(initialNotes[0]?.id || '');

    localStorage.setItem('studion_tasks', JSON.stringify(initialTasks));
    localStorage.setItem('studion_assignments', JSON.stringify(initialAssignments));
    localStorage.setItem('studion_decks', JSON.stringify(initialDecks));
    localStorage.setItem('studion_resources', JSON.stringify(initialResources));
    localStorage.setItem('studion_habits', JSON.stringify(initialHabits));
    localStorage.setItem('studion_folders', JSON.stringify(initialFolders));
    localStorage.setItem('studion_notes', JSON.stringify(initialNotes));

    triggerConfetti();
    addToast('Default sample study data restored successfully!', 'success');
  };

  const importData = (imported, mode = 'replace') => {
    try {
      if (!imported || typeof imported !== 'object') {
        throw new Error('Invalid JSON format: expected an object.');
      }

      let importedTasksCount = 0;
      let importedAssignmentsCount = 0;
      let importedDecksCount = 0;
      let importedResourcesCount = 0;
      let importedHabitsCount = 0;
      let importedNotesCount = 0;

      if (Array.isArray(imported.tasks)) {
        if (mode === 'replace') {
          setTasks(imported.tasks);
        } else {
          setTasks((prev) => [...imported.tasks, ...prev.filter((p) => !imported.tasks.some((it) => it.id === p.id))]);
        }
        importedTasksCount = imported.tasks.length;
      }

      if (Array.isArray(imported.assignments)) {
        if (mode === 'replace') {
          setAssignments(imported.assignments);
        } else {
          setAssignments((prev) => [...imported.assignments, ...prev.filter((p) => !imported.assignments.some((ia) => ia.id === p.id))]);
        }
        importedAssignmentsCount = imported.assignments.length;
      }

      if (Array.isArray(imported.decks)) {
        if (mode === 'replace') {
          setDecks(imported.decks);
          if (imported.decks.length > 0) setActiveDeckId(imported.decks[0].id);
        } else {
          setDecks((prev) => [...imported.decks, ...prev.filter((p) => !imported.decks.some((idk) => idk.id === p.id))]);
        }
        importedDecksCount = imported.decks.length;
      }

      if (Array.isArray(imported.resources)) {
        if (mode === 'replace') {
          setResources(imported.resources);
        } else {
          setResources((prev) => [...imported.resources, ...prev.filter((p) => !imported.resources.some((ir) => ir.id === p.id))]);
        }
        importedResourcesCount = imported.resources.length;
      }

      if (Array.isArray(imported.habits)) {
        if (mode === 'replace') {
          setHabits(imported.habits);
        } else {
          setHabits((prev) => [...imported.habits, ...prev.filter((p) => !imported.habits.some((ih) => ih.id === p.id))]);
        }
        importedHabitsCount = imported.habits.length;
      }

      if (Array.isArray(imported.folders)) {
        setFolders(imported.folders);
      }

      if (Array.isArray(imported.notes)) {
        if (mode === 'replace') {
          setNotes(imported.notes);
          if (imported.notes.length > 0) setActiveNoteId(imported.notes[0].id);
        } else {
          setNotes((prev) => [...imported.notes, ...prev.filter((p) => !imported.notes.some((inote) => inote.id === p.id))]);
        }
        importedNotesCount = imported.notes.length;
      }

      triggerConfetti();
      addToast(
        `Imported successfully: ${importedTasksCount} tasks, ${importedAssignmentsCount} assignments, ${importedDecksCount} decks, ${importedNotesCount} notes!`,
        'success'
      );
      return { success: true };
    } catch (err) {
      addToast(`Import failed: ${err.message}`, 'error');
      return { success: false, error: err.message };
    }
  };

  const exportAllData = () => {
    const dataBundle = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      tasks,
      assignments,
      decks,
      resources,
      habits,
      folders,
      notes,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataBundle, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `studion_data_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast('Studion backup JSON downloaded successfully!', 'success');
  };

  return (
    <StudionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        globalSearch,
        setGlobalSearch,
        // Data Management & Reset
        dataModalOpen,
        setDataModalOpen,
        dataModalTab,
        setDataModalTab,
        openDataModal,
        resetAllData,
        restoreDefaultData,
        importData,
        exportAllData,
        // To-Do
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        // Assignments
        assignments,
        addAssignment,
        updateAssignmentProgress,
        deleteAssignment,
        // Flashcards
        decks,
        activeDeckId,
        setActiveDeckId,
        addDeck,
        addCardToDeck,
        rateCard,
        // Resources
        resources,
        addResource,
        deleteResource,
        // Habits
        habits,
        toggleHabitDay,
        addHabit,
        deleteHabit,
        // Notes
        notes,
        folders,
        setFolders,
        activeNoteId,
        setActiveNoteId,
        createNote,
        updateNote,
        deleteNote,
        togglePinNote,
        sharedVaultNotes,
        forkSharedNote,
        // Authentication
        currentUser,
        setCurrentUser,
        showAuthView,
        setShowAuthView,
        loginUser,
        signupUser,
        logoutUser,
        // Flexible Study Timer
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
        // Backwards compatibility aliases
        pomodoroOpen: timerModalOpen,
        setPomodoroOpen: setTimerModalOpen,
        pomoSecondsLeft: timerSecondsLeft,
        setPomoSecondsLeft: (val) => {
          if (typeof val === 'function') {
            setTimerSecondsLeft(val);
          } else {
            setTimerSecondsLeft(val);
          }
        },
        pomoRunning: timerRunning,
        setPomoRunning: (val) => {
          if (typeof val === 'function') {
            setTimerRunning(val);
          } else {
            setTimerRunning(val);
          }
        },
        pomoSessions: timerSessionsCompleted,
        // Toasts & feedback
        toasts,
        addToast,
        removeToast,
        triggerConfetti,
      }}
    >
      {children}
    </StudionContext.Provider>
  );
};

export const useStudion = () => {
  const context = useContext(StudionContext);
  if (!context) {
    throw new Error('useStudion must be used within a StudionProvider');
  }
  return context;
};
