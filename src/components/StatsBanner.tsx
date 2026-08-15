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
    <div className="space-y-6 mb-12 mt-6">
      {/* Search Bar + Controls Header */}
      <div className="brutal-panel p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Search Input */}
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FEFFFC] font-bold" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="SEARCH ENTRIES..."
            className="w-full pl-12 pr-4 py-3.5 bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md border border-white/10/10 focus:bg-[#8116E0] text-[#FEFFFC] placeholder-[#111111]/50 font-bold uppercase text-xs sm:text-sm focus:outline-none  shadow-xl focus:shadow-xl"
          />
          {filter.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase bg-[#FEFFFC]/10/5 text-[#FEFFFC] px-2 py-1 shadow-xl active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* View Switcher & Sorting Selector */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md border border-white/10/10 px-3 py-2 text-xs font-bold uppercase text-[#FEFFFC] shadow-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FEFFFC]" />
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="bg-transparent text-[#FEFFFC] focus:outline-none cursor-pointer font-mono font-bold uppercase appearance-none"
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
              className={`flex items-center gap-1.5 px-3 py-2 border border-white/10/10 text-xs font-bold uppercase  shadow-xl active:translate-x-[2px] active:translate-y-[2px] active:shadow-xl ${
                filter.favoritesOnly
                  ? 'bg-[#FEFFFC]/10/5 text-[#FEFFFC]'
                  : 'bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md text-[#FEFFFC] hover:bg-[#8116E0]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${filter.favoritesOnly ? 'fill-[#FEFFFC] text-[#FEFFFC]' : 'text-[#FEFFFC]'}`} />
              <span>Starred</span>
            </button>

            <div className="flex items-center bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md border border-white/10/10 shadow-xl">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 text-xs font-bold flex items-center justify-center  ${
                viewMode === 'grid'
                  ? 'bg-[#FEFFFC]/10/5 text-[#FEFFFC]'
                  : 'text-[#FEFFFC] hover:bg-[#8116E0]'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <div className="w-[3px] self-stretch bg-[#FEFFFC]/10/5"></div>
            <button
              onClick={() => onViewModeChange('bento')}
              className={`p-2 text-xs font-bold flex items-center justify-center  ${
                viewMode === 'bento'
                  ? 'bg-[#FEFFFC]/10/5 text-[#FEFFFC]'
                  : 'text-[#FEFFFC] hover:bg-[#8116E0]'
              }`}
              title="Bento View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <div className="w-[3px] self-stretch bg-[#FEFFFC]/10/5"></div>
            <button
              onClick={() => onViewModeChange('compact')}
              className={`p-2 text-xs font-bold flex items-center justify-center  ${
                viewMode === 'compact'
                  ? 'bg-[#FEFFFC]/10/5 text-[#FEFFFC]'
                  : 'text-[#FEFFFC] hover:bg-[#8116E0]'
              }`}
              title="Compact View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          </div>

          {/* Stats Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md border border-white/10/10 text-xs font-black uppercase text-[#FEFFFC] shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{filteredCount} / {totalCount} SITES</span>
          </div>
        </div>
      </div>

      {/* Source Origin Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 scrollbar-none">
        {SOURCES.map(({ type, label, icon: Icon }) => {
          const isActive = filter.source === type;
          return (
            <button
              key={type}
              onClick={() => onFilterChange({ source: type })}
              className={`flex items-center gap-2 px-4 py-2 border border-white/10/10 text-xs font-bold uppercase whitespace-nowrap  ${
                isActive
                  ? 'brutal-active'
                  : 'bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md text-[#FEFFFC] shadow-xl hover:bg-[#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-xl'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FEFFFC] mr-3 shrink-0 bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md px-3 py-1.5 border border-white/10/10">CATEGORY</span>
        {CATEGORIES.map((cat) => {
          const isActive = filter.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`px-3 py-1.5 border border-white/10/10 text-xs font-bold uppercase whitespace-nowrap  ${
                isActive
                  ? 'bg-[#FEFFFC]/10/5 text-[#FEFFFC] shadow-xl'
                  : 'bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md text-[#FEFFFC] hover:bg-[#FEFFFC]/10/40 backdrop-blur-md/95 backdrop-blur-md hover:shadow-xl'
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
