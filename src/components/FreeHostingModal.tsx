import React from 'react';
import { X, Server, CheckCircle2, ShieldCheck, Zap, Github, ArrowRight } from 'lucide-react';

interface FreeHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeHostingModal: React.FC<FreeHostingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FEFFFC]/10/5/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-[32px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-scale-up">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FEFFFC]">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#FEFFFC]">100% Free Lifetime Hosting</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                  $0 Forever
                </span>
              </div>
              <p className="text-xs text-[#FEFFFC]/50">Zero database fees, zero server costs, 100% client persistent</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl btn-stealth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-[#FEFFFC]/40 text-sm">
          
          {/* Highlight Banner */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10/10 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FEFFFC]/40 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#FEFFFC] text-sm mb-1">Why is this completely free?</h4>
              <p className="text-xs text-[#FEFFFC]/50 leading-relaxed">
                STASH.AF is engineered as a self-contained Single-Page Application (SPA). All your website bookmarks, tags, and workflow notes are stored safely inside your browser&apos;s LocalStorage. There are no expensive backend databases or API subscriptions required!
              </p>
            </div>
          </div>

          {/* Deployment Step-by-Step */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#FEFFFC] text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FEFFFC]/40" />
              <span>3 Ways to Deploy Free in Under 2 Minutes:</span>
            </h3>

            {/* Platform 1: Vercel */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FEFFFC] text-sm">Option 1: Vercel (Recommended)</span>
                <span className="text-[10px] font-bold text-slate-200 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">Fastest</span>
              </div>
              <ol className="list-decimal list-inside text-xs text-[#FEFFFC]/50 space-y-1">
                <li>Push this repository folder to GitHub.</li>
                <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-slate-200 underline">Vercel.com</a> and click <strong className="text-[#FEFFFC]">Import Project</strong>.</li>
                <li>Select your GitHub repository and click <strong className="text-[#FEFFFC]">Deploy</strong>. Your site is live instantly!</li>
              </ol>
            </div>

            {/* Platform 2: GitHub Pages */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FEFFFC] text-sm flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-[#FEFFFC]/40" />
                  <span>Option 2: GitHub Pages</span>
                </span>
                <span className="text-[10px] font-bold text-[#FEFFFC]/40 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">Native</span>
              </div>
              <ol className="list-decimal list-inside text-xs text-[#FEFFFC]/50 space-y-1">
                <li>Run <code className="bg-white/10 px-1.5 py-0.5 rounded text-slate-200">npm run build</code> in your terminal.</li>
                <li>In your GitHub repo settings, go to <strong className="text-[#FEFFFC]">Pages</strong>.</li>
                <li>Set source branch to <code className="bg-white/10 px-1.5 py-0.5 rounded text-slate-200">gh-pages</code> or GitHub Actions.</li>
              </ol>
            </div>

            {/* Platform 3: Netlify */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FEFFFC] text-sm">Option 3: Netlify / Cloudflare Pages</span>
                <span className="text-[10px] font-bold text-[#FEFFFC]/40 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">Unlimited Bandwidth</span>
              </div>
              <p className="text-xs text-[#FEFFFC]/50">
                Simply drag and drop the compiled <code className="bg-white/10 px-1.5 py-0.5 rounded text-slate-200">dist</code> folder onto Netlify Drop or Cloudflare Pages for instant worldwide hosting.
              </p>
            </div>
          </div>

          {/* Backup Reminder */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FEFFFC]/40 shrink-0" />
              <span className="text-xs text-[#FEFFFC]/40">
                Use the <strong className="text-[#FEFFFC]">Export JSON</strong> button anytime to create instant backups of all your saved websites!
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10/10 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl btn-primary text-sm shadow-xl active:scale-95 transition-all"
          >
            <span>Got It</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
