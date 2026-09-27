import React, { useState } from 'react';
import {
  Bookmark,
  Plus,
  ExternalLink,
  Copy,
  Trash2,
  Video,
  FileText,
  Link2,
  Tag,
  Search,
  Filter,
  Check,
  FolderArchive
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const ResourcesView = () => {
  const { resources, addResource, deleteResource, addToast } = useStudion();

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('Link');
  const [category, setCategory] = useState('Computer Science');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const categories = ['All', 'Computer Science', 'Mathematics', 'Artificial Intelligence'];
  const resourceTypes = ['All', 'Video', 'PDF', 'Link', 'Doc'];

  // Filter resources
  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = activeCategory === 'All' || res.category === activeCategory;
    const matchesType = activeType === 'All' || res.type === activeType;
    return matchesSearch && matchesCat && matchesType;
  });

  const handleCopy = (id, linkUrl) => {
    navigator.clipboard.writeText(linkUrl);
    setCopiedId(id);
    addToast('Resource link copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const defaultThumbs = {
      Video: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
      PDF: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
      Link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60',
      Doc: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60',
    };

    addResource({
      title: title.trim(),
      url: url.trim(),
      type,
      category,
      description: description.trim() || 'Saved study reference and documentation.',
      tags: tagsInput
        ? tagsInput.split(',').map((t) => t.trim().replace(/^#/, ''))
        : ['study'],
      thumbnail: thumbnail.trim() || defaultThumbs[type] || defaultThumbs.Link,
    });

    setTitle('');
    setUrl('');
    setDescription('');
    setTagsInput('');
    setThumbnail('');
    setIsModalOpen(false);
  };

  const getTypeIcon = (resType) => {
    switch (resType) {
      case 'Video':
        return <Video className="w-3.5 h-3.5 text-rose-400" />;
      case 'PDF':
        return <FileText className="w-3.5 h-3.5 text-red-400" />;
      case 'Doc':
        return <FolderArchive className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Link2 className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-purple-400" />
            <span>Resource & Bookmark Vault</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Curate lecture slides, YouTube tutorials, research PDFs, and documentation in one organized vault.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          id="add-resource-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Save Resource</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-[#131422] border border-[#23253b] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by title, description, or #tag..."
              className="w-full pl-10 pr-4 py-2 bg-[#1a1b2d] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center p-1 bg-[#1a1b2d] rounded-xl border border-[#2c2e47] self-start md:self-auto">
            {resourceTypes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === t
                    ? 'bg-purple-600 text-white shadow-glow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1f2135]">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-purple-400" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50 shadow-glow-sm'
                  : 'bg-[#18192a] text-gray-400 hover:text-gray-200 border border-[#292b40]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl bg-[#141524] border border-[#25273d] hover:border-purple-500/50 hover:shadow-glow-sm transition-all duration-300 group"
          >
            {/* Card Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden bg-[#1a1b2d]">
              <img
                src={res.thumbnail}
                alt={res.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141524] via-transparent to-black/30" />

              {/* Type Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold">
                {getTypeIcon(res.type)}
                <span>{res.type}</span>
              </div>

              {/* Category Pill */}
              <div className="absolute top-3 right-3 text-[10px] font-semibold text-purple-300 bg-purple-950/70 backdrop-blur-md px-2 py-0.5 rounded border border-purple-500/30">
                {res.category}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {res.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-gray-400 bg-[#1c1d2e] px-2 py-0.5 rounded border border-[#2a2c42]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-4 py-3 border-t border-[#202236] bg-[#12131f]/60 flex items-center justify-between">
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(res.id, res.url)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2134] transition-colors"
                  title="Copy link"
                >
                  {copiedId === res.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => deleteResource(res.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete from vault"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 bg-[#141524] border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#23253b]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-purple-400" />
                Add Resource to Vault
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. MIT 6.006 Dynamic Programming Lecture"
                  className="w-full px-3.5 py-2.5 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  URL / Document Link *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Resource Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Video">YouTube / Video</option>
                    <option value="PDF">PDF / Lecture Slides</option>
                    <option value="Link">Article / Link</option>
                    <option value="Doc">Documentation / Spec</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Chemistry & Physics">Chemistry & Physics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="algorithms, python, midterm, cheat-sheet"
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of why this resource is valuable and key takeaways..."
                  className="w-full px-3.5 py-2 bg-[#1b1d2e] border border-[#2c2e47] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23253b]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-sm"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
