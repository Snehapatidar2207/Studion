# 🎓 Studion — Student Productivity & Study Command Suite

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()
[![Storage](https://img.shields.io/badge/Storage-Persistent_LocalStorage-8A2BE2?style=for-the-badge)]()

**Studion** is an all-in-one, highly interactive student productivity web application engineered specifically for intensive academic workloads, midterm/finals preparation, and daily study discipline. 

Designed around a sleek **Deep Black (`#121212` / `#0C0D12`)** and **Vibrant Purple (`#8A2BE2`, `#9370DB`, `#D8BFD8`)** dark-mode visual hierarchy, Studion merges modern ergonomics with rich micro-animations, 3D isometric study assets, real-time assignment countdowns, 3D interactive flashcards, markdown note workspaces, and a built-in data reset and upload engine.

---

## 📌 Table of Contents

- [Live Access & Quick Start](#-live-access--quick-start)
- [Design Language & Visual System](#-design-language--visual-system)
- [Core Feature Suite](#-core-feature-suite)
  - [1. Dashboard Command Center](#1-dashboard-command-center)
  - [2. Daily Task Manager (To-Do List)](#2-daily-task-manager-to-do-list)
  - [3. Assignment & Deadline Tracker](#3-assignment--deadline-tracker)
  - [4. Interactive 3D Study Flashcards](#4-interactive-3d-study-flashcards)
  - [5. Resource & Bookmark Vault](#5-resource--bookmark-vault)
  - [6. Gamified Habit Tracker](#6-gamified-habit-tracker)
  - [7. Personal Notes Workspace](#7-personal-notes-workspace)
  - [8. Collaborative Shared Vault](#8-collaborative-shared-vault)
  - [9. Pomodoro Focus Timer](#9-pomodoro-focus-timer)
  - [10. Data & Reset Management Center](#10-data--reset-management-center)
- [Keyboard Shortcuts Cheatsheet](#-keyboard-shortcuts-cheatsheet)
- [Project Architecture & File Tree](#-project-architecture--file-tree)
- [Data Model & JSON Import Schema](#-data-model--json-import-schema)
- [Installation & Developer Setup](#-installation--developer-setup)
- [Tech Stack & Dependencies](#-tech-stack--dependencies)
- [Roadmap & Enhancements](#-roadmap--enhancements)

---

## 🚀 Live Access & Quick Start

The application runs locally on your development server:

```bash
# Clone the repository
git clone https://github.com/your-username/studion.git
cd studion

# Install dependencies
npm install

# Launch Vite development server with Hot Module Replacement (HMR)
npm run dev
```

Visit the application in your browser:
👉 **`http://localhost:5173/`**

To create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 🎨 Design Language & Visual System

Studion was crafted to minimize eye fatigue during long night study sessions while maintaining high visual energy through calibrated neon purple accents and glassmorphic elevation.

### Color Palette

| Token | Hex Code | HSL / CSS Var | Role |
| :--- | :--- | :--- | :--- |
| **Deep Black Background** | `#0C0D12` | `hsl(230, 20%, 6%)` | Core app backdrop |
| **Card Surface** | `#14151F` | `hsl(233, 20%, 10%)` | Glassmorphic cards & panels |
| **Subtle Border** | `#2A2B40` | `rgba(255, 255, 255, 0.08)` | Structural dividers & outlines |
| **Primary Vibrant Purple** | `#8A2BE2` | `hsl(271, 76%, 53%)` | Primary CTA buttons, key highlights |
| **Medium Purple Accent** | `#9370DB` | `hsl(260, 60%, 65%)` | Hover glows, active tab markers |
| **Light Thistle Purple** | `#D8BFD8` | `hsl(300, 24%, 80%)` | Secondary text, subtle badge fills |
| **Electric Cyan** | `#06B6D4` | `hsl(189, 94%, 43%)` | Flashcard accents & secondary tags |
| **Neon Amber** | `#F59E0B` | `hsl(38, 92%, 50%)` | Habit streak counters & warnings |
| **Neon Rose / Crimson** | `#F43F5E` | `hsl(350, 89%, 60%)` | Urgent deadlines (<24h), danger alerts |

### Typography
- **Primary Interface:** `Plus Jakarta Sans`, sans-serif (8 weights, high x-height for extreme legibility).
- **Secondary Display:** `Poppins` (geometric headings and hero banners).
- **Code & Timers:** `JetBrains Mono` (monospace timers, countdowns, and inline code blocks).
- **Base Font Size:** 16px (1rem) for optimal reading comfort during multi-hour review sessions.

### Custom 3D & Isometric Visual Assets
- **`hero-workspace.jpg`:** High-resolution 3D isometric study workspace featuring floating holographic books, sleek dark desk, glowing gadgets, and purple backlighting embedded in the Dashboard.
- **`student-avatar.jpg`:** High-end 3D character avatar portrait with purple gaming headphones and college hoodie in the navigation sidebar.
- **`flashcards-3d.jpg`:** 3D rendered floating study cards with quantum theory and neuroscience illustrations.

---

## ⚡ Core Feature Suite

### 1. Dashboard Command Center
- **Dynamic Time-of-Day Greeting:** Welcomes the student (`"Good Morning / Afternoon / Evening, Alex 👋"`) with current semester stats.
- **Hero Focus Hub:** One-click launch for the Pomodoro timer, task manager, flashcards, or data management.
- **Live Summary Metrics:** Real-time counters for Today's Tasks, Urgent Deadlines, Longest Active Habit Streak, and Deck review progress.
- **Quick Action Widgets:** Check off tasks directly from the dashboard or preview your weekly habit matrix.

### 2. Daily Task Manager (To-Do List)
- **Smooth Completion Micro-Animations:** Custom checkboxes with animated strike-through line transitions across completed task titles.
- **Priority Matrix Tags:** Color-coded priority pills:
  - 🔴 **High Priority:** Crimson (`#F43F5E`) with glowing border.
  - 🟡 **Medium Priority:** Amber (`#F59E0B`).
  - 🟢 **Low Priority:** Emerald (`#10B981`).
- **Comprehensive Filtering:** Filter tasks by Status (*All / Active / Completed*), Course Code (*CS 480, MATH 220, etc.*), or Category (*Academics, Assignments, Reading, Projects, Personal*).
- **Celebration Confetti:** Particle burst fireworks triggered upon completing tasks.

### 3. Assignment & Deadline Tracker
- **Real-Time Countdown Badges:** Automatically computes time remaining until due date:
  - `< 24 Hours`: Pulsing emergency badge (e.g. `12h Left (Urgent)`).
  - `1–3 Days`: Warning amber badge (e.g. `2 Days Left`).
  - `> 3 Days`: Safe purple badge.
  - `< 0 Days`: Red `Overdue` alert.
- **Syllabus Progress Sliders:** Interactive completion progress bars with quick `+25%` and `Done (100%)` toggle buttons.
- **Chronological Sorting Engine:** Sort assignments by *Earliest Due Date*, *Latest Due Date*, *Highest Progress*, or *Highest Priority*.

### 4. Interactive 3D Study Flashcards
- **Realistic 3D Card Flip:** Built with pure CSS 3D transforms (`perspective: 1200px`, `transform-style: preserve-3d`, and `backface-visibility: hidden`).
- **Keyboard Navigation:** Press **Spacebar** to flip the card, or use the **Left / Right arrow keys** to navigate cards.
- **Spaced Repetition (SR) Evaluation:** Four scientific retention buttons:
  - **Again (1m):** Resets card streak.
  - **Hard (10m):** Retains current review interval.
  - **Good (1d):** Schedules standard next interval.
  - **Easy (4d):** Increases streak multiplier and triggers confetti.
- **Deck Management:** Multi-deck switcher with card counter, shuffle mode, and custom deck builder.

### 5. Resource & Bookmark Vault
- **Categorized Study Vault:** Organizes video lectures, academic papers, documentation, and external links.
- **Rich Media Cards:** Auto-categorized badges for `Video` (YouTube), `PDF` (Lecture Slides), `Doc` (Specs), and `Link`.
- **Search & Tag Cloud:** Instant search across titles, summaries, and tags (`#algorithms`, `#calculus`, `#react`, etc.).
- **One-Click Actions:** Direct link opener, copy link with clipboard toast feedback, and resource deletion.

### 6. Gamified Habit Tracker
- **Weekly Matrix Grid:** Check off habits across Monday through Sunday.
- **Fire Streak Counter (`🔥`):** Tracks consecutive daily consistency.
- **Rankings & Badges:** Motivational tier computation (`Scholar Elite`, `Consistency Master`).
- **Custom Habits:** Add custom routines with target days per week, color coding, and tailored Lucide icons (*Brain, Droplets, BookOpen, Activity*).

### 7. Personal Notes Workspace
- **Rich-Text Formatting Toolbar:** Inline formatting for Bold, Italic, Strikethrough, Heading 1 (`#`), Heading 2 (`###`), Bullet Lists, Numbered Lists, Code Blocks (````), and Blockquotes (`>`).
- **Hierarchical Sidebar:** Folder navigation (*Computer Science, Applied Mathematics, Chemistry & Biology*) with live note counts.
- **Word & Reading Calculator:** Real-time word count and estimated reading time calculation.
- **Local Auto-Save:** Instant sync to `localStorage` with green status pulse indicator.
- **Markdown Export:** One-click export that downloads your note as a clean `.md` file to your computer.

### 8. Collaborative Shared Vault
- **Unique Shareable URLs:** Generates share links (`https://studion.app/share/note-xyz123`) with one-click clipboard copying.
- **Community Peer Feed:** Explore verified study guides created by top students from MIT, Stanford, and Oxford.
- **1-Click Workspace Fork:** Import any community guide directly into your personal workspace with one click.

### 9. Pomodoro Focus Timer
- **Header Live Chip:** Compact timer directly in the header navigation showing mode (*Focus / Break*) and `mm:ss` countdown.
- **Full Focus Modal:** Circular SVG progress ring with 25-minute Deep Work, 5-minute Short Break, and 15-minute Long Rest modes.
- **Session Tracker:** Records completed Pomodoro cycles throughout the day.

### 10. Data & Reset Management Center
- **Selective or Full Data Reset:** Clear all study records or selectively choose modules (Tasks, Assignments, Flashcards, Resources, Habits, Notes) with a confirmation guard.
- **Upload / Import Custom Data (`.json`):** Drag-and-drop or paste raw JSON. Supports both **Clean Replace** and **Merge** modes.
- **Restore Sample Demo Data:** Re-populate the application with the rich initial mock study data anytime.
- **Full Workspace Backup Export:** Download a complete JSON snapshot of your data for safe archiving or transferring between devices.

---

## ⌨️ Keyboard Shortcuts Cheatsheet

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Space</kbd> | Flip 3D Flashcard between Question and Answer | Flashcards View |
| <kbd>→</kbd> | Next Flashcard | Flashcards View |
| <kbd>←</kbd> | Previous Flashcard | Flashcards View |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Focus Global Search Bar | Global |
| <kbd>Esc</kbd> | Close active modal (Pomodoro / Data Reset / Task modal) | Global |

---

## 📂 Project Architecture & File Tree

```
c:\Projects\studion\
├── index.html                           # HTML5 entrypoint, Google Fonts, SEO metadata
├── package.json                         # Dependencies, scripts, and project metadata
├── vite.config.js                       # Vite 6 configuration with React plugin
├── tailwind.config.js                   # Custom Studion theme, glow shadows, animations
├── postcss.config.js                    # PostCSS pipeline with Tailwind and Autoprefixer
├── public/
│   └── assets/                          # Generated 3D isometric artwork & avatars
│       ├── hero-workspace.jpg           # 3D study desk isometric illustration
│       ├── student-avatar.jpg           # 3D student character portrait
│       └── flashcards-3d.jpg            # 3D interactive flashcards render
├── src/
│   ├── main.jsx                         # React 19 root mount & StrictMode wrapper
│   ├── App.jsx                          # MainLayout, global glow mesh, modals mount
│   ├── index.css                        # Glassmorphism, 3D flip card utilities, scrollbar
│   ├── context/
│   │   └── StudionContext.jsx           # Unified state management & localStorage sync
│   ├── data/
│   │   └── mockData.js                  # Initial rich dataset for all 7 modules
│   └── components/
│       ├── common/
│       │   ├── Sidebar.jsx              # Collapsible navigation, badges, profile card
│       │   ├── Header.jsx               # Global search, Pomodoro chip, Quick Add, Reset
│       │   ├── PomodoroModal.jsx        # SVG circular focus timer modal
│       │   ├── DataManagementModal.jsx  # Wipe data, upload JSON, backup export modal
│       │   └── ToastContainer.jsx       # Floating notifications with neon accents
│       ├── dashboard/
│       │   └── DashboardView.jsx        # Command center, 3D hero, urgent deadlines
│       ├── todo/
│       │   └── TodoView.jsx             # Task manager, priority tags, strike-through
│       ├── assignments/
│       │   └── AssignmentsView.jsx      # Countdown timers, progress sliders, sort
│       ├── flashcards/
│       │   └── FlashcardsView.jsx       # 3D flip cards, spaced repetition rating
│       ├── resources/
│       │   └── ResourcesView.jsx        # Categorized vault, thumbnails, link copy
│       ├── habits/
│       │   └── HabitsView.jsx           # Gamified 7-day grid, fire streaks
│       └── notes/
│           └── NotesView.jsx            # Rich editor, folders, tags, shared vault
```

---

## 📦 Data Model & JSON Import Schema

When uploading custom data via the **Reset / Upload Data** modal, you can upload a `.json` file formatted according to the following structure:

```json
{
  "tasks": [
    {
      "id": "task-custom-1",
      "title": "Review Distributed Systems Paxos Consensus",
      "course": "CS 340",
      "priority": "High",
      "category": "Academics",
      "dueDate": "2026-10-15",
      "estimatedMinutes": 45,
      "completed": false
    }
  ],
  "assignments": [
    {
      "id": "asg-custom-1",
      "title": "Machine Learning: ResNet Image Classification",
      "course": "CS 482",
      "dueDate": "2026-10-20T23:59:00",
      "progress": 30,
      "weight": "25%",
      "priority": "High",
      "type": "Programming Project",
      "description": "Train and evaluate a deep residual network on CIFAR-100.",
      "status": "In Progress"
    }
  ],
  "decks": [
    {
      "id": "deck-custom-1",
      "name": "Data Structures & Algorithms",
      "category": "Computer Science",
      "color": "#8A2BE2",
      "cards": [
        {
          "id": "card-custom-1",
          "front": "What is the average time complexity of QuickSelect?",
          "back": "O(N) average time. O(N^2) worst case if partition is unbalanced.",
          "difficulty": "Good",
          "streak": 3
        }
      ]
    }
  ],
  "resources": [
    {
      "id": "res-custom-1",
      "title": "MIT 6.006: Dynamic Programming Lecture",
      "type": "Video",
      "category": "Computer Science",
      "url": "https://youtube.com",
      "thumbnail": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
      "description": "Optimal substructure and memoization techniques.",
      "tags": ["algorithms", "dp", "mit"]
    }
  ],
  "habits": [
    {
      "id": "habit-custom-1",
      "name": "Deep Work (90 Mins)",
      "category": "Study",
      "icon": "Brain",
      "color": "#8A2BE2",
      "targetDaysPerWeek": 6,
      "streak": 10,
      "completedDays": [true, true, true, true, true, true, true]
    }
  ],
  "notes": [
    {
      "id": "note-custom-1",
      "title": "Attention Is All You Need (Transformer Architecture)",
      "folder": "Computer Science",
      "tags": ["NLP", "Transformers"],
      "pinned": true,
      "lastEdited": "2026-09-27T10:00:00",
      "content": "# Transformers\n\nSelf-attention replaces recurrence entirely."
    }
  ]
}
```

---

## 🛠️ Installation & Developer Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **Package Manager:** `npm` (v9+) or `yarn` / `pnpm`

### Step-by-Step Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/studion.git
   cd studion
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build the production package:
   ```bash
   npm run build
   ```
5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🧰 Tech Stack & Dependencies

| Layer | Library / Tool | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | `^19.2.8` | Component architecture & modern hooks |
| **Bundler** | [Vite](https://vitejs.dev/) | `^6.2.0` | Ultra-fast HMR and build compilation |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.17` | Utility-first responsive dark-mode styling |
| **PostCSS** | [PostCSS](https://postcss.org/) & [Autoprefixer](https://github.com/postcss/autoprefixer) | `^8.5.28` | CSS vendor prefixing & optimization |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.48.0` | Modern, clean vector iconography |
| **Feedback FX** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | `^1.9.4` | Particle celebration physics |
| **Utilities** | [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) | `^2.1.1` | Dynamic className composition |

---

## 🗺️ Roadmap & Enhancements

- [ ] **GPA & Grade Calculator:** Interactive syllabus grade weighting simulator with letter grade forecasting.
- [ ] **Lofi Study Radio & Ambient Audio:** Integrated audio player with binaural beats, rain sounds, and chill lofi streams.
- [ ] **Google Calendar / iCal Sync:** Automatic two-way synchronization for university course timetables.
- [ ] **Canvas / Blackboard LMS Integration:** Direct assignment sync from academic portals.
- [ ] **LaTeX Math Rendering:** Native KaTeX integration for math and physics note formulas.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute for personal or academic purposes.

*Created with 💜 for students worldwide.*
