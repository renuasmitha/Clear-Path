import React from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  AlertTriangle,
  Code2,
  Bot,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TopicDetailModal() {
  const {
    selectedTopic,
    setSelectedTopic,
    toggleTopicStatus,
    setEditorCode,
    navigateTo,
    showToast
  } = useApp();

  if (!selectedTopic) return null;

  const isCompleted = selectedTopic.status === 'completed';

  const handleLoadSnippet = () => {
    if (selectedTopic.codeSnippet) {
      setEditorCode(
        `# ClearPath Practice: ${selectedTopic.title}\n` +
          `# Concept: ${selectedTopic.description}\n\n` +
          selectedTopic.codeSnippet +
          `\n`
      );
      setSelectedTopic(null);
      navigateTo('analyzer');
      showToast(`Loaded ${selectedTopic.title} example into Code Analyzer.`, 'info');
    }
  };

  const handleAskAI = () => {
    setSelectedTopic(null);
    navigateTo('ai-assistant');
    showToast(`Ask AI about: "${selectedTopic.title}"`, 'info');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTopic.codeSnippet || '');
    showToast('Code copied to clipboard!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0e1424] border border-[#253356] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c2742] bg-[#090d16]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{selectedTopic.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1c2742] text-slate-300 border border-[#253356]">
                  {selectedTopic.level}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {selectedTopic.duration}
                </span>
                <span>•</span>
                <span>Prereqs: {selectedTopic.prereqs || 'None'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedTopic(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#17223b]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-1.5">
              Concept Overview
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed bg-[#121a2f] p-3 rounded-xl border border-[#1c2742]">
              {selectedTopic.description}
            </p>
          </div>

          {/* Pitfalls & Common Mistakes */}
          {selectedTopic.pitfalls && selectedTopic.pitfalls.length > 0 && (
            <div>
              <h4 className="font-semibold text-amber-400 uppercase text-[11px] tracking-wider mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Common Beginner Traps & Pitfalls
              </h4>
              <ul className="space-y-1.5">
                {selectedTopic.pitfalls.map((pitfall, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/15 text-slate-300"
                  >
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Snippet */}
          {selectedTopic.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  Example & Practice Code
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-slate-400 hover:text-white hover:bg-[#17223b]"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button
                    onClick={handleLoadSnippet}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 border border-violet-500/40 text-[11px] font-medium"
                  >
                    Load into Analyzer →
                  </button>
                </div>
              </div>

              <pre className="p-3.5 rounded-xl bg-[#090d16] border border-[#1c2742] font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed">
                {selectedTopic.codeSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-[#090d16] border-t border-[#1c2742] flex items-center justify-between">
          <button
            onClick={() => toggleTopicStatus(selectedTopic.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
            {isCompleted ? 'Completed (Click to Reset)' : 'Mark Topic as Completed'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAskAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-600/20 text-violet-300 border border-violet-500/30 hover:bg-violet-600/30"
            >
              <Bot className="w-3.5 h-3.5" />
              Ask AI Mentor
            </button>
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#17223b] hover:bg-[#253356] text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
