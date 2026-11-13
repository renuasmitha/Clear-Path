import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ClearPath Root Error Caught:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('clearpath_profile');
      localStorage.removeItem('clearpath_roadmap');
      localStorage.removeItem('clearpath_history');
      localStorage.removeItem('clearpath_projects');
      localStorage.removeItem('clearpath_tasks');
      localStorage.removeItem('clearpath_settings');
    } catch (e) {
      /* ignore */
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070a12] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 bg-[#0d1322] border border-[#253356] rounded-2xl shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold">
              !
            </div>
            <h2 className="text-lg font-bold">Something went wrong during loading</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono bg-[#05070d] p-3 rounded-lg border border-[#1c2742] text-left overflow-auto max-h-32">
              {this.state.error?.message || 'Unknown runtime error'}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-violet-600/30 transition-all"
            >
              Reset Session Cache & Reload ClearPath
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
