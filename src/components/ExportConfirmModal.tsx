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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md brutal-panel p-6 sm:p-8 animate-scale-up text-[#111111]">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-[4px] border-[#111111]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#111111] border-[2px] border-[#111111] flex items-center justify-center text-[#FFFFFF] shadow-[4px_4px_0px_#88C425]">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tighter">EXPORT</h3>
              <p className="text-[11px] font-bold text-[#111111]/70 uppercase tracking-widest mt-1">Backup your stash</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-[#FFFFFF] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#88C425] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-none">
            <X className="w-5 h-5 text-[#111111]" />
          </button>
        </div>

        {/* Details Box */}
        <div className="p-4 bg-[#FFFFFF] border-[3px] border-[#111111] shadow-[4px_4px_0px_#88C425] mb-8 space-y-3">
          <div className="flex items-center gap-2 text-[#111111] text-xs font-black uppercase tracking-widest">
            <FileJson className="w-4 h-4" />
            <span>Target File: <code className="bg-[#111111] text-[#FFFFFF] px-2 py-1 font-mono ml-1">STASH_AF_BACKUP.JSON</code></span>
          </div>
          <p className="text-[14px] text-[#111111] font-black uppercase">
            Exporting {count} {count === 1 ? 'entry' : 'entries'}
          </p>
          <p className="text-[12px] text-[#111111] font-mono leading-relaxed font-medium">
            This will generate a JSON backup file containing all your stored links, tags, star ratings, and custom workflow notes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-2 border-t-[4px] border-[#111111] mt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 btn-brutal-stealth bg-[#FFFFFF] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]"
          >
            CANCEL
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-3 btn-brutal-primary shadow-[6px_6px_0px_#88C425]"
          >
            <Check className="w-5 h-5 text-[#FFFFFF]" />
            <span>CONFIRM EXPORT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
