import React, { useState, useRef } from 'react';
import {
  FileText,
  Plus,
  Folder,
  Tag,
  Pin,
  Share2,
  Download,
  Trash2,
  Copy,
  Check,
  Search,
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
  Sparkles,
  ExternalLink,
  Users,
  Eye,
  BookOpen
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const NotesView = () => {
  const {
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
    addToast,
    triggerConfetti
  } = useStudion();

  // Mode: 'workspace' or 'sharedVault'
  const [activeTabMode, setActiveTabMode] = useState('workspace');
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active note
  const currentNote = notes.find((n) => n.id === activeNoteId) || notes[0];
  const editorRef = useRef(null);

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'All' || note.folder === selectedFolder;
    const matchesTag = selectedTag === 'All' || note.tags.includes(selectedTag);
    return matchesSearch && matchesFolder && matchesTag;
  });

  // Unique tags
  const allTags = ['All', ...new Set(notes.flatMap((n) => n.tags))];

  // Word count & Reading time
  const wordCount = currentNote?.content
    ? currentNote.content.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Toolbar action helpers
  const insertFormatting = (prefix, suffix = '') => {
    if (!currentNote) return;
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = currentNote.content.substring(start, end);
    const replacement = `${prefix}${selectedText || 'Text'}${suffix}`;

    const newContent =
      currentNote.content.substring(0, start) +
      replacement +
      currentNote.content.substring(end);

    updateNote(currentNote.id, { content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 4)
      );
    }, 50);
  };

  // Export handlers
  const handleExportMarkdown = () => {
    if (!currentNote) return;
    const blob = new Blob([currentNote.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentNote.title.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast(`Exported "${currentNote.title}.md"`, 'success');
  };

  const handleCopyShareLink = () => {
    if (!currentNote) return;
    const shareUrl = `https://studion.app/share/${currentNote.shareId || 'note-x98'}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    addToast('Shareable link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    const newFolder = {
      id: `f-${Date.now()}`,
      name: newFolderName.trim(),
      count: 0,
      icon: 'Folder'
    };
    setFolders((prev) => [...prev, newFolder]);
    setSelectedFolder(newFolder.name);
    setNewFolderName('');
    setIsNewFolderModalOpen(false);
    addToast(`Created folder "${newFolder.name}"`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Header & Tab Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-purple-400" />
            <span>Study Notes & Personal Workspace</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Capture rich lectures, organize by course folders, and share notes with study groups.
          </p>
        </div>

        {/* Tab switcher: Personal Workspace vs Shared Notes Vault */}
        <div className="flex items-center p-1 bg-[#151624] border border-[#27293d] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTabMode('workspace')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabMode === 'workspace'
                ? 'bg-purple-600 text-white shadow-glow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Workspace</span>
          </button>
          <button
            onClick={() => setActiveTabMode('sharedVault')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabMode === 'sharedVault'
                ? 'bg-purple-600 text-white shadow-glow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Shared Vault</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
              Community
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: PERSONAL WORKSPACE */}
      {activeTabMode === 'workspace' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[650px]">
          {/* Notes Sidebar: Folders, Tags & Notes List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search and Action */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full pl-9 pr-3 py-2 bg-[#141524] border border-[#26283d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>
              <button
                onClick={() => createNote(selectedFolder !== 'All' ? selectedFolder : 'Computer Science')}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-glow-sm transition-all"
                title="New Note"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Folder Filter Bar */}
            <div className="p-3 rounded-2xl bg-[#141524] border border-[#25273d] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-purple-400" />
                  Folders
                </span>
                <button
                  onClick={() => setIsNewFolderModalOpen(true)}
                  className="text-purple-400 hover:text-purple-300 text-[11px] font-bold"
                >
                  + New
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedFolder('All')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedFolder === 'All'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                      : 'text-gray-400 hover:text-white bg-[#191a2c]'
                  }`}
                >
                  All ({notes.length})
                </button>
                {folders.map((f) => {
                  const count = notes.filter((n) => n.folder === f.name).length;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFolder(f.name)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        selectedFolder === f.name
                          ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                          : 'text-gray-400 hover:text-white bg-[#191a2c]'
                      }`}
                    >
                      {f.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes List Cards */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-10 px-4 rounded-xl bg-[#12131f] border border-[#23253b] space-y-2">
                  <FileText className="w-8 h-8 text-purple-400/40 mx-auto" />
                  <p className="text-xs font-semibold text-gray-300">No notes yet</p>
                  <p className="text-[11px] text-gray-500">Click &quot;+ New Note&quot; to write your first lecture note.</p>
                </div>
              ) : (
                filteredNotes.map((note) => {
                  const isActive = note.id === currentNote?.id;
                  const formattedDate = new Date(note.lastEdited).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <div
                      key={note.id}
                      onClick={() => setActiveNoteId(note.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-purple-600/15 border-purple-500/50 shadow-glow-sm'
                          : 'bg-[#151624] border-[#25273d] hover:border-purple-500/30 hover:bg-[#18192a]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={`text-xs font-bold truncate leading-snug ${
                            isActive ? 'text-purple-300' : 'text-gray-200 group-hover:text-white'
                          }`}
                        >
                          {note.title}
                        </h4>
                        {note.pinned && (
                          <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0 fill-current" />
                        )}
                      </div>

                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                        {note.content.replace(/^#+\s/gm, '')}
                      </p>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1f2134] text-[10px] text-gray-500">
                        <span className="text-purple-400 font-semibold">{note.folder}</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Main Rich Text Editor (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl bg-[#141524] border border-[#25273d] shadow-xl overflow-hidden">
            {currentNote ? (
              <>
                {/* Editor Header: Title & Actions */}
                <div className="p-4 sm:p-5 border-b border-[#212338] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      value={currentNote.title}
                      onChange={(e) => updateNote(currentNote.id, { title: e.target.value })}
                      placeholder="Note Title..."
                      className="text-lg sm:text-xl font-extrabold text-white bg-transparent border-none focus:outline-none flex-1 placeholder-gray-600"
                    />

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => togglePinNote(currentNote.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          currentNote.pinned
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                            : 'bg-[#191a2c] border-[#292b42] text-gray-400 hover:text-white'
                        }`}
                        title="Pin Note"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all"
                        title="Share Note"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>

                      <button
                        onClick={handleExportMarkdown}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#191a2c] hover:bg-[#202236] border border-[#292b42] text-gray-300 text-xs font-semibold transition-all"
                        title="Download Markdown"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export</span>
                      </button>

                      <button
                        onClick={() => deleteNote(currentNote.id)}
                        className="p-2 rounded-xl bg-[#191a2c] hover:bg-rose-500/20 border border-[#292b42] text-gray-400 hover:text-rose-400 transition-colors"
                        title="Delete Note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata Row: Folder, Tags, Reading time */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1 bg-[#1a1b2d] px-2.5 py-1 rounded-lg border border-[#2b2d45] text-purple-300 font-medium">
                      <Folder className="w-3 h-3 text-purple-400" />
                      {currentNote.folder}
                    </span>

                    <span className="text-[11px] text-gray-400">
                      {wordCount} words • ~{readingTimeMinutes} min read
                    </span>

                    <span className="text-[11px] text-emerald-400/90 flex items-center gap-1 ml-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Auto-saved
                    </span>
                  </div>
                </div>

                {/* Rich Formatting Toolbar */}
                <div className="px-4 py-2 bg-[#171828] border-b border-[#212338] flex flex-wrap items-center gap-1">
                  <button
                    onClick={() => insertFormatting('**', '**')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertFormatting('*', '*')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertFormatting('~~', '~~')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Strikethrough"
                  >
                    <Strikethrough className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-4 w-[1px] bg-[#27293d] mx-1" />

                  <button
                    onClick={() => insertFormatting('# ')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Heading 1"
                  >
                    <Heading1 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertFormatting('### ')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Heading 2"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-4 w-[1px] bg-[#27293d] mx-1" />

                  <button
                    onClick={() => insertFormatting('- ')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertFormatting('1. ')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertFormatting('```\n', '\n```')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Code Block"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertFormatting('> ')}
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#222438]"
                    title="Quote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Editor Textarea */}
                <div className="p-5 flex-1 flex flex-col">
                  <textarea
                    ref={editorRef}
                    value={currentNote.content}
                    onChange={(e) => updateNote(currentNote.id, { content: e.target.value })}
                    placeholder="Write detailed lecture notes, code snippets, or formulas..."
                    className="w-full h-full min-h-[420px] bg-transparent text-gray-100 placeholder-gray-600 text-sm leading-relaxed font-sans focus:outline-none resize-none font-normal"
                  />
                </div>
              </>
            ) : (
              <div className="m-auto text-center p-12 space-y-4">
                <FileText className="w-14 h-14 text-purple-400/40 mx-auto" />
                <h3 className="text-lg font-bold text-white">Your study workspace is clean</h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
                  Take markdown lecture notes, organize by course, write code blocks, and export to PDF/Markdown.
                </p>
                <button
                  onClick={() => createNote()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all"
                >
                  + Create First Note
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: SHARED NOTES VAULT (COMMUNITY & COLLABORATION) */}
      {activeTabMode === 'sharedVault' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#151624] to-[#12131f] border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/15 px-3 py-1 rounded-full border border-purple-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Peer-to-Peer Study Collaboration
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Collaborative Student Study Vault
              </h2>
              <p className="text-xs text-gray-300 max-w-xl mt-1">
                Browse verified high-yield study guides created by top students at MIT, Stanford, and Oxford. Fork any guide directly into your personal workspace with one click!
              </p>
            </div>
            <button
              onClick={() => {
                if (currentNote) {
                  setIsShareModalOpen(true);
                } else {
                  setActiveTabMode('workspace');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-sm transition-all"
            >
              Share One of My Notes
            </button>
          </div>

          {/* Shared Vault Notes Grid */}
          {sharedVaultNotes.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-[#141524] border border-[#23253b] space-y-3">
              <Sparkles className="w-12 h-12 text-purple-400/40 mx-auto" />
              <h3 className="text-base font-bold text-white">No community notes shared yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Share your lecture notes with your classmates or study group using the Share button.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sharedVaultNotes.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between p-5 rounded-2xl bg-[#141524] border border-[#25273d] hover:border-purple-500/50 hover:shadow-glow-sm transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-gray-500">{item.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#202236] space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.authorAvatar}
                          alt={item.author}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-purple-500/40"
                        />
                        <span className="text-[11px] font-medium text-gray-300">{item.author}</span>
                      </div>
                      <span className="text-[10px] text-purple-300">♥ {item.likes}</span>
                    </div>

                    <button
                      onClick={() => forkSharedNote(item)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#1d1f33] hover:bg-purple-600/30 text-purple-300 hover:text-white text-xs font-bold border border-purple-500/30 transition-all shadow-sm active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Copy to My Workspace</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && currentNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#23253b]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-400" />
                Share Study Note
              </h2>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-xs text-gray-300 mb-1">
                Anyone with this unique link can view and duplicate &quot;{currentNote.title}&quot;:
              </p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  readOnly
                  value={`https://studion.app/share/${currentNote.shareId}`}
                  className="flex-1 px-3 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs text-purple-300 font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-glow-sm"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#191a2c] border border-[#282a3f] text-xs text-gray-400 space-y-1">
              <span className="font-semibold text-gray-200 block">Collaboration Options</span>
              <p>• Read-only preview with one-click Markdown fork</p>
              <p>• Compatible with Notion, Obsidian, and Studion Mobile</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#1e2033] hover:bg-[#282a40] text-gray-300 text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {isNewFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Folder className="w-4 h-4 text-purple-400" />
              Create Study Folder
            </h2>
            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                required
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. Neuroscience & AI"
                className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/60"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-glow-sm"
                >
                  Add Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
