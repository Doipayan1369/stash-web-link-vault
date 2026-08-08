import React, { useState } from 'react';
import { X, Sparkles, Link as LinkIcon, Globe, MessageSquare, Share2, Newspaper, Wrench, Palette, Flame, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Bookmark, Category, SourceType } from '../types';

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
}

const CATEGORIES: Category[] = [
  'Productivity',
  'Design & UX',
  'AI & Vibe Coding',
  'Audio & Ambience',
  'News & Reads',
  'Social Trends',
];

const SOURCES: { type: SourceType; label: string; icon: any }[] = [
  { type: 'reddit', label: 'Reddit', icon: MessageSquare },
  { type: 'twitter', label: 'X / Twitter', icon: Share2 },
  { type: 'google_news', label: 'Google News', icon: Newspaper },
  { type: 'workflow_tool', label: 'Workflow Tool', icon: Wrench },
  { type: 'design', label: 'Design & UX', icon: Palette },
  { type: 'general', label: 'General Web', icon: Globe },
];

export const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({
  isOpen,
  onClose,
  onAddBookmark,
}) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Productivity');
  const [sourceType, setSourceType] = useState<SourceType>('general');
  const [creatorName, setCreatorName] = useState('');
  const [creatorLink, setCreatorLink] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleUrlBlur = () => {
    if (!url) return;
    try {
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
        setUrl(formattedUrl);
      }
      const parsedUrl = new URL(formattedUrl);
      const domain = parsedUrl.hostname.replace('www.', '');

      if (!title) {
        const cleanTitle = domain.split('.')[0];
        setTitle(cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1));
      }

      if (domain.includes('reddit.com')) {
        setSourceType('reddit');
        setCategory('Social Trends');
      } else if (domain.includes('twitter.com') || domain.includes('x.com')) {
        setSourceType('twitter');
        setCategory('Social Trends');
      } else if (domain.includes('news.google.com') || domain.includes('news.')) {
        setSourceType('google_news');
        setCategory('News & Reads');
      }
    } catch {
      // Handled during submit
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }

    let parsedDomain = 'example.com';
    try {
      parsedDomain = new URL(finalUrl).hostname;
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onAddBookmark({
      url: finalUrl,
      title: title.trim() || parsedDomain,
      description: description.trim() || `Saved link to ${parsedDomain}`,
      category,
      sourceType,
      creatorName: creatorName.trim() || undefined,
      creatorLink: creatorLink.trim() || undefined,
      tags: tags.length > 0 ? tags : ['Saved', category],
      rating,
      notes: notes.trim(),
      faviconUrl: `https://www.google.com/s2/favicons?domain=${parsedDomain}&sz=128`,
      isFavorite: false,
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setUrl('');
    setTitle('');
    setDescription('');
    setCreatorName('');
    setCreatorLink('');
    setTagsInput('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel rounded-[36px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto scrollbar-none shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] border border-white/60 animate-scale-up text-[#1D1D1F]">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Add Website Entry</h2>
              <p className="text-xs text-slate-500">Archive a tool, Reddit thread, or X post into your diary</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl btn-stealth">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Website URL */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Website URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={handleUrlBlur}
                placeholder="https://reddit.com/r/vibe_coding or https://x.com/..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-black/10 focus:border-blue-600 focus:bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Title / Platform Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Vibe Coding Standard"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-black/10 focus:border-blue-600 focus:bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-black/10 focus:border-blue-600 text-slate-900 text-xs focus:outline-none transition-all font-sans"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Creator Attribution (Name & Link) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-black/5">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-500" />
                <span>Creator / Twitter Handle</span>
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="e.g. @johndoe or John Doe"
                className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Share2 className="w-3 h-3 text-slate-500" />
                <span>Post Link or Profile URL</span>
              </label>
              <input
                type="text"
                value={creatorLink}
                onChange={(e) => setCreatorLink(e.target.value)}
                placeholder="https://x.com/post/123..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Source Type Selector Pills */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Source Origin
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SOURCES.map(({ type, label, icon: Icon }) => {
                const isSelected = sourceType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSourceType(type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                        : 'bg-slate-50 border-black/10 text-slate-600 hover:text-black hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Short Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-black/10 focus:border-blue-600 text-slate-900 placeholder-slate-400 text-xs focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                Short Workflow Note (What it is used for)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Use for fast component specs during sprint planning..."
                className="w-full px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 focus:border-amber-400 text-amber-950 placeholder-amber-400 text-xs focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Tags & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, DevTool, Design"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-black/10 focus:border-blue-600 text-slate-900 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Vibe Rating (1 to 5 🔥)
              </label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Flame
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 mt-2 border-t border-black/5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl btn-stealth text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
