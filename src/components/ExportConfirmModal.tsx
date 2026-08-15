import React from 'react';
import { Download, X, FileJson, Check } from 'lucide-react';

interface ExportConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export const ExportConfirmModal: React.FC<ExportConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  count,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FEFFFC]/10/5/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md brutal-panel p-6 sm:p-8 animate-scale-up text-[#FEFFFC]">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-[4px] border-white/10/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FEFFFC]/10/5 border border-white/10/10 flex items-center justify-center text-[#FEFFFC] shadow-xl">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#FEFFFC] uppercase tracking-tighter">EXPORT</h3>
              <p className="text-[11px] font-bold text-[#FEFFFC]/70 uppercase tracking-widest mt-1">Backup your stash</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 shadow-xl hover:bg-[#8116E0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ">
            <X className="w-5 h-5 text-[#FEFFFC]" />
          </button>
        </div>

        {/* Details Box */}
        <div className="p-4 bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 shadow-xl mb-8 space-y-3">
          <div className="flex items-center gap-2 text-[#FEFFFC] text-xs font-black uppercase tracking-widest">
            <FileJson className="w-4 h-4" />
            <span>Target File: <code className="bg-[#FEFFFC]/10/5 text-[#FEFFFC] px-2 py-1 font-mono ml-1">STASH_AF_BACKUP.JSON</code></span>
          </div>
          <p className="text-[14px] text-[#FEFFFC] font-black uppercase">
            Exporting {count} {count === 1 ? 'entry' : 'entries'}
          </p>
          <p className="text-[12px] text-[#FEFFFC] font-mono leading-relaxed font-medium">
            This will generate a JSON backup file containing all your stored links, tags, star ratings, and custom workflow notes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-2 border-t-[4px] border-white/10/10 mt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 btn-brutal-stealth bg-[#FEFFFC]/10/5/40 backdrop-blur-md border border-white/10/10 shadow-xl"
          >
            CANCEL
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-3 btn-brutal-primary shadow-xl"
          >
            <Check className="w-5 h-5 text-[#FEFFFC]" />
            <span>CONFIRM EXPORT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
