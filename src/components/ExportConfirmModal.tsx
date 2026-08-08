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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-[28px] p-6 sm:p-7 shadow-2xl border border-black/10 animate-scale-up bg-white/95">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center text-slate-800">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">Confirm Export</h3>
              <p className="text-xs text-slate-500">Backup your website diary stash</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl btn-stealth">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Details Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-black/5 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
            <FileJson className="w-4 h-4 text-blue-600" />
            <span>Target File: <code className="bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-900 font-mono">stash_af_backup.json</code></span>
          </div>
          <p className="text-sm text-[#1D1D1F] font-bold">
            Exporting {count} website {count === 1 ? 'entry' : 'entries'}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            This will generate a JSON backup file containing all your stored links, tags, star ratings, and custom workflow notes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4.5 py-2.5 rounded-xl btn-stealth text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-bold shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};
