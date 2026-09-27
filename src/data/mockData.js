// Clean initial empty state for Studion - ready for student's own data
export const initialTasks = [];
export const initialAssignments = [];
export const initialDecks = [];
export const initialResources = [];
export const initialHabits = [];
export const initialFolders = [];
export const initialNotes = [];
export const initialSharedVaultNotes = [];

// Optional sample templates if a student explicitly chooses to restore demo data via Data Management Modal
export const sampleStudyDataset = {
  tasks: [
    {
      id: 'task-1',
      title: 'Review Machine Learning lecture notes (Backprop & SGD)',
      course: 'CS 480',
      priority: 'High',
      category: 'Academics',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      estimatedMinutes: 45,
      completed: false,
    },
    {
      id: 'task-2',
      title: 'Submit Lab 4: Distributed Systems consensus algorithm',
      course: 'CS 340',
      priority: 'High',
      category: 'Assignments',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      estimatedMinutes: 90,
      completed: false,
    },
    {
      id: 'task-3',
      title: 'Solve Calculus Problem Set 7 (Differential Equations)',
      course: 'MATH 220',
      priority: 'Medium',
      category: 'Academics',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      estimatedMinutes: 60,
      completed: false,
    }
  ],
  assignments: [
    {
      id: 'asg-1',
      title: 'Operating Systems: Kernel Threads & Memory Virtualization',
      course: 'CS 320',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      progress: 60,
      weight: '15%',
      priority: 'High',
      type: 'Programming Project',
      description: 'Implement user-level threading library with cooperative multitasking and virtual page table simulation.',
      status: 'In Progress'
    },
    {
      id: 'asg-2',
      title: 'Organic Chemistry II: Synthesis Pathway Final Report',
      course: 'CHEM 230',
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      progress: 30,
      weight: '20%',
      priority: 'High',
      type: 'Lab Report',
      description: 'Spectroscopy analysis of aromatic carbonyls and synthesis pathway documentation with mechanistic arrows.',
      status: 'In Progress'
    }
  ],
  decks: [
    {
      id: 'deck-1',
      name: 'Data Structures & Algorithms',
      category: 'Computer Science',
      color: '#8A2BE2',
      cards: [
        {
          id: 'c-1',
          front: 'What is the amortized time complexity of inserting into a dynamic array (std::vector)?',
          back: 'O(1) amortized. Resizing requires copying N elements taking O(N) work, but doubling ensures average cost is O(1).',
          difficulty: 'Good',
          streak: 2
        }
      ]
    }
  ],
  resources: [
    {
      id: 'res-1',
      title: 'MIT 6.006: Introduction to Algorithms Lecture Series',
      type: 'Video',
      category: 'Computer Science',
      url: 'https://ocw.mit.edu',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
      description: 'Comprehensive video lectures covering sorting, balanced search trees, graph traversal, and dynamic programming.',
      tags: ['algorithms', 'mit', 'trees', 'dp'],
      addedDate: new Date().toISOString().split('T')[0]
    }
  ],
  habits: [
    {
      id: 'h-1',
      name: 'Deep Work (90 Mins)',
      category: 'Study',
      icon: 'Brain',
      color: '#8A2BE2',
      targetDaysPerWeek: 6,
      streak: 1,
      completedDays: [true, false, false, false, false, false, false]
    }
  ],
  folders: [
    { id: 'f-1', name: 'General', count: 0, icon: 'Folder' }
  ],
  notes: []
};
