import React, { useState } from 'react';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  Check,
  Circle,
  Lightbulb,
  Search,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LearningPath() {
  const {
    roadmapStages,
    setSelectedTopic,
    toggleTopicStatus,
    studentProfile,
    showToast
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'completed' | 'in-progress' | 'recommended'
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = studentProfile.completedTopicsCount;
  const totalCount = studentProfile.totalTopicsCount;
  const overallPercentage = Math.round((completedCount / totalCount) * 100);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="badge badge-emerald">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="badge badge-cyan">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case 'recommended':
        return (
          <span className="badge badge-violet">
            <Sparkles className="w-3 h-3" /> Recommended
          </span>
        );
      default:
        return (
          <span className="badge badge-neutral">
            <Circle className="w-3 h-3" /> Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#12192e] via-[#0f1629] to-[#0a0f1d] border border-[#253356] p-6 sm:p-7 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              Structured CS Roadmap & Milestones
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
              Personalized Programming Learning Path
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transform coding errors into structured learning milestones. Follow our 5-stage progression from core syntax to algorithmic complexity and clean object-oriented architecture.
            </p>
          </div>

          {/* Progress Widget */}
          <div className="p-4 rounded-xl bg-[#090d16]/80 border border-[#1c2742] min-w-[240px] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300">Milestone Completion</span>
              <span className="text-cyan-400 font-bold">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-[#1c2742] h-2 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{completedCount} topics finished</span>
              <span>{totalCount - completedCount} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended for You Spotlight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/30 to-indigo-950/20 border border-violet-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 mt-0.5">
            <Lightbulb className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Adaptive Recommendation from Code Analyzer
              </h3>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-violet-500/30 text-violet-300 font-semibold">
                Priority
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Because you encountered an <strong>IndexError</strong> in list iteration, we recommend mastering:
              <span className="text-cyan-300 font-medium"> "Arrays & Lists: Bounds & Slicing"</span>.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            for (const stage of roadmapStages) {
              const topic = stage.topics.find((t) => t.id === 'topic-arrays-1');
              if (topic) {
                setSelectedTopic(topic);
                break;
              }
            }
          }}
          className="btn btn-primary btn-sm font-semibold flex-shrink-0"
        >
          Open Recommended Lesson →
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0d1322] border border-[#1c2742] rounded-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-500 text-xs font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 'completed', 'in-progress', 'recommended'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors font-medium ${
                statusFilter === filter
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#17223b]'
              }`}
            >
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, prereqs..."
            className="w-full pl-8 pr-3 py-1 text-xs bg-[#121a2f] border border-[#253356] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Roadmap Stages */}
      <div className="space-y-6">
        {roadmapStages.map((stage, stageIdx) => {
          // Filter topics within stage
          const filteredTopics = stage.topics.filter((topic) => {
            const matchesFilter =
              statusFilter === 'all' ? true : topic.status === statusFilter;
            const matchesSearch =
              searchQuery.trim() === ''
                ? true
                : topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  topic.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
          });

          if (filteredTopics.length === 0 && searchQuery) return null;

          const stageCompletedCount = stage.topics.filter((t) => t.status === 'completed').length;
          const stageTotal = stage.topics.length;

          return (
            <div key={stage.id} className="space-y-3">
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#1c2742]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center font-bold text-xs">
                    {stageIdx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{stage.title}</h3>
                    <p className="text-xs text-slate-400">{stage.description}</p>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-400">
                  {stageCompletedCount}/{stageTotal} Done
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-4 rounded-xl bg-[#0d1322] hover:bg-[#121a2f] border border-[#1c2742] hover:border-[#253356] flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        {getStatusBadge(topic.status)}
                        <span className="text-[10px] text-slate-500 font-mono">
                          {topic.duration}
                        </span>
                      </div>

                      <h4
                        onClick={() => setSelectedTopic(topic)}
                        className="font-bold text-white text-sm cursor-pointer group-hover:text-violet-300 transition-colors mb-1"
                      >
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                        {topic.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1c2742] flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1"
                      >
                        <span>Lesson Details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => toggleTopicStatus(topic.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          topic.status === 'completed'
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-[#17223b] border-[#253356] text-slate-400 hover:text-white'
                        }`}
                        title={
                          topic.status === 'completed'
                            ? 'Completed! Click to reset'
                            : 'Mark as completed'
                        }
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
