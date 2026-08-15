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
    const badgeStyle = "inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#FFFFFF] border-[2px] border-[#111111] text-[#111111] text-[10px] font-black uppercase tracking-tight";
    switch (source) {
      case 'reddit':
        return <span className={badgeStyle}><MessageSquare className="w-2.5 h-2.5" /> Reddit</span>;
      case 'twitter':
        return <span className={badgeStyle}><Share2 className="w-2.5 h-2.5" /> Twitter</span>;
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
        className="brutal-card p-4 sm:p-5 flex items-center justify-between gap-4 group cursor-pointer"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 bg-[#FFFFFF] border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center shrink-0 p-1">
            {!imgError && bookmark.faviconUrl ? (
              <img
                src={bookmark.faviconUrl}
                alt=""
                className="w-5 h-5 object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <Globe className="w-5 h-5 text-[#111111]" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-black text-[#111111] uppercase truncate group-hover:underline">
                {bookmark.title}
              </h3>
              {getSourceBadge(bookmark.sourceType)}
            </div>
            <p className="text-[11px] text-[#111111]/70 font-mono truncate">{domain}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 btn-brutal-stealth ${
              bookmark.isFavorite ? 'bg-[#111111]' : ''
            }`}
          >
            <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-[#FFFFFF] text-[#FFFFFF]' : 'text-[#111111]'}`} />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 btn-brutal-stealth"
            title="Copy URL"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-3 py-1.5 btn-brutal-primary text-[11px]"
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
      className="brutal-card p-5 sm:p-6 flex flex-col justify-between h-full group cursor-pointer"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 bg-[#FFFFFF] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center p-2 shrink-0">
              {!imgError && bookmark.faviconUrl ? (
                <img
                  src={bookmark.faviconUrl}
                  alt=""
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Globe className="w-5 h-5 text-[#111111]" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-[#111111] tracking-widest uppercase truncate">
                {bookmark.category}
              </p>
              <p className="text-[11px] text-[#111111]/70 font-mono truncate max-w-[130px]">
                {domain}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 btn-brutal-stealth border-[2px] ${
                bookmark.isFavorite ? 'bg-[#111111] border-[#111111]' : 'border-transparent'
              }`}
              title={bookmark.isFavorite ? 'Starred' : 'Star Entry'}
            >
              <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-[#FFFFFF] text-[#FFFFFF]' : 'text-[#111111]'}`} />
            </button>
            
            <button
              onClick={handleDeleteClick}
              className="p-2 btn-brutal-stealth border-[2px] border-transparent text-[#111111] hover:text-[#FFFFFF] hover:bg-[#111111] hover:border-[#111111] opacity-0 group-hover:opacity-100 transition-none"
              title="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Source Badge & Title */}
        <div className="flex items-center gap-2 mb-3">
          {getSourceBadge(bookmark.sourceType)}
          {bookmark.creatorName && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#111111]/70 uppercase truncate">
              <User className="w-2.5 h-2.5" />
              {bookmark.creatorName}
            </span>
          )}
        </div>

        <h3 className="text-[15px] sm:text-[16px] font-black uppercase text-[#111111] group-hover:underline leading-snug line-clamp-2 mb-3">
          {bookmark.title}
        </h3>

        {/* Short Note / Description */}
        <p className="text-[13px] text-[#111111]/80 font-mono line-clamp-2 leading-relaxed mb-5">
          {bookmark.notes || bookmark.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {bookmark.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-[#FFFFFF] border-[2px] border-[#111111] text-[10px] font-bold uppercase text-[#111111]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t-[3px] border-[#111111] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-[#111111] text-[#FFFFFF] px-3 py-1.5 shadow-[2px_2px_0px_#88C425]">
          <Flame className="w-3 h-3 fill-[#FFFFFF] text-[#FFFFFF]" />
          <span className="text-[10px] font-black uppercase">{bookmark.rating}.0</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 btn-brutal-stealth border-[2px] border-[#111111] bg-[#FFFFFF] shadow-[2px_2px_0px_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#111111]"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-3 py-1.5 btn-brutal-primary text-[11px]"
          >
            <span>VISIT</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
