import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Code2,
  Bot,
  Bell,
  RotateCcw,
  Check,
  ShieldAlert,
  Type,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { settings, setSettings, showToast } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleTheme = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
    showToast(`Switched theme to ${theme === 'light' ? 'Light Mode' : 'Dark Mode'}.`, 'info');
  };

  const handleFontSizeChange = (size) => {
    setSettings((prev) => ({ ...prev, editorFontSize: parseInt(size, 10) }));
    showToast(`Editor font size set to ${size}px.`, 'info');
  };

  const handleToggleLineNumbers = () => {
    setSettings((prev) => ({ ...prev, showLineNumbers: !prev.showLineNumbers }));
    showToast(`Line numbers ${!settings.showLineNumbers ? 'enabled' : 'hidden'}.`, 'info');
  };

  const handleToggleStreakReminder = () => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        streakReminder: !prev.notifications.streakReminder
      }
    }));
    showToast('Notification preference updated.', 'info');
  };

  const handleToggleComplexityAlerts = () => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        complexityAlerts: !prev.notifications.complexityAlerts
      }
    }));
    showToast('Notification preference updated.', 'info');
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('clearpath_settings');
    localStorage.removeItem('clearpath_roadmap');
    localStorage.removeItem('clearpath_history');
    localStorage.removeItem('clearpath_projects');
    localStorage.removeItem('clearpath_tasks');
    localStorage.removeItem('clearpath_profile');
    setShowResetConfirm(false);
    showToast('Settings & sample datasets restored to defaults. Refreshing...', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-[#12192e] to-[#0a0f1d] border border-[#253356] rounded-2xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-2">
          <SettingsIcon className="w-3.5 h-3.5 text-violet-400" />
          Platform Preferences
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Application Settings</h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Configure editor behavior, visual theme, AI mentor tone, and learning notifications.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Appearance & Theme */}
        <div className="cp-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1c2742]">
            <Moon className="w-4 h-4 text-violet-400" />
            <h3 className="font-bold text-white text-sm">Theme & Interface Appearance</h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-semibold text-white">Visual Mode</div>
              <p className="text-slate-400 text-[11px]">
                Choose between Linear/Vercel deep midnight dark theme or clean high-contrast light mode.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleTheme('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                    : 'bg-[#121a2f] text-slate-400 border-[#253356] hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark Theme</span>
              </button>

              <button
                onClick={() => handleToggleTheme('light')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  settings.theme === 'light'
                    ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                    : 'bg-[#121a2f] text-slate-400 border-[#253356] hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light Theme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Code Editor Preferences */}
        <div className="cp-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1c2742]">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Code Editor Preferences</h3>
          </div>

          {/* Font Size */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-semibold text-white">Editor Font Size</div>
              <p className="text-slate-400 text-[11px]">Adjust monospace code font size in the editor.</p>
            </div>

            <div className="flex items-center gap-1.5">
              {[12, 14, 16, 18].map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`px-3 py-1 rounded-lg border text-xs font-mono font-medium transition-all ${
                    settings.editorFontSize === size
                      ? 'bg-violet-600 text-white border-violet-500'
                      : 'bg-[#121a2f] text-slate-300 border-[#253356] hover:text-white'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>

          {/* Show Line Numbers */}
          <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1c2742]">
            <div>
              <div className="font-semibold text-white">Gutter Line Numbers</div>
              <p className="text-slate-400 text-[11px]">Display vertical line index column beside code.</p>
            </div>

            <button
              onClick={handleToggleLineNumbers}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.showLineNumbers ? 'bg-violet-600' : 'bg-[#1c2742]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.showLineNumbers ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Default Language */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-[#1c2742]">
            <div>
              <div className="font-semibold text-white">Default Programming Language</div>
              <p className="text-slate-400 text-[11px]">Initial syntax parser selection for new sessions.</p>
            </div>

            <select
              value={settings.defaultLanguage || 'python'}
              onChange={(e) => {
                setSettings({ ...settings, defaultLanguage: e.target.value });
                showToast(`Default language set to ${e.target.value}.`, 'info');
              }}
              className="bg-[#121a2f] border border-[#253356] text-xs text-slate-200 rounded-lg px-3 py-1.5"
            >
              <option value="python">Python 3 (Recommended)</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++ (Preview)</option>
              <option value="java">Java (Preview)</option>
            </select>
          </div>
        </div>

        {/* AI Mentor Preferences */}
        <div className="cp-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1c2742]">
            <Bot className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">AI Mentor Behavior</h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-semibold text-white">Guidance Personality</div>
              <p className="text-slate-400 text-[11px]">
                Control how the assistant balances conceptual hints versus direct code examples.
              </p>
            </div>

            <select
              value={settings.assistantPersona || 'beginner-friendly'}
              onChange={(e) => {
                setSettings({ ...settings, assistantPersona: e.target.value });
                showToast(`Mentor mode updated: ${e.target.value}.`, 'info');
              }}
              className="bg-[#121a2f] border border-[#253356] text-xs text-slate-200 rounded-lg px-3 py-1.5"
            >
              <option value="beginner-friendly">Beginner-Friendly & Encouraging</option>
              <option value="socratic-hints">Strict Socratic (Hints Only)</option>
              <option value="technical">Comprehensive CS Engineering</option>
            </select>
          </div>
        </div>

        {/* Notifications & Reminders */}
        <div className="cp-card p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1c2742]">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Learning Notifications & Alerts</h3>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-white">Daily Streak Reminder</div>
              <p className="text-slate-400 text-[11px]">Alert me to keep my daily coding streak alive.</p>
            </div>

            <button
              onClick={handleToggleStreakReminder}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.notifications?.streakReminder ? 'bg-violet-600' : 'bg-[#1c2742]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.notifications?.streakReminder ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1c2742]">
            <div>
              <div className="font-semibold text-white">Quadratic Complexity Warnings</div>
              <p className="text-slate-400 text-[11px]">
                Flag nested loop O(n²) bottlenecks during code analysis.
              </p>
            </div>

            <button
              onClick={handleToggleComplexityAlerts}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.notifications?.complexityAlerts ? 'bg-violet-600' : 'bg-[#1c2742]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.notifications?.complexityAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset Danger Zone */}
        <div className="cp-card p-5 border-rose-900/30 bg-rose-950/10 space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <h3 className="font-bold text-sm">Data & Storage Management</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reset all local browser storage, restoring initial sample projects, diagnostic runs, and
            roadmap progress to clean state.
          </p>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn btn-danger btn-sm text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Application Data</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121a2f] border border-[#253356] rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">Reset to Defaults?</h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              This will reset all your custom projects, tasks, analysis history, and profile edits
              back to default sample data.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn btn-secondary btn-sm px-4"
              >
                Cancel
              </button>
              <button onClick={handleResetDefaults} className="btn btn-danger btn-sm px-4">
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
