import React, { useState } from 'react';
import {
  User,
  Award,
  Flame,
  BookOpen,
  Code2,
  Calendar,
  Sparkles,
  Edit3,
  Check,
  X,
  GraduationCap,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { studentProfile, setStudentProfile, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: studentProfile.name,
    username: studentProfile.username,
    bio: studentProfile.bio,
    role: studentProfile.role,
    preferredLanguage: studentProfile.preferredLanguage
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Name cannot be empty.', 'warning');
      return;
    }
    setStudentProfile((prev) => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    showToast('Student profile updated successfully!', 'success');
  };

  const achievements = [
    {
      title: 'Boundary Trap Buster',
      desc: 'Diagnosed and fixed 5 IndexError and off-by-one boundary traps.',
      icon: '🛡️',
      unlocked: true
    },
    {
      title: '7-Day Coding Streak',
      desc: 'Consistently logged in and analyzed code for 7 consecutive days.',
      icon: '🔥',
      unlocked: true
    },
    {
      title: 'Zero Division Guard',
      desc: 'Added defensive validation checks to protect empty input sets.',
      icon: '⚡',
      unlocked: true
    },
    {
      title: 'Algorithmic Optimizer',
      desc: 'Transformed an O(n²) solution to optimal O(n) using Hash Maps.',
      icon: '🚀',
      unlocked: true
    },
    {
      title: 'Recursion Master',
      desc: 'Formulated base cases and unwound deep recursive call stacks.',
      icon: '🌳',
      unlocked: false
    },
    {
      title: 'Clean Code Artisan',
      desc: 'Wrote 10 solutions with 100% clean AST compilation scores.',
      icon: '✨',
      unlocked: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Profile Card Header */}
      <div className="cp-card relative overflow-hidden bg-gradient-to-r from-[#12192e] to-[#0a0f1d] p-6 sm:p-8 border-[#253356]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-xl flex-shrink-0 border-2 border-white/10">
              RA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {studentProfile.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  @{studentProfile.username}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                {studentProfile.role}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {studentProfile.institution}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary btn-sm flex items-center gap-1.5 self-start sm:self-center"
          >
            <Edit3 className="w-3.5 h-3.5 text-violet-400" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        <div className="mt-5 pt-4 border-t border-[#1c2742]">
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            {studentProfile.bio}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="cp-card p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-semibold">Streak</span>
          </div>
          <div className="text-2xl font-bold text-white">{studentProfile.streakDays} Days</div>
          <span className="text-[10px] text-slate-400">Daily learning habit</span>
        </div>

        <div className="cp-card p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-violet-400 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-xs font-semibold">XP Earned</span>
          </div>
          <div className="text-2xl font-bold text-white">{studentProfile.xpPoints}</div>
          <span className="text-[10px] text-slate-400">Experience points</span>
        </div>

        <div className="cp-card p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
            <Code2 className="w-4 h-4" />
            <span className="text-xs font-semibold">Analyses Run</span>
          </div>
          <div className="text-2xl font-bold text-white">{studentProfile.analysesRun}</div>
          <span className="text-[10px] text-slate-400">AST inspections</span>
        </div>

        <div className="cp-card p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-semibold">Concepts</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {studentProfile.completedTopicsCount}/{studentProfile.totalTopicsCount}
          </div>
          <span className="text-[10px] text-slate-400">Roadmap milestones</span>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="cp-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1c2742]">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Earned Learning Badges ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
          </h3>
          <span className="text-xs text-slate-400">SEC Capstone Milestones</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                item.unlocked
                  ? 'bg-[#121a2f] border-[#253356]'
                  : 'bg-[#090d16] border-[#1c2742] opacity-50'
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-xs">{item.title}</h4>
                  {item.unlocked && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121a2f] border border-[#253356] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1c2742]">
              <h3 className="font-bold text-white text-base">Edit Profile Information</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#090d16] border border-[#253356] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-[#090d16] border border-[#253356] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Academic Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#090d16] border border-[#253356] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Short Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-[#090d16] border border-[#253356] rounded-xl p-3 text-white resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1c2742] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
