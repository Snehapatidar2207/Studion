import React, { useState, useRef } from 'react';
import {
  X,
  RotateCcw,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  FileJson,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  HardDrive
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const DataManagementModal = () => {
  const {
    dataModalOpen,
    setDataModalOpen,
    dataModalTab,
    setDataModalTab,
    resetAllData,
    restoreDefaultData,
    importData,
    exportAllData,
    tasks,
    assignments,
    decks,
    resources,
    habits,
    notes
  } = useStudion();

  const fileInputRef = useRef(null);

  // Reset tab options
  const [resetOptions, setResetOptions] = useState({
    tasks: true,
    assignments: true,
    decks: true,
    resources: true,
    habits: true,
    notes: true,
  });
  const [confirmWipeOpen, setConfirmWipeOpen] = useState(false);

  // Upload tab states
  const [uploadMode, setUploadMode] = useState('replace'); // 'replace' | 'merge'
  const [parsedUploadData, setParsedUploadData] = useState(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [rawJsonInput, setRawJsonInput] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!dataModalOpen) return null;

  // Toggle reset checkbox
  const toggleResetOption = (key) => {
    setResetOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAllReset = () => {
    setResetOptions({
      tasks: true,
      assignments: true,
      decks: true,
      resources: true,
      habits: true,
      notes: true,
    });
  };

  const handleExecuteReset = () => {
    resetAllData(resetOptions);
    setConfirmWipeOpen(false);
    setDataModalOpen(false);
  };

  const handleRestoreDemo = () => {
    restoreDefaultData();
    setDataModalOpen(false);
  };

  // File upload handler
  const handleFileChange = (e) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setParsedUploadData(json);
        setRawJsonInput(JSON.stringify(json, null, 2));
      } catch (err) {
        setUploadError(`Failed to parse JSON file: ${err.message}`);
        setParsedUploadData(null);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyUpload = () => {
    let dataToImport = parsedUploadData;
    if (!dataToImport && rawJsonInput.trim()) {
      try {
        dataToImport = JSON.parse(rawJsonInput.trim());
      } catch (err) {
        setUploadError(`Invalid JSON in text box: ${err.message}`);
        return;
      }
    }

    if (!dataToImport) {
      setUploadError('Please select a JSON file or paste valid JSON.');
      return;
    }

    const res = importData(dataToImport, uploadMode);
    if (res.success) {
      setDataModalOpen(false);
      setParsedUploadData(null);
      setUploadFileName('');
      setRawJsonInput('');
    }
  };

  // Sample JSON template for user reference
  const sampleTemplate = {
    tasks: [
      {
        id: "task-custom-1",
        title: "Review Quantum Physics Ch. 3",
        course: "PHYS 301",
        priority: "High",
        category: "Academics",
        dueDate: "2026-10-05",
        estimatedMinutes: 60,
        completed: false
      }
    ],
    assignments: [
      {
        id: "asg-custom-1",
        title: "Database System Design Project",
        course: "CS 350",
        dueDate: "2026-10-10T23:59:00",
        progress: 20,
        weight: "25%",
        priority: "High",
        type: "Programming Project",
        description: "Implement B+ Tree indexing and SQL query planner.",
        status: "In Progress"
      }
    ],
    decks: [
      {
        id: "deck-custom-1",
        name: "Computer Networks & Sockets",
        category: "Computer Science",
        color: "#8A2BE2",
        cards: [
          {
            id: "c-custom-1",
            front: "What is the function of the TCP 3-way handshake?",
            back: "SYN, SYN-ACK, ACK. Synchronizes sequence numbers and establishes a reliable two-way connection.",
            difficulty: "Good",
            streak: 2
          }
        ]
      }
    ],
    notes: [
      {
        id: "note-custom-1",
        title: "Operating Systems Virtual Memory",
        folder: "Computer Science",
        tags: ["OS", "Memory"],
        pinned: true,
        lastEdited: "2026-09-27T10:00:00",
        content: "# Virtual Memory\n\nPage tables, TLB caching, and demand paging."
      }
    ]
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleTemplate, null, 2));
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12131f] border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#202236] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
                <span>Data & Reset Management</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Cloud / Local
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Remove existing data, upload new custom study data, or backup your workspace.
              </p>
            </div>
          </div>

          <button
            onClick={() => setDataModalOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1c1d2e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#202236] bg-[#151624] px-6">
          <button
            onClick={() => {
              setDataModalTab('reset');
              setConfirmWipeOpen(false);
            }}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all ${
              dataModalTab === 'reset'
                ? 'border-rose-500 text-rose-300 bg-rose-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Reset Data</span>
          </button>

          <button
            onClick={() => {
              setDataModalTab('upload');
              setConfirmWipeOpen(false);
            }}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all ${
              dataModalTab === 'upload'
                ? 'border-purple-500 text-purple-300 bg-purple-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Upload className="w-4 h-4 text-purple-400" />
            <span>Upload New Data</span>
          </button>

          <button
            onClick={() => {
              setDataModalTab('export');
              setConfirmWipeOpen(false);
            }}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all ${
              dataModalTab === 'export'
                ? 'border-cyan-500 text-cyan-300 bg-cyan-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Backup / Export</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: RESET DATA */}
          {dataModalTab === 'reset' && (
            <div className="space-y-6">
              {/* Warning Notice */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-200 leading-relaxed">
                  <strong className="font-bold text-white block mb-0.5">
                    Clear Workspace Data
                  </strong>
                  Resetting removes your current study records from your browser storage so you can start completely fresh or upload brand new data.
                </div>
              </div>

              {/* Module Checkboxes */}
              <div className="p-4 rounded-2xl bg-[#171828] border border-[#27293d] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#212338]">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Select Data to Remove:
                  </span>
                  <button
                    onClick={selectAllReset}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300"
                  >
                    Select All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1d1f33] border border-[#2b2d45] cursor-pointer hover:border-purple-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={resetOptions.tasks}
                      onChange={() => toggleResetOption('tasks')}
                      className="w-4 h-4 rounded text-rose-600 bg-[#25273d] border-[#383a54] focus:ring-rose-500"
                    />
                    <div className="text-xs text-gray-200">
                      <span className="font-bold">Tasks</span> ({tasks.length})
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1d1f33] border border-[#2b2d45] cursor-pointer hover:border-purple-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={resetOptions.assignments}
                      onChange={() => toggleResetOption('assignments')}
                      className="w-4 h-4 rounded text-rose-600 bg-[#25273d] border-[#383a54] focus:ring-rose-500"
                    />
                    <div className="text-xs text-gray-200">
                      <span className="font-bold">Assignments</span> ({assignments.length})
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1d1f33] border border-[#2b2d45] cursor-pointer hover:border-purple-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={resetOptions.decks}
                      onChange={() => toggleResetOption('decks')}
                      className="w-4 h-4 rounded text-rose-600 bg-[#25273d] border-[#383a54] focus:ring-rose-500"
                    />
                    <div className="text-xs text-gray-200">
                      <span className="font-bold">Flashcards</span> ({decks.length})
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1d1f33] border border-[#2b2d45] cursor-pointer hover:border-purple-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={resetOptions.resources}
                      onChange={() => toggleResetOption('resources')}
                      className="w-4 h-4 rounded text-rose-600 bg-[#25273d] border-[#383a54] focus:ring-rose-500"
                    />
                    <div className="text-xs text-gray-200">
                      <span className="font-bold">Resources</span> ({resources.length})
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1d1f33] border border-[#2b2d45] cursor-pointer hover:border-purple-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={resetOptions.habits}
                      onChange={() => toggleResetOption('habits')}
                      className="w-4 h-4 rounded text-rose-600 bg-[#25273d] border-[#383a54] focus:ring-rose-500"
                    />
                    <div className="text-xs text-gray-200">
                      <span className="font-bold">Habits</span> ({habits.length})
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1d1f33] border border-[#2b2d45] cursor-pointer hover:border-purple-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={resetOptions.notes}
                      onChange={() => toggleResetOption('notes')}
                      className="w-4 h-4 rounded text-rose-600 bg-[#25273d] border-[#383a54] focus:ring-rose-500"
                    />
                    <div className="text-xs text-gray-200">
                      <span className="font-bold">Notes</span> ({notes.length})
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {!confirmWipeOpen ? (
                  <button
                    onClick={() => setConfirmWipeOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-all active:scale-95"
                    id="trigger-confirm-reset-btn"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove Selected Data</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 space-y-3 animate-in zoom-in-95 duration-150">
                    <p className="text-xs text-rose-200 font-semibold text-center">
                      ⚠️ Are you completely sure? This action will permanently wipe the selected items.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setConfirmWipeOpen(false)}
                        className="px-4 py-2 rounded-xl bg-[#1d1f33] hover:bg-[#282a45] text-gray-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleExecuteReset}
                        className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-glow-sm"
                        id="final-confirm-reset-btn"
                      >
                        Yes, Wipe Data Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Option to Restore Demo Data */}
                <div className="pt-4 border-t border-[#202236] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-gray-400">
                    Want to reload rich sample courses, flashcards, & notes?
                  </div>
                  <button
                    onClick={handleRestoreDemo}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1c1d30] hover:bg-[#25273f] text-purple-300 hover:text-white text-xs font-bold border border-purple-500/30 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore Sample Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD / IMPORT DATA */}
          {dataModalTab === 'upload' && (
            <div className="space-y-5">
              <div className="text-xs text-gray-300 leading-relaxed">
                Upload a JSON file containing your tasks, assignments, flashcards, resources, or notes. You can choose to replace existing data or merge them together.
              </div>

              {/* Import Mode: Replace vs Merge */}
              <div className="flex items-center gap-3 p-1.5 bg-[#171828] border border-[#27293d] rounded-2xl">
                <button
                  onClick={() => setUploadMode('replace')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    uploadMode === 'replace'
                      ? 'bg-purple-600 text-white shadow-glow-sm'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Clean Replace (Wipe Old & Load New)
                </button>
                <button
                  onClick={() => setUploadMode('merge')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    uploadMode === 'merge'
                      ? 'bg-purple-600 text-white shadow-glow-sm'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Merge (Append to Current Data)
                </button>
              </div>

              {/* Drag and drop / file selector */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-3xl p-8 text-center bg-[#161726]/60 hover:bg-[#1a1b2d] cursor-pointer transition-all group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="json-file-input"
                />
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {uploadFileName ? uploadFileName : 'Click to Browse or Drop a .JSON File Here'}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Supports full Studion data backup format or modular arrays
                </p>
              </div>

              {/* Parsed Preview if available */}
              {parsedUploadData && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      Detected: {parsedUploadData.tasks?.length || 0} tasks •{' '}
                      {parsedUploadData.assignments?.length || 0} assignments •{' '}
                      {parsedUploadData.decks?.length || 0} decks •{' '}
                      {parsedUploadData.notes?.length || 0} notes
                    </span>
                  </div>
                  <span className="font-bold uppercase tracking-wider text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>
              )}

              {/* Error display */}
              {uploadError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {uploadError}
                </div>
              )}

              {/* Direct JSON text box toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-300">Or Paste Raw JSON Below:</span>
                  <button
                    onClick={handleCopyTemplate}
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-[11px] font-semibold"
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplate ? 'Copied Template!' : 'Copy Sample Template'}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={rawJsonInput}
                  onChange={(e) => {
                    setRawJsonInput(e.target.value);
                    setUploadError('');
                  }}
                  placeholder='{"tasks": [...], "assignments": [...], "notes": [...]}'
                  className="w-full px-3.5 py-2.5 bg-[#171828] border border-[#27293d] rounded-xl text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* Upload CTA Button */}
              <button
                onClick={handleApplyUpload}
                id="apply-upload-btn"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Upload & Apply Data Now</span>
              </button>
            </div>
          )}

          {/* TAB 3: BACKUP / EXPORT */}
          {dataModalTab === 'export' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
                <strong className="font-bold text-white block mb-0.5">
                  Export Workspace Backup
                </strong>
                Download all your tasks, assignments, flashcards, bookmarks, habits, and notes as a clean `.json` file to restore or transfer anytime.
              </div>

              {/* Data Summary */}
              <div className="p-4 rounded-2xl bg-[#171828] border border-[#27293d] space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#212338] text-gray-400">
                  <span>To-Do Tasks:</span>
                  <span className="font-bold text-white">{tasks.length} items</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#212338] text-gray-400">
                  <span>Assignments & Deadlines:</span>
                  <span className="font-bold text-white">{assignments.length} items</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#212338] text-gray-400">
                  <span>Flashcard Decks:</span>
                  <span className="font-bold text-white">{decks.length} decks</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#212338] text-gray-400">
                  <span>Resource Vault:</span>
                  <span className="font-bold text-white">{resources.length} resources</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#212338] text-gray-400">
                  <span>Habit Trackers:</span>
                  <span className="font-bold text-white">{habits.length} habits</span>
                </div>
                <div className="flex items-center justify-between py-1 text-gray-400">
                  <span>Study Notes:</span>
                  <span className="font-bold text-white">{notes.length} notes</span>
                </div>
              </div>

              {/* Download CTA */}
              <button
                onClick={exportAllData}
                id="download-backup-btn"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Full JSON Backup</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#202236] bg-[#0f1019] flex items-center justify-between text-xs text-gray-500">
          <span>Studion Data Engine v1.0 • Client-Side Encrypted Storage</span>
          <button
            onClick={() => setDataModalOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-[#1b1d2e] hover:bg-[#25273d] text-gray-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
