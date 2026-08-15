import React, { useState } from 'react';
import { Plus, Download, Upload, Star } from 'lucide-react';
import logo from '../assets/logo.jpg';
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
    <header className="sticky top-0 z-30 w-full px-6 lg:px-8 py-6 lg:py-8 bg-[#FEFFFC] border-b-[3px] border-[#111111] z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Dynamic Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-4 cursor-default group">
            <div className="relative flex items-center justify-center w-14 h-14 bg-[#111111] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] overflow-hidden transition-all duration-75 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_#111111]">
              <img src={logo} alt="Stash.af Vault Logo" className="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal transition-all duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tighter text-[#111111] font-mono uppercase">
                  STASH.AF
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#111111] text-[#FEFFFC] shadow-[2px_2px_0px_#8116E0]">
                  WABI-SABI
                </span>
              </div>
              <p className="text-[11px] text-[#111111] font-bold font-mono tracking-[0.2em] uppercase mt-1">
                Web Link Vault
              </p>
            </div>
          </div>

          {/* Mobile Add Button */}
          <button
            onClick={onOpenAddModal}
            className="md:hidden flex items-center gap-1.5 px-4 py-2 btn-brutal-primary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Action Controls Top Menu */}
        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {/* Add Bookmark Button */}
          <button
            onClick={onOpenAddModal}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 btn-brutal-primary text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Entry</span>
          </button>

          {/* Export JSON (Triggers confirmation modal) */}
          <button
            onClick={onRequestExport}
            className="flex items-center gap-1.5 px-4 py-2.5 btn-brutal-stealth text-xs sm:text-sm"
            title="Backup all bookmarks to JSON file"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>

          {/* Import JSON */}
          <label className="flex items-center gap-1.5 px-4 py-2.5 btn-brutal-stealth text-xs sm:text-sm cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={onImportData} className="hidden" />
          </label>

          {/* Favorites Starred Counter Pill */}
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#FEFFFC] border-[3px] border-[#111111] text-[#111111] text-xs font-black uppercase whitespace-nowrap shadow-[4px_4px_0px_#111111]">
            <Star className="w-4 h-4 fill-[#111111] text-[#111111]" />
            <span>{favoriteCount} Starred</span>
          </div>
        </div>
      </div>
    </header>
  );
};
