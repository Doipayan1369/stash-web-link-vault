import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Star, 
  Trash2, 
  Globe, 
  User, 
  Flame,
  MessageSquare,
  Share2,
  Newspaper,
  Wrench,
  Palette
} from 'lucide-react';
import { Bookmark, SourceType } from '../types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onSelect: (bookmark: Bookmark) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopyUrl: (url: string) => void;
  viewMode?: 'grid' | 'compact' | 'bento';
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  bookmark,
  onSelect,
  onToggleFavorite,
  onDelete,
  onCopyUrl,
  viewMode = 'grid',
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyUrl(bookmark.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(bookmark.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(bookmark.id);
  };

  const getSourceBadge = (source: SourceType) => {
    const badgeStyle = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-black/5 text-slate-600 text-[10px] font-semibold tracking-tight";
    switch (source) {
      case 'reddit':
        return <span className={badgeStyle}><MessageSquare className="w-2.5 h-2.5" /> Reddit</span>;
      case 'twitter':
        return <span className={badgeStyle}><Share2 className="w-2.5 h-2.5" /> X / Twitter</span>;
      case 'google_news':
        return <span className={badgeStyle}><Newspaper className="w-2.5 h-2.5" /> News</span>;
      case 'workflow_tool':
        return <span className={badgeStyle}><Wrench className="w-2.5 h-2.5" /> Tool</span>;
      case 'design':
        return <span className={badgeStyle}><Palette className="w-2.5 h-2.5" /> Design</span>;
      default:
        return <span className={badgeStyle}><Globe className="w-2.5 h-2.5" /> Web</span>;
    }
  };

  const domain = new URL(bookmark.url).hostname.replace('www.', '');

  if (viewMode === 'compact') {
    return (
      <div 
        onClick={() => onSelect(bookmark)}
        className="glass-card rounded-xl p-3 flex items-center justify-between gap-3 group cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-black/5 flex items-center justify-center shrink-0">
            {!imgError && bookmark.faviconUrl ? (
              <img
                src={bookmark.faviconUrl}
                alt=""
                className="w-4 h-4 object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <Globe className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-[#1D1D1F] truncate group-hover:text-blue-600 transition-colors">
                {bookmark.title}
              </h3>
              {getSourceBadge(bookmark.sourceType)}
            </div>
            <p className="text-[11px] text-slate-500 truncate">{domain}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded-lg btn-stealth ${
              bookmark.isFavorite ? 'text-amber-500 border-amber-300 bg-amber-50' : ''
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${bookmark.isFavorite ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg btn-stealth"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg btn-blue text-[11px] font-medium"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelect(bookmark)}
      className="glass-card rounded-[20px] p-4 flex flex-col justify-between h-full group cursor-pointer relative overflow-hidden"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-black/5 flex items-center justify-center p-1.5 shrink-0 shadow-inner">
              {!imgError && bookmark.faviconUrl ? (
                <img
                  src={bookmark.faviconUrl}
                  alt=""
                  className="w-full h-full object-contain filter drop-shadow"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Globe className="w-4 h-4 text-slate-400" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase truncate">
                {bookmark.category}
              </p>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-[130px]">
                {domain}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-xl btn-stealth ${
                bookmark.isFavorite ? 'text-amber-500 border-amber-200 bg-amber-50' : ''
              }`}
              title={bookmark.isFavorite ? 'Starred' : 'Star Entry'}
            >
              <Star className={`w-3.5 h-3.5 ${bookmark.isFavorite ? 'fill-amber-500' : ''}`} />
            </button>
            
            <button
              onClick={handleDeleteClick}
              className="p-1.5 rounded-xl btn-stealth text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete entry"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Source Badge & Title */}
        <div className="flex items-center gap-1.5 mb-1">
          {getSourceBadge(bookmark.sourceType)}
          {bookmark.creatorName && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 truncate">
              <User className="w-2.5 h-2.5" />
              {bookmark.creatorName}
            </span>
          )}
        </div>

        <h3 className="text-[13px] font-bold text-[#1D1D1F] group-hover:text-blue-600 transition-colors leading-snug line-clamp-1 mb-1">
          {bookmark.title}
        </h3>

        {/* Short Note / Description */}
        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
          {bookmark.notes || bookmark.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {bookmark.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-slate-100 border border-black/5 text-[10px] font-medium text-slate-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-black/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
          <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-bold text-amber-900">{bookmark.rating}.0</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg btn-stealth"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl btn-blue text-[11px] font-bold"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
