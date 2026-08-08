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
    <div className="space-y-4 mb-6">
      {/* Search Bar + Controls Header */}
      <div className="glass-panel rounded-[24px] p-3.5 sm:p-4.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm border border-black/8">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search entries, creators, notes, tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/70 border border-black/5 focus:border-blue-600 focus:bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-all shadow-inner"
          />
          {filter.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-black bg-slate-200 px-2 py-0.5 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Switcher & Sorting Selector */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 border border-black/5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="bg-transparent text-slate-900 focus:outline-none cursor-pointer font-sans"
            >
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rating 🔥</option>
              <option value="favorites">Starred First ⭐</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* View & Starred Toggles */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onFilterChange({ favoritesOnly: !filter.favoritesOnly })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                filter.favoritesOnly
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-[inset_0_1px_0_rgba(255,255,255,1)]'
                  : 'bg-slate-100/80 border-black/5 text-slate-600 hover:text-black hover:bg-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${filter.favoritesOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Starred</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-100/80 border border-black/5 rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-xs border border-black/10'
                  : 'text-slate-500 hover:text-black'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onViewModeChange('bento')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'bento'
                  ? 'bg-white text-black shadow-xs border border-black/10'
                  : 'text-slate-500 hover:text-black'
              }`}
              title="Bento View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onViewModeChange('compact')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'compact'
                  ? 'bg-white text-black shadow-xs border border-black/10'
                  : 'text-slate-500 hover:text-black'
              }`}
              title="Compact View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          </div>

          {/* Stats Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-black/5 text-xs font-bold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-slate-500" />
            <span>{filteredCount} / {totalCount} Sites</span>
          </div>
        </div>
      </div>

      {/* Source Origin Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {SOURCES.map(({ type, label, icon: Icon }) => {
          const isActive = filter.source === type;
          return (
            <button
              key={type}
              onClick={() => onFilterChange({ source: type })}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'pill-active-apple font-bold'
                  : 'bg-white/80 border-black/5 text-slate-600 hover:text-black hover:bg-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">Category:</span>
        {CATEGORIES.map((cat) => {
          const isActive = filter.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-slate-100/60 text-slate-600 hover:text-black hover:bg-slate-200/60 border border-black/5'
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
