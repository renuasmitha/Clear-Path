import React from 'react';
import {
  Code2,
  GitBranch,
  Bot,
  FolderKanban,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Play,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Cpu,
  BookOpen,
  Server,
  Terminal,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const {
    navigateTo,
    studentProfile,
    historyList,
    loadHistoryToEditor,
    loadPreset,
    setSelectedTopic,
    roadmapStages,
    backendStatus,
    checkConnection
  } = useApp();

  const completionPercentage = Math.round(
    (studentProfile.completedTopicsCount / studentProfile.totalTopicsCount) * 100
  );

  const quickActions = [
    {
      title: 'Analyze Code',
      desc: 'Static AST inspection, line-by-line syntax checks & complexity',
      icon: Code2,
      page: 'analyzer',
      gradient: 'from-violet-600/20 to-purple-800/10',
      border: 'border-violet-500/30 hover:border-violet-500/60',
      iconColor: 'text-violet-400',
      badge: 'Interactive'
    },
    {
      title: 'Continue Learning',
      desc: 'Stage 2: Loops & Functions — 2 topics in progress',
      icon: GitBranch,
      page: 'roadmap',
      gradient: 'from-cyan-600/20 to-blue-800/10',
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      iconColor: 'text-cyan-400',
      badge: '5 Stages'
    },
    {
      title: 'Analysis History',
      desc: 'Inspect past error diagnoses, Big-O metrics & code evolution',
      icon: Clock,
      page: 'history',
      gradient: 'from-emerald-600/20 to-teal-800/10',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      iconColor: 'text-emerald-400',
      badge: 'Saved Sessions'
    },
    {
      title: 'Student Workspace',
      desc: 'Ongoing coding projects, assignment tasks & sandboxes',
      icon: FolderKanban,
      page: 'workspace',
      gradient: 'from-amber-600/20 to-orange-800/10',
      border: 'border-amber-500/30 hover:border-amber-500/60',
      iconColor: 'text-amber-400',
      badge: '3 Projects'
    }
  ];

  const recommendations = [
    {
      id: 'topic-arrays-1',
      title: 'Review Array Bounds & Slicing',
      reason: 'Based on recent IndexError in loop range boundary',
      difficulty: 'Intermediate',
      stage: 'Stage 3: Data Structures'
    },
    {
      id: 'topic-loops-nested',
      title: 'Nested Loops & Quadratic Time',
      reason: 'Understand O(n²) bottlenecks before your capstone review',
      difficulty: 'Intermediate',
      stage: 'Stage 2: Loops & Functions'
    },
    {
      id: 'topic-complexity-1',
      title: 'Big-O Asymptotic Notation',
      reason: 'Essential requirement for algorithm optimization analysis',
      difficulty: 'Intermediate',
      stage: 'Stage 4: Algorithms'
    }
  ];

  const handleOpenRecommendation = (topicId) => {
    let foundTopic = null;
    for (const stage of roadmapStages) {
      const match = stage.topics.find((t) => t.id === topicId);
      if (match) {
        foundTopic = match;
        break;
      }
    }
    if (foundTopic) {
      setSelectedTopic(foundTopic);
    } else {
      navigateTo('roadmap');
    }
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141b30] via-[#10172b] to-[#0c1222] border border-[#253356] p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            AI-Powered Code Analysis & Guided Learning Platform
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome back, {studentProfile.name}! 👋
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Let's make your next coding session count. ClearPath helps you understand the
            underlying causes behind syntax errors, inspect algorithm efficiency, and advance along
            your structured computer science roadmap.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('analyzer')}
              className="btn btn-primary btn-md shadow-lg shadow-violet-600/25 flex items-center gap-2 font-semibold"
            >
              <Code2 className="w-4 h-4" />
              Start Coding & Analysis
            </button>
            <button
              onClick={() => navigateTo('roadmap')}
              className="btn btn-secondary btn-md flex items-center gap-2 font-semibold"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
              View Learning Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div
              key={idx}
              onClick={() => navigateTo(action.page)}
              className={`cp-card cp-card-interactive bg-gradient-to-br ${action.gradient} ${action.border} flex flex-col justify-between p-5 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-[#090d16] border border-[#1c2742] ${action.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {action.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1c2742] text-slate-300">
                      {action.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-base mb-1 group-hover:text-violet-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{action.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1c2742] flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                <span>Open module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Overview & Diagnostics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Progress & Streak Card */}
        <div className="cp-card flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-400" />
                <h3 className="font-semibold text-white text-sm">Learning Progress</h3>
              </div>
              <span className="text-xs font-semibold text-violet-400">{completionPercentage}%</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#1c2742]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-violet-500"
                    strokeDasharray={`${completionPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white">
                  {studentProfile.completedTopicsCount}
                </span>
              </div>

              <div>
                <div className="text-xs font-medium text-white mb-0.5">
                  {studentProfile.completedTopicsCount} of {studentProfile.totalTopicsCount} Topics Mastered
                </div>
                <p className="text-[11px] text-slate-400">
                  Current focus: Stage 2 (Loops, Nested Structures & Scope).
                </p>
              </div>
            </div>

            {/* Weekly Activity Tracker */}
            <div className="p-3 rounded-xl bg-[#090d16] border border-[#1c2742] mb-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  7-Day Streak Active
                </span>
                <span className="text-slate-500">Every day counts</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {daysOfWeek.map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        i < 6
                          ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                          : 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/20 animate-pulse'
                      }`}
                    >
                      ✓
                    </div>
                    <span className="text-[9px] text-slate-500">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('roadmap')}
            className="w-full py-2 text-xs font-semibold rounded-xl bg-[#17223b] hover:bg-[#253356] text-white transition-colors text-center"
          >
            Explore Full Roadmap →
          </button>
        </div>

        {/* Center: Recommended Next Steps */}
        <div className="cp-card flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-white text-sm">Recommended For You</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                Adaptive
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Curated concepts suggested from recent code analysis patterns:
            </p>

            <div className="space-y-2">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleOpenRecommendation(rec.id)}
                  className="p-2.5 rounded-xl bg-[#0b0f19] hover:bg-[#17223b] border border-[#1c2742] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">
                      {rec.title}
                    </span>
                    <span className="text-[10px] text-slate-500">{rec.difficulty}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[10px] text-slate-500">
              ClearPath maps every detected error to a learning milestone.
            </span>
          </div>
        </div>

        {/* Right: Engine Status & Interactive Bug Samples Card */}
        <div className="cp-card flex flex-col justify-between p-5 bg-gradient-to-b from-[#121a2f] to-[#0d1322]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">Engine Status</h3>
              </div>
              <span
                onClick={checkConnection}
                className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold cursor-pointer ${
                  backendStatus.connected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                }`}
                title="Click to ping FastAPI backend"
              >
                {backendStatus.engine}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              Load realistic programming scenarios directly into the analyzer to see how ClearPath diagnoses issues:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  loadPreset('python_index_error');
                  navigateTo('analyzer');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-[#090d16] hover:bg-[#17223b] border border-[#1c2742] flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200">IndexError Boundary Trap</div>
                  <div className="text-[10px] text-rose-400">Off-by-one list range iteration</div>
                </div>
                <Play className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => {
                  loadPreset('python_zero_division');
                  navigateTo('analyzer');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-[#090d16] hover:bg-[#17223b] border border-[#1c2742] flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200">ZeroDivision Guard</div>
                  <div className="text-[10px] text-amber-400">Empty list defensive calculation</div>
                </div>
                <Play className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => {
                  loadPreset('python_inefficient_fib');
                  navigateTo('analyzer');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-[#090d16] hover:bg-[#17223b] border border-[#1c2742] flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200">Exponential Recursion O(2^n)</div>
                  <div className="text-[10px] text-violet-400">Fibonacci redundant tree computation</div>
                </div>
                <Play className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#1c2742] flex items-center justify-between text-xs text-slate-400">
            <span>Primary Language: Python</span>
            <span className="text-cyan-400 font-medium">Click any to test</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="cp-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h3 className="font-semibold text-white text-sm">Recent Analysis Sessions</h3>
          </div>
          <button
            onClick={() => navigateTo('history')}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            View Complete History ({historyList.length}) →
          </button>
        </div>

        {historyList.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No analysis sessions recorded yet. Start by writing or testing code in the Code Analyzer!
          </div>
        ) : (
          <div className="space-y-2">
            {historyList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#090d16] border border-[#1c2742] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#253356] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#121a2f] text-slate-300 mt-0.5">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-white">{item.title}</h4>
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
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs flex-shrink-0 self-end sm:self-center">
                  <span className="text-[11px] text-slate-500">{item.timestamp}</span>
                  <button
                    onClick={() => loadHistoryToEditor(item)}
                    className="px-2.5 py-1 rounded-lg bg-[#17223b] hover:bg-[#253356] text-slate-200 text-xs font-medium transition-colors"
                  >
                    Open in Editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
