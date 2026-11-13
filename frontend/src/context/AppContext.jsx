import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SAMPLE_CODES,
  INITIAL_ROADMAP_STAGES,
  INITIAL_HISTORY,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_STUDENT_PROFILE
} from '../data/mockData';
import {
  analyzeCodeLocal,
  analyzeCodeWithBackend,
  executeCodeWithBackend,
  checkBackendHealth
} from '../services/analyzerEngine';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Backend Connection Health State
  const [backendStatus, setBackendStatus] = useState({
    connected: false,
    checking: true,
    engine: 'Checking...'
  });

  const checkConnection = async () => {
    setBackendStatus((prev) => ({ ...prev, checking: true }));
    const health = await checkBackendHealth();
    if (health.connected) {
      setBackendStatus({
        connected: true,
        checking: false,
        engine: 'FastAPI AST Engine (Live)'
      });
    } else {
      setBackendStatus({
        connected: false,
        checking: false,
        engine: 'Client AST Engine (Active)'
      });
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 15000);
    return () => clearInterval(interval);
  }, []);

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('clearpath_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      theme: 'dark',
      editorFontSize: 14,
      tabSize: 4,
      showLineNumbers: true,
      autoCloseBrackets: true,
      defaultLanguage: 'python',
      assistantPersona: 'beginner-friendly',
      notifications: {
        streakReminder: true,
        complexityAlerts: true
      }
    };
  });

  // Theme Sync
  useEffect(() => {
    localStorage.setItem('clearpath_settings', JSON.stringify(settings));
    if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [settings]);

  // Code Analyzer State
  const [editorLanguage, setEditorLanguage] = useState(settings.defaultLanguage || 'python');
  const [editorCode, setEditorCode] = useState(SAMPLE_CODES.python_index_error.code);
  const [customInput, setCustomInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(() => {
    return analyzeCodeLocal(SAMPLE_CODES.python_index_error.code, 'python');
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('overview');

  // Learning Roadmap State
  const [roadmapStages, setRoadmapStages] = useState(() => {
    const saved = localStorage.getItem('clearpath_roadmap');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ROADMAP_STAGES;
  });

  useEffect(() => {
    localStorage.setItem('clearpath_roadmap', JSON.stringify(roadmapStages));
  }, [roadmapStages]);

  const [selectedTopic, setSelectedTopic] = useState(null);

  // History State
  const [historyList, setHistoryList] = useState(() => {
    const saved = localStorage.getItem('clearpath_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_HISTORY;
  });

  useEffect(() => {
    localStorage.setItem('clearpath_history', JSON.stringify(historyList));
  }, [historyList]);

  // Workspace Projects & Tasks
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('clearpath_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROJECTS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('clearpath_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('clearpath_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('clearpath_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Profile State
  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('clearpath_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('clearpath_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  // Presentation Flowchart Modal
  const [isArchitectureModalOpen, setArchitectureModalOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Analysis (Async with backend bridge)
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeCodeWithBackend(editorCode, editorLanguage, customInput);
      setAnalysisResult(res);
      setIsAnalyzing(false);

      const newHistoryItem = {
        id: 'hist-' + Date.now(),
        timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        title: editorCode.split('\n')[0].replace('#', '').trim() || 'Code Analysis Session',
        language: editorLanguage,
        status: res.status === 'clean' ? 'Optimal Clean' : (res.status === 'error' ? 'Errors Found' : 'Optimization Advice'),
        statusType: res.status === 'clean' ? 'success' : (res.status === 'error' ? 'error' : 'warning'),
        issuesCount: res.issues_count ?? res.issuesCount,
        complexity: `${res.complexity.time} Time / ${res.complexity.space} Space`,
        codeSnippet: editorCode.slice(0, 80) + '...',
        notes: res.issues[0]?.message || 'Code analyzed successfully.'
      };

      setHistoryList((prev) => [newHistoryItem, ...prev]);
      setStudentProfile((prev) => ({
        ...prev,
        analysesRun: prev.analysesRun + 1,
        xpPoints: prev.xpPoints + 15
      }));

      const count = res.issues_count ?? res.issuesCount ?? 0;
      if (count > 0) {
        showToast(`Analysis complete: ${count} issue(s) identified. (${res.source})`, 'warning');
      } else {
        showToast(`Analysis complete: Clean & optimal! +15 XP (${res.source})`, 'success');
      }
    } catch (e) {
      const localRes = analyzeCodeLocal(editorCode, editorLanguage, customInput);
      setAnalysisResult(localRes);
      setIsAnalyzing(false);
      showToast('Analysis completed via client engine.', 'info');
    }
  };

  // Trigger Execution: Executes true Python (FastAPI Runner or in-browser Python Runtime)
  const runExecution = async () => {
    setIsRunning(true);
    try {
      const execRes = await executeCodeWithBackend(editorCode, editorLanguage, customInput);
      setAnalysisResult((prev) => ({
        ...prev,
        execution: execRes
      }));
      setIsRunning(false);
      const exitCode = execRes.exit_code ?? execRes.exitCode ?? 0;
      if (exitCode === 0) {
        showToast(`Executed successfully with return code 0 (${execRes.source})`, 'success');
      } else {
        showToast(`Program terminated with non-zero exit code 1 (${execRes.source})`, 'error');
      }
    } catch (err) {
      setIsRunning(false);
      showToast('Execution error occurred.', 'error');
    }
  };

  // Load Preset Code
  const loadPreset = (presetKey) => {
    const preset = SAMPLE_CODES[presetKey];
    if (preset) {
      setEditorCode(preset.code);
      setEditorLanguage('python');
      setCustomInput(preset.input || '');
      const res = analyzeCodeLocal(preset.code, 'python', preset.input || '');
      setAnalysisResult(res);
      showToast(`Loaded scenario: "${preset.name}"`, 'info');
    }
  };

  // Toggle Roadmap Topic Status
  const toggleTopicStatus = (topicId) => {
    let newStatus = 'completed';
    setRoadmapStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        topics: stage.topics.map((t) => {
          if (t.id === topicId) {
            newStatus = t.status === 'completed' ? 'not-started' : 'completed';
            return { ...t, status: newStatus };
          }
          return t;
        })
      }))
    );

    setTimeout(() => {
      setRoadmapStages((currentStages) => {
        let completedCount = 0;
        currentStages.forEach((stage) => {
          stage.topics.forEach((t) => {
            if (t.status === 'completed') completedCount++;
          });
        });
        setStudentProfile((prev) => ({
          ...prev,
          completedTopicsCount: completedCount
        }));
        return currentStages;
      });
    }, 50);

    showToast(`Topic updated: ${newStatus === 'completed' ? 'Marked as completed! 🎉' : 'Reset to not-started'}`, 'info');
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addProject = (projectData) => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: projectData.title,
      description: projectData.description,
      language: projectData.language || 'Python',
      status: 'In Progress',
      updatedAt: 'Just now',
      tags: projectData.tags ? projectData.tags.split(',').map((t) => t.trim()) : ['Personal']
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${newProj.title}" created successfully!`, 'success');
  };

  const deleteHistoryEntry = (id) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
    showToast('Session removed from history.', 'info');
  };

  const clearAllHistory = () => {
    setHistoryList([]);
    showToast('Analysis history cleared.', 'info');
  };

  const loadHistoryToEditor = (historyItem) => {
    setEditorLanguage(historyItem.language || 'python');
    setEditorCode(historyItem.fullCode || `# Restored from history: ${historyItem.title}\n${historyItem.codeSnippet}`);
    navigateTo('analyzer');
    showToast(`Loaded "${historyItem.title}" into Code Analyzer.`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        navigateTo,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        backendStatus,
        checkConnection,
        settings,
        setSettings,
        editorLanguage,
        setEditorLanguage,
        editorCode,
        setEditorCode,
        customInput,
        setCustomInput,
        analysisResult,
        isAnalyzing,
        isRunning,
        activeResultTab,
        setActiveResultTab,
        runAnalysis,
        runExecution,
        loadPreset,
        roadmapStages,
        selectedTopic,
        setSelectedTopic,
        toggleTopicStatus,
        historyList,
        deleteHistoryEntry,
        clearAllHistory,
        loadHistoryToEditor,
        projects,
        tasks,
        toggleTask,
        addProject,
        studentProfile,
        setStudentProfile,
        isArchitectureModalOpen,
        setArchitectureModalOpen,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
