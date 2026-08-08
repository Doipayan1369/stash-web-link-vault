export type SourceType = 'all' | 'reddit' | 'twitter' | 'google_news' | 'workflow_tool' | 'design' | 'general';

export type Category = 'All' | 'Productivity' | 'Design & UX' | 'AI & Vibe Coding' | 'Audio & Ambience' | 'News & Reads' | 'Social Trends';

export type ViewMode = 'grid' | 'compact' | 'bento';

export type SortOption = 'newest' | 'rating' | 'alphabetical' | 'favorites';

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description: string;
  category: Category;
  sourceType: SourceType;
  tags: string[];
  rating: number; // 1 to 5
  notes?: string;
  creatorName?: string; // Creator / Author name or handle (e.g. @johndoe)
  creatorLink?: string; // Link to Twitter profile or original post
  faviconUrl?: string;
  isFavorite: boolean;
  createdAt: number;
}

export interface FilterState {
  search: string;
  source: SourceType;
  category: Category;
  tag: string | null;
  favoritesOnly: boolean;
  sortBy: SortOption;
}