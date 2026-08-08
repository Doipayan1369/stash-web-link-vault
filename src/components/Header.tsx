import React, { useState } from 'react';
import { Plus, Download, Upload, Sparkles, Star } from 'lucide-react';
import { Bookmark } from '../types';

interface HeaderProps {
  bookmarks: Bookmark[];
  onOpenAddModal: () => void;
  onRequestExport: () => void;
  onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  bookmarks,
  onOpenAddModal,
  onRequestExport,
  onImportData,
}) => {
  const favoriteCount = bookmarks.filter((b) => b.isFavorite).length;

  return (
    <header className="sticky top-0 z-30 w-full px-4 py-4 backdrop-blur-2xl bg-gradient-to-b from-[#F5F5F7]/95 to-[#F5F5F7]/70 border-b border-black/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Dynamic Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 cursor-default group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-black text-white p-[1px] shadow-md group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#1D1D1F] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-[#1D1D1F] font-sans">
                  STASH
                </h1>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-white/50 text-slate-700 shadow-sm">
                  Apple Light
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Web Link Vault
              </p>
            </div>
          </div>

          {/* Mobile Add Button */}
          <button
            onClick={onOpenAddModal}
            className="md:hidden flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-xs shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Action Controls Top Menu */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {/* Add Bookmark Button */}
          <button
            onClick={onOpenAddModal}
            className="hidden md:flex items-center gap-2 px-4.5 py-2.5 rounded-2xl btn-primary text-sm shadow-lg active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Website Entry</span>
          </button>

          {/* Export JSON (Triggers confirmation modal) */}
          <button
            onClick={onRequestExport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl btn-stealth text-xs sm:text-sm active:scale-95 transition-all"
            title="Backup all bookmarks to JSON file"
          >
            <Download className="w-4 h-4 text-slate-700" />
            <span>Export</span>
          </button>

          {/* Import JSON */}
          <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl btn-stealth text-xs sm:text-sm cursor-pointer active:scale-95 transition-all">
            <Upload className="w-4 h-4 text-slate-700" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={onImportData} className="hidden" />
          </label>

          {/* Favorites Starred Counter Pill */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-bold whitespace-nowrap shadow-xs">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{favoriteCount} Starred</span>
          </div>
        </div>
      </div>
    </header>
  );
};
