import React from 'react';
import { 
  Search, 
  LayoutGrid, 
  Grid, 
  List, 
  MessageSquare, 
  Share2, 
  Newspaper, 
  Wrench, 
  Palette, 
  Globe, 
  Layers,
  Sparkles,
  ArrowUpDown,
  Star
} from 'lucide-react';
import { FilterState, SourceType, Category, ViewMode, SortOption } from '../types';

interface StatsBannerProps {
  filter: FilterState;
  onFilterChange: (updatedFilter: Partial<FilterState>) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  filteredCount: number;
}

const SOURCES: { type: SourceType; label: string; icon: any }[] = [
  { type: 'all', label: 'All Sources', icon: Layers },
  { type: 'reddit', label: 'Reddit', icon: MessageSquare },
  { type: 'twitter', label: 'X / Twitter', icon: Share2 },
  { type: 'google_news', label: 'Google News', icon: Newspaper },
  { type: 'workflow_tool', label: 'Workflow Tools', icon: Wrench },
  { type: 'design', label: 'Design Specs', icon: Palette },
  { type: 'general', label: 'Web', icon: Globe },
];

const CATEGORIES: Category[] = [
  'All',
  'Productivity',
  'Design & UX',
  'AI & Vibe Coding',
  'Audio & Ambience',
  'News & Reads',
  'Social Trends',
];

export const StatsBanner: React.FC<StatsBannerProps> = ({
  filter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="space-y-4 mb-6 mt-4">
      {/* Search Bar + Controls Header */}
      <div className="brutal-panel p-3.5 sm:p-4.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111] font-bold" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="SEARCH ENTRIES..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border-[3px] border-[#111111] focus:bg-[#88C425] text-[#111111] placeholder-[#111111]/50 font-bold uppercase text-xs focus:outline-none transition-none shadow-[4px_4px_0px_#88C425] focus:shadow-[4px_4px_0px_#111111]"
          />
          {filter.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase bg-[#111111] text-[#FFFFFF] px-2 py-1 shadow-[2px_2px_0px_#88C425] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* View Switcher & Sorting Selector */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] border-[3px] border-[#111111] px-3 py-2 text-xs font-bold uppercase text-[#111111] shadow-[4px_4px_0px_#88C425]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#111111]" />
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="bg-transparent text-[#111111] focus:outline-none cursor-pointer font-mono font-bold uppercase appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rating</option>
              <option value="favorites">Starred First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* View & Starred Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFilterChange({ favoritesOnly: !filter.favoritesOnly })}
              className={`flex items-center gap-1.5 px-3 py-2 border-[3px] border-[#111111] text-xs font-bold uppercase transition-none shadow-[4px_4px_0px_#88C425] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#88C425] ${
                filter.favoritesOnly
                  ? 'bg-[#111111] text-[#FFFFFF]'
                  : 'bg-[#FFFFFF] text-[#111111] hover:bg-[#88C425]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${filter.favoritesOnly ? 'fill-[#FFFFFF] text-[#FFFFFF]' : 'text-[#111111]'}`} />
              <span>Starred</span>
            </button>

            <div className="flex items-center bg-[#FFFFFF] border-[3px] border-[#111111] shadow-[4px_4px_0px_#88C425]">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 text-xs font-bold flex items-center justify-center transition-none ${
                viewMode === 'grid'
                  ? 'bg-[#111111] text-[#FFFFFF]'
                  : 'text-[#111111] hover:bg-[#88C425]'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <div className="w-[3px] self-stretch bg-[#111111]"></div>
            <button
              onClick={() => onViewModeChange('bento')}
              className={`p-2 text-xs font-bold flex items-center justify-center transition-none ${
                viewMode === 'bento'
                  ? 'bg-[#111111] text-[#FFFFFF]'
                  : 'text-[#111111] hover:bg-[#88C425]'
              }`}
              title="Bento View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <div className="w-[3px] self-stretch bg-[#111111]"></div>
            <button
              onClick={() => onViewModeChange('compact')}
              className={`p-2 text-xs font-bold flex items-center justify-center transition-none ${
                viewMode === 'compact'
                  ? 'bg-[#111111] text-[#FFFFFF]'
                  : 'text-[#111111] hover:bg-[#88C425]'
              }`}
              title="Compact View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          </div>

          {/* Stats Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-[#FFFFFF] border-[3px] border-[#111111] text-xs font-black uppercase text-[#111111] shadow-[4px_4px_0px_#111111]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{filteredCount} / {totalCount} SITES</span>
          </div>
        </div>
      </div>

      {/* Source Origin Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
        {SOURCES.map(({ type, label, icon: Icon }) => {
          const isActive = filter.source === type;
          return (
            <button
              key={type}
              onClick={() => onFilterChange({ source: type })}
              className={`flex items-center gap-2 px-4 py-2 border-[3px] border-[#111111] text-xs font-bold uppercase whitespace-nowrap transition-none ${
                isActive
                  ? 'brutal-active'
                  : 'bg-[#FFFFFF] text-[#111111] shadow-[4px_4px_0px_#88C425] hover:bg-[#88C425] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#88C425]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111] mr-2 shrink-0 bg-[#FFFFFF] px-2 py-1 border-[2px] border-[#111111]">CATEGORY</span>
        {CATEGORIES.map((cat) => {
          const isActive = filter.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`px-3 py-1.5 border-[2px] border-[#111111] text-xs font-bold uppercase whitespace-nowrap transition-none ${
                isActive
                  ? 'bg-[#111111] text-[#FFFFFF] shadow-[2px_2px_0px_#88C425]'
                  : 'bg-[#EAFDE6] text-[#111111] hover:bg-[#FFFFFF] hover:shadow-[2px_2px_0px_#111111]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
