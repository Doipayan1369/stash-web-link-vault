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
        return <MessageSquare className="w-4 h-4 text-[#111111]" />;
      case 'twitter':
        return <Share2 className="w-4 h-4 text-[#111111]" />;
      case 'google_news':
        return <Newspaper className="w-4 h-4 text-[#111111]" />;
      case 'workflow_tool':
        return <Wrench className="w-4 h-4 text-[#111111]" />;
      case 'design':
        return <Palette className="w-4 h-4 text-[#111111]" />;
      default:
        return <Globe className="w-4 h-4 text-[#111111]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg brutal-panel p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-[#111111]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-none"
        >
          <X className="w-5 h-5 text-[#111111]" />
        </button>

        {/* Card Header: Icon + Title + Source */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-16 h-16 bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] flex items-center justify-center p-2 shrink-0">
            {!imgError && bookmark.faviconUrl ? (
              <img
                src={bookmark.faviconUrl}
                alt=""
                className="w-full h-full object-contain grayscale"
                onError={() => setImgError(true)}
              />
            ) : (
              <Globe className="w-8 h-8 text-[#111111]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[12px] font-black text-[#111111] uppercase tracking-[0.2em] bg-[#8116E0] px-2 py-0.5 border-[2px] border-[#111111]">
                {bookmark.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FEFFFC] border-[2px] border-[#111111] text-[11px] font-bold text-[#111111] uppercase">
                {getSourceIcon(bookmark.sourceType)}
                <span>{bookmark.sourceType.replace('_', ' ')}</span>
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#111111] leading-tight uppercase tracking-tighter">
              {bookmark.title}
            </h2>
            <p className="text-[13px] text-[#111111]/70 font-mono mt-1 font-bold">{domain}</p>
          </div>
        </div>

        {/* Creator Info Box (Who Created It / Source Post Link) */}
        {(bookmark.creatorName || bookmark.creatorLink) && (
          <div className="mb-6 p-4 bg-[#FEFFFC] border-[3px] border-[#111111] shadow-[4px_4px_0px_#8116E0] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#111111] text-[#FEFFFC] border-[2px] border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#8116E0]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#111111]/60 uppercase tracking-widest">
                  CREATED BY
                </p>
                <p className="text-[14px] font-black uppercase text-[#111111]">
                  {bookmark.creatorName || 'COMMUNITY CURATOR'}
                </p>
              </div>
            </div>

            {bookmark.creatorLink && (
              <a
                href={bookmark.creatorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-[#8116E0] border-[2px] border-[#111111] text-[#111111] text-xs font-bold uppercase hover:bg-[#FEFFFC] shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#111111] transition-none"
              >
                <span>VIEW POST</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6 border-[3px] border-[#111111] p-4 bg-[#FEFFFC] shadow-[4px_4px_0px_#8116E0]">
          <h4 className="text-[11px] font-black text-[#111111] uppercase tracking-[0.2em] mb-2 bg-[#8116E0] inline-block px-2 border-[2px] border-[#111111]">
            ABOUT THIS SITE
          </h4>
          <p className="text-[14px] text-[#111111] font-mono leading-relaxed font-medium">
            {bookmark.description}
          </p>
        </div>

        {/* Custom Workflow Note */}
        {bookmark.notes && (
          <div className="mb-6 p-4 bg-[#111111] border-[3px] border-[#111111] text-[#FEFFFC] shadow-[6px_6px_0px_#8116E0]">
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
        <div className="flex items-center justify-between gap-3 mb-6 pt-4 border-t-[4px] border-[#111111]">
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#FEFFFC] border-[2px] border-[#111111] text-[11px] font-bold uppercase text-[#111111] shadow-[2px_2px_0px_#8116E0]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-[#FEFFFC] shadow-[4px_4px_0px_#8116E0] shrink-0 border-[2px] border-[#111111]">
            <Flame className="w-4 h-4 fill-[#FEFFFC]" />
            <span className="text-[14px] font-black uppercase">{bookmark.rating}.0</span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t-[4px] border-[#111111] flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(bookmark.id)}
              className={`p-3 btn-brutal-stealth border-[3px] shadow-[4px_4px_0px_#111111] ${
                bookmark.isFavorite ? 'bg-[#111111] border-[#111111]' : 'bg-[#FEFFFC] border-[#111111]'
              }`}
              title={bookmark.isFavorite ? 'Starred' : 'Star Entry'}
            >
              <Star className={`w-5 h-5 ${bookmark.isFavorite ? 'fill-[#FEFFFC] text-[#FEFFFC]' : 'text-[#111111]'}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-3 btn-brutal-stealth border-[3px] border-[#111111] bg-[#FEFFFC] shadow-[4px_4px_0px_#111111]"
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
            className="flex-1 flex justify-center items-center gap-2 px-6 py-3 btn-brutal-primary text-sm shadow-[6px_6px_0px_#8116E0]"
          >
            <span>VISIT WEBSITE</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
