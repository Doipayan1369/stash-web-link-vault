import React from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Star, 
  Check, 
  Globe, 
  User, 
  Share2, 
  Bookmark as BookmarkIcon, 
  Flame,
  MessageSquare,
  Newspaper,
  Wrench,
  Palette
} from 'lucide-react';
import { Bookmark, SourceType } from '../types';

interface CardDetailModalProps {
  bookmark: Bookmark | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onCopyUrl: (url: string) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  bookmark,
  isOpen,
  onClose,
  onToggleFavorite,
  onCopyUrl,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  if (!isOpen || !bookmark) return null;

  const domain = new URL(bookmark.url).hostname.replace('www.', '');

  const handleCopy = () => {
    onCopyUrl(bookmark.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceIcon = (source: SourceType) => {
    switch (source) {
      case 'reddit':
        return <MessageSquare className="w-4 h-4 text-[#FEFFFC]" />;
      case 'twitter':
        return <Share2 className="w-4 h-4 text-[#FEFFFC]" />;
      case 'google_news':
        return <Newspaper className="w-4 h-4 text-[#FEFFFC]" />;
      case 'workflow_tool':
        return <Wrench className="w-4 h-4 text-[#FEFFFC]" />;
      case 'design':
        return <Palette className="w-4 h-4 text-[#FEFFFC]" />;
      default:
        return <Globe className="w-4 h-4 text-[#FEFFFC]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FEFFFC]/10/5/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg brutal-panel p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-[#FEFFFC]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 shadow-xl hover:bg-[#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none "
        >
          <X className="w-5 h-5 text-[#FEFFFC]" />
        </button>

        {/* Card Header: Icon + Title + Source */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-16 h-16 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 shadow-xl flex items-center justify-center p-2 shrink-0">
            {!imgError && bookmark.faviconUrl ? (
              <img
                src={bookmark.faviconUrl}
                alt=""
                className="w-full h-full object-contain grayscale"
                onError={() => setImgError(true)}
              />
            ) : (
              <Globe className="w-8 h-8 text-[#FEFFFC]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[12px] font-black text-[#FEFFFC] uppercase tracking-[0.2em] bg-[#8116E0] px-2 py-0.5 border border-white/10/10">
                {bookmark.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 text-[11px] font-bold text-[#FEFFFC] uppercase">
                {getSourceIcon(bookmark.sourceType)}
                <span>{bookmark.sourceType.replace('_', ' ')}</span>
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#FEFFFC] leading-tight uppercase tracking-tighter">
              {bookmark.title}
            </h2>
            <p className="text-[13px] text-[#FEFFFC]/70 font-mono mt-1 font-bold">{domain}</p>
          </div>
        </div>

        {/* Creator Info Box (Who Created It / Source Post Link) */}
        {(bookmark.creatorName || bookmark.creatorLink) && (
          <div className="mb-6 p-4 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FEFFFC]/10/5 text-[#FEFFFC] border border-white/10/10 flex items-center justify-center shadow-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#FEFFFC]/60 uppercase tracking-widest">
                  CREATED BY
                </p>
                <p className="text-[14px] font-black uppercase text-[#FEFFFC]">
                  {bookmark.creatorName || 'COMMUNITY CURATOR'}
                </p>
              </div>
            </div>

            {bookmark.creatorLink && (
              <a
                href={bookmark.creatorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-[#8116E0] border border-white/10/10 text-[#FEFFFC] text-xs font-bold uppercase hover:bg-[#FEFFFC]/10/5/40 backdrop-blur-md shadow-xl active:translate-x-[1px] active:translate-y-[1px] active:shadow-xl "
              >
                <span>VIEW POST</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6 border border-white/10/10 p-4 bg-[#FEFFFC]/10/5/40 backdrop-blur-md shadow-xl">
          <h4 className="text-[11px] font-black text-[#FEFFFC] uppercase tracking-[0.2em] mb-2 bg-[#8116E0] inline-block px-2 border border-white/10/10">
            ABOUT THIS SITE
          </h4>
          <p className="text-[14px] text-[#FEFFFC] font-mono leading-relaxed font-medium">
            {bookmark.description}
          </p>
        </div>

        {/* Custom Workflow Note */}
        {bookmark.notes && (
          <div className="mb-6 p-4 bg-[#FEFFFC]/10/5 border border-white/10/10 text-[#FEFFFC] shadow-xl">
            <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest mb-2">
              <BookmarkIcon className="w-4 h-4 fill-[#FEFFFC]" />
              <span>WORKFLOW NOTE</span>
            </div>
            <p className="text-[14px] font-mono font-medium leading-relaxed">
              &quot;{bookmark.notes}&quot;
            </p>
          </div>
        )}

        {/* Tags & Rating */}
        <div className="flex items-center justify-between gap-3 mb-6 pt-4 border-t-[4px] border-white/10/10">
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 text-[11px] font-bold uppercase text-[#FEFFFC] shadow-xl"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEFFFC]/10/5 text-[#FEFFFC] shadow-xl shrink-0 border border-white/10/10">
            <Flame className="w-4 h-4 fill-[#FEFFFC]" />
            <span className="text-[14px] font-black uppercase">{bookmark.rating}.0</span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t-[4px] border-white/10/10 flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(bookmark.id)}
              className={`p-3 btn-brutal-stealth border shadow-xl ${
                bookmark.isFavorite ? 'bg-[#FEFFFC]/10/5 border-white/10/10' : 'bg-[#FEFFFC]/10/5/40 backdrop-blur-md border-white/10/10'
              }`}
              title={bookmark.isFavorite ? 'Starred' : 'Star Entry'}
            >
              <Star className={`w-5 h-5 ${bookmark.isFavorite ? 'fill-[#FEFFFC] text-[#FEFFFC]' : 'text-[#FEFFFC]'}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-3 btn-brutal-stealth border border-white/10/10 bg-[#FEFFFC]/10/5/40 backdrop-blur-md shadow-xl"
              title="Copy URL"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Primary Action Button */}
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-2 px-6 py-3 btn-brutal-primary text-sm shadow-xl"
          >
            <span>VISIT WEBSITE</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
