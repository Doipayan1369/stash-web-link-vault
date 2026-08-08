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
        return <MessageSquare className="w-4 h-4 text-slate-700" />;
      case 'twitter':
        return <Share2 className="w-4 h-4 text-slate-700" />;
      case 'google_news':
        return <Newspaper className="w-4 h-4 text-slate-700" />;
      case 'workflow_tool':
        return <Wrench className="w-4 h-4 text-slate-700" />;
      case 'design':
        return <Palette className="w-4 h-4 text-slate-700" />;
      default:
        return <Globe className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-[32px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50 animate-scale-up text-[#1D1D1F]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl btn-stealth"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        {/* Card Header: Icon + Title + Source */}
        <div className="flex items-start gap-4 mb-5 pr-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-black/10 flex items-center justify-center p-3 shadow-inner shrink-0">
            {!imgError && bookmark.faviconUrl ? (
              <img
                src={bookmark.faviconUrl}
                alt=""
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <Globe className="w-7 h-7 text-slate-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {bookmark.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-black/5 text-[11px] font-medium text-slate-600">
                {getSourceIcon(bookmark.sourceType)}
                <span className="capitalize">{bookmark.sourceType.replace('_', ' ')}</span>
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#1D1D1F] leading-tight">
              {bookmark.title}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{domain}</p>
          </div>
        </div>

        {/* Creator Info Box (Who Created It / Source Post Link) */}
        {(bookmark.creatorName || bookmark.creatorLink) && (
          <div className="mb-5 p-3.5 rounded-2xl bg-slate-50 border border-black/5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-black/10 flex items-center justify-center text-slate-700">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Created By / Shared By
                </p>
                <p className="text-xs font-bold text-[#1D1D1F]">
                  {bookmark.creatorName || 'Community Curator'}
                </p>
              </div>
            </div>

            {bookmark.creatorLink && (
              <a
                href={bookmark.creatorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-all"
              >
                <span>View Post / Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            About This Site
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            {bookmark.description}
          </p>
        </div>

        {/* Custom Workflow Note */}
        {bookmark.notes && (
          <div className="mb-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
              <BookmarkIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Personal Workflow Note</span>
            </div>
            <p className="text-xs text-slate-800 italic leading-relaxed">
              &quot;{bookmark.notes}&quot;
            </p>
          </div>
        )}

        {/* Tags & Rating */}
        <div className="flex items-center justify-between gap-3 mb-6 pt-2 border-t border-black/5">
          <div className="flex flex-wrap gap-1.5">
            {bookmark.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-slate-100 border border-black/5 text-xs font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 shrink-0">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-900">{bookmark.rating}.0</span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(bookmark.id)}
              className={`p-2.5 rounded-xl btn-stealth ${
                bookmark.isFavorite ? 'text-amber-600 border-amber-300 bg-amber-50' : ''
              }`}
              title={bookmark.isFavorite ? 'Starred' : 'Star Entry'}
            >
              <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl btn-stealth"
              title="Copy URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

          {/* Primary Action Button */}
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl btn-blue text-sm font-bold shadow-lg"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
