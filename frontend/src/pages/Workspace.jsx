import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ListTodo,
  ExternalLink,
  Tag,
  BookOpen,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Workspace() {
  const {
    projects,
    addProject,
    tasks,
    toggleTask,
    navigateTo,
    setEditorCode,
    showToast
  } = useApp();

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLang, setNewLang] = useState('Python');
  const [newTags, setNewTags] = useState('');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Project title is required.', 'warning');
      return;
    }
    addProject({
      title: newTitle,
      description: newDesc || 'Student coursework project.',
      language: newLang,
      tags: newTags || 'Capstone'
    });
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setShowNewProjectModal(false);
  };

  const handleLaunchProject = (project) => {
    setEditorCode(
      `# Project: ${project.title}\n` +
        `# Language: ${project.language}\n` +
        `# Status: ${project.status}\n\n` +
        `def main():\n` +
        `    print("Running ${project.title}...")\n\n` +
        `if __name__ == "__main__":\n` +
        `    main()\n`
    );
    navigateTo('analyzer');
    showToast(`Loaded "${project.title}" into workspace editor.`, 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#12192e] to-[#0a0f1d] border border-[#253356] rounded-2xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-amber-400" />
            Personal Development Environment
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Student Workspace</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage your personal coding projects, assignments, and active learning goals in one place.
          </p>
        </div>

        <button
          onClick={() => setShowNewProjectModal(true)}
          className="btn btn-primary btn-md font-semibold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Main Grid: Projects (left) & Tasks/Goals (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1c2742]">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-violet-400" />
              My Projects ({projects.length})
            </h3>
            <span className="text-xs text-slate-400">Click any project to load into editor</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="cp-card flex flex-col justify-between p-5 hover:border-[#253356] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#17223b] text-slate-300">
                      {proj.language}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        proj.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : proj.status === 'Needs Optimization'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm mb-1 group-hover:text-violet-300 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2">{proj.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.tags &&
                      proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.2 rounded bg-[#090d16] text-slate-400 border border-[#1c2742]"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1c2742] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500">Updated {proj.updatedAt}</span>
                  <button
                    onClick={() => handleLaunchProject(proj)}
                    className="btn btn-secondary btn-sm text-xs flex items-center gap-1 text-slate-200 group-hover:border-violet-500/50"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3 h-3 text-violet-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Active Learning Tasks & Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1c2742]">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-cyan-400" />
              Study Tasks ({tasks.filter((t) => t.completed).length}/{tasks.length})
            </h3>
            <span className="text-xs text-slate-400">Interactive</span>
          </div>

          <div className="cp-card p-4 space-y-3">
            <p className="text-xs text-slate-400 mb-2">
              Check off tasks as you debug errors and progress through roadmap milestones:
            </p>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-emerald-950/15 border-emerald-900/30 text-slate-400'
                      : 'bg-[#121a2f] border-[#1c2742] text-slate-200 hover:border-[#253356]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="mt-0.5 rounded accent-violet-500 cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className={task.completed ? 'line-through text-slate-500' : 'font-medium'}>
                      {task.title}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 text-slate-400 border border-white/5">
                        {task.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1c2742] flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Tasks persist in browser storage.</span>
              <button
                onClick={() => navigateTo('roadmap')}
                className="text-violet-400 hover:text-violet-300 font-semibold text-xs"
              >
                Go to Roadmap →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121a2f] border border-[#253356] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1c2742]">
              <h3 className="font-bold text-white text-base">Create New Project</h3>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Project Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Graph Traversal Visualizer"
                  className="w-full bg-[#090d16] border border-[#253356] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief summary of what this program solves..."
                  rows={3}
                  className="w-full bg-[#090d16] border border-[#253356] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Language</label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full bg-[#090d16] border border-[#253356] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="C++">C++</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="Algorithms, BST"
                    className="w-full bg-[#090d16] border border-[#253356] rounded-xl px-3 py-2 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#1c2742] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
