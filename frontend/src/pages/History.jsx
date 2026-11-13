import React, { useState } from 'react';
import {
  Clock,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Code2,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function History() {
  const {
    historyList,
    deleteHistoryEntry,
    clearAllHistory,
    loadHistoryToEditor,
    navigateTo,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredHistory = historyList.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.codeSnippet.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLang =
      selectedLanguage === 'all'
        ? true
        : item.language.toLowerCase() === selectedLanguage.toLowerCase();

    const matchesStatus =
      selectedStatus === 'all' ? true : item.statusType === selectedStatus;

    return matchesSearch && matchesLang && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#12192e] to-[#0a0f1d] border border-[#253356] rounded-2xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            Saved Analysis Runs
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Code Analysis History</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Revisit prior code inspections, error diagnostics, and optimization benchmarks.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="btn btn-danger btn-sm text-xs self-start sm:self-auto flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0d1322] border border-[#1c2742] rounded-xl text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search error keywords, snippets..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#121a2f] border border-[#253356] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Language filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[#121a2f] border border-[#253356] text-xs text-slate-300 rounded-lg px-2.5 py-1.5"
          >
            <option value="all">All Languages</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#121a2f] border border-[#253356] text-xs text-slate-300 rounded-lg px-2.5 py-1.5"
          >
            <option value="all">All Results</option>
            <option value="error">Errors Found</option>
            <option value="success">Optimal Clean</option>
            <option value="warning">Inefficient / Traps</option>
          </select>
        </div>

        <div className="text-slate-400 text-xs">
          Showing {filteredHistory.length} of {historyList.length} session(s)
        </div>
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="cp-card text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#121a2f] border border-[#1c2742] flex items-center justify-center mx-auto text-slate-500">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-white text-sm">No analysis sessions found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? 'Try adjusting your search query or filters.'
              : 'Analyze code in the Code Analyzer to start building your diagnostic history.'}
          </p>
          <button
            onClick={() => navigateTo('analyzer')}
            className="btn btn-primary btn-sm mt-2"
          >
            Open Code Analyzer
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="cp-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#253356] transition-all"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`p-2.5 rounded-xl border mt-0.5 flex-shrink-0 ${
                    item.statusType === 'error'
                      ? 'bg-rose-950/30 text-rose-400 border-rose-800/40'
                      : item.statusType === 'warning'
                      ? 'bg-amber-950/30 text-amber-400 border-amber-800/40'
                      : 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40'
                  }`}
                >
                  <Code2 className="w-5 h-5" />
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full font-medium ${
                        item.statusType === 'error'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.statusType === 'warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded bg-[#17223b] text-slate-300">
                      {item.language}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{item.notes}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {item.timestamp}
                    </span>
                    <span>•</span>
                    <span className="text-cyan-400">{item.complexity}</span>
                  </div>

                  {item.codeSnippet && (
                    <div className="p-2 rounded bg-[#090d16] border border-[#1c2742] font-mono text-[10px] text-slate-400 mt-2 truncate">
                      {item.codeSnippet}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                <button
                  onClick={() => loadHistoryToEditor(item)}
                  className="btn btn-secondary btn-sm text-xs font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                  <span>Restore in Editor</span>
                </button>

                <button
                  onClick={() => deleteHistoryEntry(item.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-[#17223b] transition-colors"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal for Clearing History */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121a2f] border border-[#253356] rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">Clear Analysis History?</h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              This will remove all saved diagnostic runs from your browser storage. This action
              cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn btn-secondary btn-sm px-4"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllHistory();
                  setShowClearConfirm(false);
                }}
                className="btn btn-danger btn-sm px-4"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
