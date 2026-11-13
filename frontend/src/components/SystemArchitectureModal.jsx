import React, { useState } from 'react';
import {
  X,
  Network,
  Cpu,
  Layers,
  ArrowRight,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Code2,
  Workflow,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SystemArchitectureModal() {
  const { isArchitectureModalOpen, setArchitectureModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState('workflow'); // 'workflow' | 'architecture' | 'features' | 'approach'

  if (!isArchitectureModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0e1424] border border-[#253356] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c2742] bg-[#090d16]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-md">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                ClearPath System Architecture & Review
                <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-normal border border-violet-500/30">
                  SEC Capstone
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Author: Renu Asmitha T • B.Tech Computer Science Engineering
              </p>
            </div>
          </div>

          <button
            onClick={() => setArchitectureModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#17223b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#0b101c] border-b border-[#1c2742] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'workflow'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#17223b]'
            }`}
          >
            1. System Workflow Flowchart
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'architecture'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#17223b]'
            }`}
          >
            2. 3-Tier Layer Architecture
          </button>
          <button
            onClick={() => setActiveTab('approach')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'approach'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#17223b]'
            }`}
          >
            3. Facts, Checks & Explanations Triad
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'features'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#17223b]'
            }`}
          >
            4. Prototype vs Growing vs Vision Matrix
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: System Workflow */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-800/30 text-xs text-violet-200">
                <strong>Core Philosophy:</strong> Running code is not the same as understanding it. A program can execute without error yet produce incorrect output. ClearPath separates execution facts from pedagogical guided explanations and continuous learning loops.
              </div>

              {/* Step by step flowchart boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs mb-2">
                    1
                  </div>
                  <h4 className="font-semibold text-white text-xs mb-1">Write / Paste Code</h4>
                  <p className="text-[11px] text-slate-400">
                    Student interacts with code editor with syntax formatting and language selector.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
                    2
                  </div>
                  <h4 className="font-semibold text-white text-xs mb-1">Execute & Inspect</h4>
                  <p className="text-[11px] text-slate-400">
                    Runs in isolated execution environment. Captures stdout, return codes, and tracebacks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs mb-2">
                    3
                  </div>
                  <h4 className="font-semibold text-white text-xs mb-1">Analyze & Explain</h4>
                  <p className="text-[11px] text-slate-400">
                    Static AST inspection + plain-language explanation of What, Why, Where & How to correct.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                    4
                  </div>
                  <h4 className="font-semibold text-white text-xs mb-1">Learn & Progress</h4>
                  <p className="text-[11px] text-slate-400">
                    Error automatically maps to recommended concept in the 5-Stage Learning Path.
                  </p>
                </div>
              </div>

              {/* Feedback Loop Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#17223b] to-[#121a2f] border border-[#253356] flex items-center gap-4">
                <Workflow className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-white text-xs mb-0.5">The Continuous Feedback Loop</h5>
                  <p className="text-[11px] text-slate-400">
                    <span className="text-violet-400 font-mono">CODE → ANALYZE → UNDERSTAND → IMPROVE → LEARN → PRACTICE</span>
                    <br />
                    The student remains in driver seat: ClearPath guides and explains, but the student edits and tests the code to verify mastery.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3-Tier Layer Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Layer 1: Frontend */}
                <div className="p-4 rounded-xl bg-[#121a2f] border border-cyan-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                        Client Layer (Frontend)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mb-2">React.js + Vite + Lucide</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      <li>• Multi-page workspace & navigation</li>
                      <li>• Integrated Code Editor with line gutter</li>
                      <li>• Output terminal & execution console</li>
                      <li>• Real-time error diagnostic tabs</li>
                      <li>• Interactive 5-Stage Roadmap & Progress</li>
                      <li>• AI Mentor conversational drawer</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1c2742] text-[10px] text-cyan-400">
                    JSON API Requests via REST
                  </div>
                </div>

                {/* Layer 2: Backend */}
                <div className="p-4 rounded-xl bg-[#121a2f] border border-violet-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-violet-400" />
                      <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                        Server Layer (Backend)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mb-2">Python 3 + FastAPI</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      <li>• RESTful endpoints (/api/analyze, /api/run)</li>
                      <li>• AST parsing & tokenization</li>
                      <li>• Static error pattern recognition</li>
                      <li>• Complexity asymptotic classifier</li>
                      <li>• Orchestration of modular analysis services</li>
                      <li>• Request throttling and validation</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1c2742] text-[10px] text-violet-400">
                    Async Coordination & Sandbox Bridge
                  </div>
                </div>

                {/* Layer 3: Services & AI */}
                <div className="p-4 rounded-xl bg-[#121a2f] border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                        Engine & AI Services
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mb-2">Execution & LLM Support</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      <li>• <strong>1. Execution Service:</strong> Sandboxed execution runner with timeout limits</li>
                      <li>• <strong>2. Analysis Service:</strong> Syntax and runtime error pattern heuristics</li>
                      <li>• <strong>3. AI Mentor Service:</strong> Socratic explanations and concept recommendations</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1c2742] text-[10px] text-emerald-400">
                    Graceful Fallback without Paid API Dependency
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Approach */}
          {activeTab === 'approach' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356]">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-2">
                    <Terminal className="w-4 h-4" />
                    THE FACTS: Execution
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Runs the program in a controlled environment. Captures true stdout, stderr, return codes and tracebacks. Demonstrates what actually happened rather than guessing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356]">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs mb-2">
                    <Code2 className="w-4 h-4" />
                    RULE-BASED CHECKS: Analysis
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Deterministic checks for missing colons, indentation, off-by-one boundary traps, and nested loop asymptotic bottlenecks. Fast, reliable, and requires zero LLM tokens.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-[#253356]">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-2">
                    <Sparkles className="w-4 h-4" />
                    THE EXPLANATIONS: AI Mentor
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Contextual plain-language explanations that teach the underlying concept. Answers student follow-up questions and maps errors to specific roadmap topics to revisit.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <strong>Crucial Design Principle:</strong> AI output is guidance, not proof. The student verifies every proposed fix by executing the program in the terminal.
              </div>
            </div>
          )}

          {/* TAB 4: Feature Matrix */}
          {activeTab === 'features' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#121a2f] border border-cyan-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">PROTOTYPE</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      Implemented
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-400 space-y-1.5">
                    <li>✓ Interactive Code Workspace & Editor</li>
                    <li>✓ Code Execution & Terminal Output</li>
                    <li>✓ Static Syntax Error Detection</li>
                    <li>✓ Plain-language Error Breakdown</li>
                    <li>✓ AI Assistant Conversational Chat</li>
                    <li>✓ Multi-stage Roadmap Navigation</li>
                    <li>✓ Analysis History Persistence</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-violet-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">GROWING</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                      Current Focus
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-400 space-y-1.5">
                    <li>• Code Optimization suggestions</li>
                    <li>• Before/After idiomatic diff preview</li>
                    <li>• Adaptive topic recommendations</li>
                    <li>• Student workspace task tracking</li>
                    <li>• Extended Python AST rules</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2f] border border-amber-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">VISION</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      Future Scope
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-400 space-y-1.5">
                    <li>→ Multi-language support (C++, Java, JS)</li>
                    <li>→ Automated test case generator for logical bugs</li>
                    <li>→ Sandboxed Docker / Firecracker microVMs</li>
                    <li>→ Classroom LMS sync for instructors</li>
                    <li>→ Gamified coding challenges</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#090d16] border-t border-[#1c2742] flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Project Category: <span className="text-slate-200">AI-Powered Programming Learning</span>
          </div>
          <button
            onClick={() => setArchitectureModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
}
