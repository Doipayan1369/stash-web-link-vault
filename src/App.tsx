import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { BookmarkCard } from './components/BookmarkCard';
import { AddBookmarkModal } from './components/AddBookmarkModal';
import { ExportConfirmModal } from './components/ExportConfirmModal';
import { CardDetailModal } from './components/CardDetailModal';
import { INITIAL_BOOKMARKS } from './data/initialBookmarks';
import { Bookmark, FilterState, ViewMode } from './types';
import { Plus, Layers, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'STASH_AF_BOOKMARKS_V2';

export const App: React.FC = () => {
  // Load bookmarks from LocalStorage or seed data
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_BOOKMARKS;
  });

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
      console.error('Failed to save to local storage', err);
    }
  }, [bookmarks]);

  // View & Modal States
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedBookmarkForDetail, setSelectedBookmarkForDetail] = useState<Bookmark | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters State
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    source: 'all',
    category: 'All',
    tag: null,
    favoritesOnly: false,
    sortBy: 'newest',
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...updated }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleAddBookmark = (newBookmarkData: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newEntry: Bookmark = {
      ...newBookmarkData,
      id: `stash-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: Date.now(),
    };
    setBookmarks((prev) => [newEntry, ...prev]);
    showToast(`Added "${newEntry.title}" to stash!`);
  };

  const handleToggleFavorite = (id: string) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
    // Also update detail modal state if currently viewing this bookmark
    if (selectedBookmarkForDetail && selectedBookmarkForDetail.id === id) {
      setSelectedBookmarkForDetail((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handleDeleteBookmark = (id: string) => {
    const target = bookmarks.find((b) => b.id === id);
    if (confirm(`Remove "${target?.title || 'this entry'}" from your stash?`)) {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      if (selectedBookmarkForDetail?.id === id) {
        setSelectedBookmarkForDetail(null);
      }
      showToast('Entry removed from stash');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Destination URL copied to clipboard!');
  };

  // Trigger Export After Confirmation
  const executeExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `stash_af_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Exported ${bookmarks.length} website entries!`);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (Array.isArray(imported)) {
            setBookmarks(imported);
            showToast(`Imported ${imported.length} bookmarks successfully!`);
          } else {
            alert('Invalid JSON file format');
          }
        } catch {
          alert('Failed to parse JSON file');
        }
      };
    }
  };

  const filteredBookmarks = useMemo(() => {
    return bookmarks
      .filter((item) => {
        if (filter.search) {
          const query = filter.search.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchUrl = item.url.toLowerCase().includes(query);
          const matchNotes = item.notes?.toLowerCase().includes(query) ?? false;
          const matchCreator = item.creatorName?.toLowerCase().includes(query) ?? false;
          const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchUrl && !matchNotes && !matchCreator && !matchTags) return false;
        }

        if (filter.source !== 'all' && item.sourceType !== filter.source) {
          return false;
        }

        if (filter.category !== 'All' && item.category !== filter.category) {
          return false;
        }

        if (filter.tag && !item.tags.includes(filter.tag)) {
          return false;
        }

        if (filter.favoritesOnly && !item.isFavorite) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'newest') {
          return b.createdAt - a.createdAt;
        }
        if (filter.sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (filter.sortBy === 'favorites') {
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        }
        if (filter.sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [bookmarks, filter]);

  return (
    <div className="relative min-h-screen pb-20 bg-transparent overflow-hidden">
      {/* Ambient Neon Nebula Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8116E0] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D0FF00] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
      </div>
      
      {/* Main Header Nav */}
      <div className="relative z-30">
        <Header
          bookmarks={bookmarks}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onRequestExport={() => setIsExportModalOpen(true)}
          onImportData={handleImportData}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-16">
        
        {/* Controls & Filter Banner */}
        <StatsBanner
          filter={filter}
          onFilterChange={handleFilterChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={bookmarks.length}
          filteredCount={filteredBookmarks.length}
        />

        {/* Bookmark Grid Layout */}
        {filteredBookmarks.length > 0 ? (
          <div
            className={
              viewMode === 'compact'
                ? 'space-y-4'
                : viewMode === 'bento'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[280px]'
                : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'
            }
          >
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onSelect={(selected) => setSelectedBookmarkForDetail(selected)}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteBookmark}
                onCopyUrl={handleCopyUrl}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="brutal-panel p-16 text-center max-w-lg mx-auto my-20 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#111111]/80 border border-white/10 flex items-center justify-center text-[#D0FF00] mx-auto shadow-[0_0_30px_rgba(208,255,0,0.2)]">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#FEFFFC]">No entries found</h3>
            <p className="text-sm font-mono text-[#FEFFFC]/70 max-w-sm mx-auto">
              {filter.search
                ? `No entry matches "${filter.search}". Try clearing search.`
                : 'Your stash is empty for this filter. Add your first website link!'}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-brutal-primary px-8 py-4 inline-flex items-center gap-2 group"
            >
              <Plus className="w-5 h-5" />
              <span>Add Entry Now</span>
            </button>
          </div>
        )}
      </main>

      {/* Add Bookmark Modal */}
      <AddBookmarkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBookmark={handleAddBookmark}
      />

      {/* Export Confirmation Modal */}
      <ExportConfirmModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={executeExportData}
        count={bookmarks.length}
      />

      {/* Card Detail Pop-up Modal */}
      <CardDetailModal
        bookmark={selectedBookmarkForDetail}
        isOpen={!!selectedBookmarkForDetail}
        onClose={() => setSelectedBookmarkForDetail(null)}
        onToggleFavorite={handleToggleFavorite}
        onCopyUrl={handleCopyUrl}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 brutal-panel bg-[#111111] text-[#111111] text-xs font-bold uppercase animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#111111]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
