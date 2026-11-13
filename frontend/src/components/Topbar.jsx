import React, { useState } from 'react';
import {
  Menu,
  Search,
  Flame,
  Award,
  Bell,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  X,
  Network,
  Activity,
  Server
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Topbar() {
  const {
    activePage,
    navigateTo,
    sidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    studentProfile,
    setArchitectureModalOpen,
    backendStatus,
    checkConnection,
    showToast
  } = useApp();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitles = {
    dashboard: 'Dashboard',
    analyzer: 'Code Analyzer & Live Debugger',
    roadmap: 'Personalized Learning Path',
    assistant: 'ClearPath AI Mentor',
    history: 'Analysis History',
    workspace: 'Student Workspace',
    profile: 'Student Profile',
    settings: 'Platform Settings'
  };

  const sampleNotifications = [
    {
      id: 1,
      title: 'Boundary Trap Warning',
      time: '10m ago',
      type: 'warning',
      text: 'IndexError detected in recent run. Review topic "Arrays & Lists Bounds".'
    },
    {
      id: 2,
      title: 'Streak Milestone!',
      time: '2h ago',
      type: 'success',
      text: 'You reached a 7-day learning streak. Keep up the consistent practice!'
    },
    {
      id: 3,
      title: 'New Concept Recommendation',
      time: 'Yesterday',
      type: 'info',
      text: 'Explore "Two-Sum with Hash Maps" for an efficient O(n) alternative.'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('index') || q.includes('error') || q.includes('code') || q.includes('debug')) {
      navigateTo('analyzer');
      showToast(`Navigated to Code Analyzer for "${searchQuery}"`, 'info');
    } else if (q.includes('path') || q.includes('loop') || q.includes('array') || q.includes('recursion')) {
      navigateTo('roadmap');
      showToast(`Searching Learning Path for "${searchQuery}"`, 'info');
    } else if (q.includes('ai') || q.includes('ask') || q.includes('help')) {
      navigateTo('assistant');
      showToast(`Opening AI Assistant for "${searchQuery}"`, 'info');
    } else {
      showToast(`Showing results for "${searchQuery}" across platform`, 'info');
    }
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[#090d16]/90 backdrop-blur-md border-b border-[#1c2742] flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-300 hover:text-white hover:bg-[#17223b]"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">ClearPath</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <h1 className="text-sm font-semibold text-white tracking-tight">
            {pageTitles[activePage] || 'Platform'}
          </h1>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden lg:flex items-center max-w-md w-full mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, errors, topics, or ask AI..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#121a2f] border border-[#253356] rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Right Actions: Backend Engine Pill, Flowchart Pill, Streak, XP, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Backend Live Connection Badge */}
        <div
          onClick={checkConnection}
          className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-lg border cursor-pointer transition-all ${
            backendStatus.connected
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-violet-500/10 text-violet-300 border-violet-500/30 hover:bg-violet-500/20'
          }`}
          title="Click to re-check FastAPI backend health (http://127.0.0.1:8000)"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              backendStatus.connected
                ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse'
                : 'bg-violet-400'
            }`}
          />
          <Server className="w-3 h-3 opacity-80" />
          <span>{backendStatus.engine}</span>
        </div>

        {/* Presentation & Review Modal Trigger */}
        <button
          onClick={() => setArchitectureModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 transition-all"
          title="Open SEC Capstone Review Architecture"
        >
          <Network className="w-3.5 h-3.5" />
          <span>System Flowchart</span>
        </button>

        {/* Daily Streak */}
        <div
          onClick={() => showToast(`7-day streak! Active learning habit recorded.`, 'info')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold cursor-pointer hover:bg-amber-500/20 transition-colors"
          title="Active coding streak"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{studentProfile.streakDays}d</span>
        </div>

        {/* XP Points */}
        <div
          onClick={() => showToast(`${studentProfile.xpPoints} XP earned across analyses and lessons.`, 'info')}
          className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold cursor-pointer hover:bg-violet-500/20 transition-colors"
          title="Earned experience points"
        >
          <Award className="w-3.5 h-3.5 text-violet-400" />
          <span>{studentProfile.xpPoints} XP</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#121a2f] border border-[#253356] text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-[#121a2f] border border-[#253356] rounded-2xl shadow-2xl p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1c2742]">
                <span className="text-xs font-semibold text-white">Notifications & Alerts</span>
                <button
                  onClick={() => setNotificationOpen(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2">
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setNotificationOpen(false);
                      navigateTo('roadmap');
                    }}
                    className="p-2.5 rounded-xl bg-[#0b0f19] hover:bg-[#17223b] border border-[#1c2742] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-200">{notif.title}</span>
                      <span className="text-[10px] text-slate-500">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{notif.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-[#1c2742] text-center">
                <button
                  onClick={() => {
                    setNotificationOpen(false);
                    navigateTo('roadmap');
                  }}
                  className="text-xs text-violet-400 hover:text-violet-300 font-medium"
                >
                  View Recommended Next Steps →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Student Mini Avatar */}
        <div
          onClick={() => navigateTo('profile')}
          className="flex items-center gap-2 cursor-pointer pl-1 group"
          title="Open Profile"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md group-hover:ring-2 group-hover:ring-violet-400/50 transition-all">
            RA
          </div>
        </div>
      </div>
    </header>
  );
}
