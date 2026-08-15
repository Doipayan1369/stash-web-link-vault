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
  { type: 'twitter', label: 'Twitter', icon: Share2 },
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#111111', '#FEFFFC', '#8116E0']
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

  const inputClass = "w-full px-4 py-3 bg-[#FEFFFC] border-[3px] border-[#111111] focus:bg-[#8116E0] text-[#111111] placeholder-[#111111]/40 font-bold font-mono text-xs focus:outline-none transition-none shadow-[4px_4px_0px_#8116E0] focus:shadow-[4px_4px_0px_#111111] rounded-none";
  const labelClass = "block text-[11px] font-black text-[#111111] uppercase tracking-[0.1em] mb-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl brutal-panel p-6 sm:p-8 max-h-[90vh] overflow-y-auto scrollbar-none text-[#111111]">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-[4px] border-[#111111]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#111111] text-[#FEFFFC] flex items-center justify-center shadow-[4px_4px_0px_#8116E0] border-[2px] border-[#111111]">
              <Sparkles className="w-6 h-6 text-[#FEFFFC]" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tighter">ADD ENTRY</h2>
              <p className="text-[11px] font-bold text-[#111111]/70 uppercase tracking-widest mt-1">Archive a new resource</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-none">
            <X className="w-5 h-5 text-[#111111]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Website URL */}
          <div>
            <label className={labelClass}>
              Website URL <span className="text-[#111111]">*</span>
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]" />
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={handleUrlBlur}
                placeholder="https://..."
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Title / Platform Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.G. PROJECT NAME"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={`${inputClass} appearance-none uppercase`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[4px_4px_0px_#8116E0]">
            <div>
              <label className="block text-[11px] font-black text-[#111111] uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#111111]" />
                <span>Creator Handle</span>
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="@HANDLE"
                className="w-full px-3 py-2 bg-[#FEFFFC] border-[2px] border-[#111111] text-[#111111] placeholder-[#111111]/40 font-bold font-mono text-xs focus:outline-none focus:bg-[#FEFFFC]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-[#111111] uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#111111]" />
                <span>Post URL</span>
              </label>
              <input
                type="text"
                value={creatorLink}
                onChange={(e) => setCreatorLink(e.target.value)}
                placeholder="HTTPS://..."
                className="w-full px-3 py-2 bg-[#FEFFFC] border-[2px] border-[#111111] text-[#111111] placeholder-[#111111]/40 font-bold font-mono text-xs focus:outline-none focus:bg-[#FEFFFC]"
              />
            </div>
          </div>

          {/* Source Type Selector Pills */}
          <div>
            <label className={labelClass}>
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
                    className={`flex items-center gap-2 px-3 py-2 border-[3px] border-[#111111] text-[10px] font-black uppercase transition-none ${
                      isSelected
                        ? 'bg-[#111111] text-[#FEFFFC] shadow-[2px_2px_0px_#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                        : 'bg-[#FEFFFC] text-[#111111] shadow-[2px_2px_0px_#8116E0] hover:bg-[#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Short Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="BRIEF SUMMARY..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-[#FEFFFC] uppercase tracking-[0.1em] mb-2 bg-[#111111] inline-block px-2 py-0.5 border-[2px] border-[#111111]">
                WORKFLOW NOTE
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="HOW WILL YOU USE THIS?"
                className="w-full px-4 py-3 bg-[#111111] text-[#FEFFFC] border-[3px] border-[#111111] focus:bg-[#222222] placeholder-[#FEFFFC]/40 font-bold font-mono text-xs focus:outline-none transition-none shadow-[4px_4px_0px_#8116E0] rounded-none resize-none"
              />
            </div>
          </div>

          {/* Tags & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="DESIGN, TOOL, ..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                VIBE RATING
              </label>
              <div className="flex items-center gap-2 py-1 bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[4px_4px_0px_#8116E0] px-4 justify-between h-[46px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Flame
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-[#111111] text-[#111111]' : 'text-[#8116E0]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 mt-4 border-t-[4px] border-[#111111] flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 btn-brutal-stealth bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 btn-brutal-primary shadow-[6px_6px_0px_#8116E0]"
            >
              <Sparkles className="w-5 h-5 text-[#FEFFFC]" />
              <span>SAVE ENTRY</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
