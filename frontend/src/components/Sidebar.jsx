import React from 'react';
import {
  LayoutDashboard,
  Code2,
  ListOrdered,
  Clock,
  FolderKanban,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Network,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const {
    activePage,
    navigateTo,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    setArchitectureModalOpen,
    studentProfile
  } = useApp();

  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'analyzer', label: 'Code Analyzer', icon: Code2, badge: 'Live AST' },
    { id: 'roadmap', label: 'Learning Path', icon: ListOrdered, badge: '5 Stages' },
    { id: 'history', label: 'History', icon: Clock, badge: null },
    { id: 'workspace', label: 'Student Workspace', icon: FolderKanban, badge: null },
  ];

  const bottomNavItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? '72px' : '260px',
          transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0b0f19] border-r border-[#1c2742] ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#1c2742]">
          <div
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  ClearPath
                  <span className="text-[10px] px-1.5 py-0.2 font-semibold bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded">
                    AI
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  Guided Code Learning
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-[#17223b] border border-transparent hover:border-[#253356] transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            {!sidebarCollapsed ? 'Platform Navigation' : '•••'}
          </div>

          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600/20 to-cyan-500/10 text-white border border-violet-500/40 shadow-sm shadow-violet-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131b2e]'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-violet-500/30 text-violet-300'
                        : 'bg-[#17223b] text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Active glow strip */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-violet-500 rounded-r-full" />
                )}
              </button>
            );
          })}

          {/* Presentation & Review Feature */}
          <div className="pt-4">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              {!sidebarCollapsed ? 'Capstone Project Review' : '•••'}
            </div>
            <button
              onClick={() => setArchitectureModalOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 transition-all group"
              title="System Flowchart & Capstone Review"
            >
              <Network className="w-5 h-5 flex-shrink-0 text-cyan-400" />
              {!sidebarCollapsed && (
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold">System Architecture</span>
                  <span className="text-[10px] text-cyan-400/80">Workflow & Stack Slides</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Student Mini Widget */}
        {!sidebarCollapsed && (
          <div className="mx-3 my-2 p-3 rounded-xl bg-gradient-to-b from-[#131b2e] to-[#0d1322] border border-[#1e293b]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                Topics Mastered
              </span>
              <span className="font-semibold text-violet-400">
                {studentProfile.completedTopicsCount}/{studentProfile.totalTopicsCount}
              </span>
            </div>
            <div className="w-full bg-[#1c2742] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round((studentProfile.completedTopicsCount / studentProfile.totalTopicsCount) * 100)}%`
                }}
              />
            </div>
          </div>
        )}

        {/* Bottom Profile & Settings */}
        <div className="p-3 border-t border-[#1c2742] space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-violet-600/20 text-white border border-violet-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131b2e]'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-slate-200" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}

          {/* Student Profile Pill */}
          {!sidebarCollapsed && (
            <div
              onClick={() => navigateTo('profile')}
              className="mt-2 pt-2 border-t border-[#1c2742] flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#131b2e] cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                RA
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {studentProfile.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {studentProfile.role.split(' ')[0]} • SEC Capstone
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
