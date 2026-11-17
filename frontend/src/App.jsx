import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ToastContainer from './components/ToastContainer';
import SystemArchitectureModal from './components/SystemArchitectureModal';
import TopicDetailModal from './components/TopicDetailModal';

// Pages
import Dashboard from './pages/Dashboard';
import CodeAnalyzer from './pages/CodeAnalyzer';
import LearningPath from './pages/LearningPath';
import History from './pages/History';
import Workspace from './pages/Workspace';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AIAssistant from './pages/AIAssistant';

export default function App() {
  const { activePage, sidebarCollapsed } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analyzer':
        return <CodeAnalyzer />;
      case 'ai-assistant': 
        return <AIAssistant />;
      case 'roadmap':
        return <LearningPath />;
      case 'history':
        return <History />;
      case 'workspace':
        return <Workspace />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Presentation / Architecture Review Modal */}
      <SystemArchitectureModal />

      {/* Learning Topic Details Modal */}
      <TopicDetailModal />

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`main-wrapper min-h-screen flex flex-col transition-all duration-200 ${
          sidebarCollapsed
            ? 'md:ml-[72px] md:w-[calc(100%-72px)]'
            : 'md:ml-[260px] md:w-[calc(100%-260px)]'
        } ml-0 w-full`}
      >
        {/* Sticky Topbar */}
        <Topbar />

        {/* Dynamic Page Content */}
        <main className="page-content">
          {renderActivePage()}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto py-5 px-6 border-t border-[#1c2742] bg-[#080c14] text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">ClearPath</span>
            <span>•</span>
            <span>Understand the code. Discover the way forward.</span>
          </div>
          <div className="text-slate-400">
            Presented by <span className="text-slate-200 font-medium">Renu Asmitha T</span> — B.Tech Computer Science Engineering (SEC Capstone)
          </div>
        </footer>
      </div>
    </div>
  );
}
