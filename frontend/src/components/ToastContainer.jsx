import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (!toasts.length) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
  };

  const borderMap = {
    success: 'border-emerald-500/40 bg-[#0e1e1a]',
    warning: 'border-amber-500/40 bg-[#1e1a0e]',
    error: 'border-rose-500/40 bg-[#1e0e12]',
    info: 'border-cyan-500/40 bg-[#0e1824]'
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-fade-in ${
            borderMap[toast.type] || borderMap.info
          }`}
        >
          <div className="mt-0.5">{iconMap[toast.type] || iconMap.info}</div>
          <div className="flex-1 text-xs text-slate-100 font-medium leading-relaxed">
            {toast.message}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
