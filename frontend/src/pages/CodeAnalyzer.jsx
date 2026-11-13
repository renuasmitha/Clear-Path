import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Terminal,
  Layers,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Cpu,
  FileCode,
  Zap,
  Code,
  CheckSquare,
  Square,
  XCircle,
  Plus,
  Trash2,
  Target,
  Compass,
  ExternalLink,
  Wand2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { executeCodeWithBackend } from '../services/analyzerEngine';

export default function CodeAnalyzer() {
  const {
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
    navigateTo,
    setSelectedTopic,
    roadmapStages,
    settings,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [customTestCases, setCustomTestCases] = useState([]);
  const [newTestInput, setNewTestInput] = useState('');
  const [newTestExpected, setNewTestExpected] = useState('');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [completedTopicIds, setCompletedTopicIds] = useState(new Set());
  const prevCodeRef = useRef('');

  // ── Auto-sync test cases whenever the code in the editor changes ──
  useEffect(() => {
    if (editorCode.trim() === prevCodeRef.current) return;
    prevCodeRef.current = editorCode.trim();
    if (editorCode.trim()) generateTestsForCode(editorCode);
  }, [editorCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorCode);
    setCopied(true);
    showToast('Code copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearCode = () => {
    setEditorCode('');
    showToast('Editor cleared.', 'info');
  };

  // Add custom test case
  const handleAddTestCase = (e) => {
    e.preventDefault();
    if (!newTestInput.trim()) {
      showToast('Please enter a test input expression or assertion.', 'warning');
      return;
    }
    const newTC = {
      id: Date.now(),
      input: newTestInput.trim(),
      expected: newTestExpected.trim(),
      actual: '',
      status: 'untested'
    };
    setCustomTestCases((prev) => [...prev, newTC]);
    setNewTestInput('');
    setNewTestExpected('');
    showToast('Test case added.', 'info');
  };

  const handleDeleteTestCase = (id) => {
    setCustomTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  // ── Core logic: generate test cases from code (called on code change and on button click) ──
  const generateTestsForCode = (code) => {
    const generated = [];
    const fnMatches = [...code.matchAll(/def\s+(\w+)\s*\((.*?)\)\s*:/g)];
    const hasInput = /\binput\s*\(/.test(code);
    const codeLines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    const printLines = codeLines.filter(l => l.includes('print('));

    if (fnMatches.length > 0) {
      // Code defines functions — generate call-based tests
      for (const m of fnMatches) {
        const fnName = m[1];
        const params = m[2].split(',').map(p => p.trim().split('=')[0].trim()).filter(Boolean);

        if (params.length === 0) {
          generated.push({ id: generated.length + 1, input: `${fnName}()`, expected: '', actual: '', status: 'untested' });
        } else if (params.length === 1) {
          const p = params[0].toLowerCase();
          if (p.includes('str') || p === 's' || p === 'text' || p === 'word') {
            generated.push({ id: generated.length + 1, input: `print(${fnName}("hello"))`, expected: '', actual: '', status: 'untested' });
            generated.push({ id: generated.length + 1, input: `print(${fnName}(""))`, expected: '', actual: '', status: 'untested' });
            generated.push({ id: generated.length + 1, input: `print(${fnName}("clearpath"))`, expected: '', actual: '', status: 'untested' });
          } else if (p.includes('list') || p.includes('arr') || p === 'nums' || p === 'items') {
            generated.push({ id: generated.length + 1, input: `print(${fnName}([1, 2, 3]))`, expected: '', actual: '', status: 'untested' });
            generated.push({ id: generated.length + 1, input: `print(${fnName}([]))`, expected: '', actual: '', status: 'untested' });
            generated.push({ id: generated.length + 1, input: `print(${fnName}([-1, 0, 5]))`, expected: '', actual: '', status: 'untested' });
          } else {
            generated.push({ id: generated.length + 1, input: `print(${fnName}(5))`, expected: '', actual: '', status: 'untested' });
            generated.push({ id: generated.length + 1, input: `print(${fnName}(0))`, expected: '', actual: '', status: 'untested' });
            generated.push({ id: generated.length + 1, input: `print(${fnName}(10))`, expected: '', actual: '', status: 'untested' });
          }
        } else if (params.length === 2) {
          generated.push({ id: generated.length + 1, input: `print(${fnName}(3, 4))`, expected: '', actual: '', status: 'untested' });
          generated.push({ id: generated.length + 1, input: `print(${fnName}(0, 0))`, expected: '', actual: '', status: 'untested' });
          generated.push({ id: generated.length + 1, input: `print(${fnName}(10, 5))`, expected: '', actual: '', status: 'untested' });
        } else {
          generated.push({ id: generated.length + 1, input: `print(${fnName}(${params.map(() => '1').join(', ')}))`, expected: '', actual: '', status: 'untested' });
        }
        if (generated.length >= 3) break;
      }
    } else if (hasInput) {
      // Code uses input() — generate stdin-based tests
      // Detect how many input() calls there are
      const inputCallCount = (code.match(/\binput\s*\(/g) || []).length;
      // Detect if it uses int(input(...))
      const usesInt = /int\s*\(\s*input/.test(code);
      const usesFloat = /float\s*\(\s*input/.test(code);

      if (inputCallCount === 1) {
        const val1 = usesFloat ? '3.14' : usesInt ? '5' : 'hello';
        const val2 = usesFloat ? '0.0' : usesInt ? '0' : '';
        const val3 = usesFloat ? '100.0' : usesInt ? '42' : 'world';
        generated.push({ id: 1, input: 'Run with stdin', expected: '', actual: '', status: 'untested', stdin: val1,
          display: `Input: "${val1}"` });
        generated.push({ id: 2, input: 'Run with stdin', expected: '', actual: '', status: 'untested', stdin: val2,
          display: `Input: "${val2}" (edge: zero/empty)` });
        generated.push({ id: 3, input: 'Run with stdin', expected: '', actual: '', status: 'untested', stdin: val3,
          display: `Input: "${val3}"` });
      } else {
        // Multiple inputs — generate multiline stdin
        const lines = usesInt ? ['5', '10'] : usesFloat ? ['3.14', '2.71'] : ['hello', 'world'];
        generated.push({ id: 1, input: 'Run with stdin', expected: '', actual: '', status: 'untested',
          stdin: lines.join('\n'), display: `Inputs: ${lines.map(l => `"${l}"`).join(', ')}` });
        generated.push({ id: 2, input: 'Run with stdin', expected: '', actual: '', status: 'untested',
          stdin: Array(inputCallCount).fill('0').join('\n'), display: `Inputs: all zeros (edge case)` });
      }
    } else if (printLines.length > 0) {
      // Simple script with print statements
      printLines.slice(0, 3).forEach((line, idx) => {
        generated.push({
          id: idx + 1,
          input: line.trim(),
          expected: '',
          actual: '',
          status: 'untested'
        });
      });
    } else {
      // Fallback
      generated.push({ id: 1, input: 'print("Hello, ClearPath!")', expected: 'Hello, ClearPath!', actual: '', status: 'untested' });
      generated.push({ id: 2, input: 'print(2 + 3)', expected: '5', actual: '', status: 'untested' });
    }

    setCustomTestCases(generated);
    return generated;
  };

  // Auto-generate test cases tailored to the user's actual code in editor
  const handleAutoGenerateTests = () => {
    const generated = generateTestsForCode(editorCode);
    showToast(`Generated ${generated.length} test cases for your code!`, 'success');
  };

  // Run dynamic test cases with isolated assertion execution
  const handleRunAllTestCases = async () => {
    setIsRunningTests(true);
    const updated = [];

    for (const tc of customTestCases) {
      // ── stdin-based test (for input() programs) ──
      if (tc.stdin !== undefined) {
        const stdinValue = tc.stdin;
        const res = await executeCodeWithBackend(editorCode, 'python', stdinValue);
        const rawOut = (res.output || '').trim();
        // Filter out prompt lines (the prompt text echoed by our custom_py_input)
        const outputLines = rawOut.split('\n').filter(line => {
          // Remove prompt echoes — they typically contain ':' or '?' at end
          return !line.match(/^.*:\s*$/) && !line.match(/^.*\?\s*$/);
        });
        const cleanOut = outputLines.join('\n').trim();
        const hasErr = Boolean(res.error) && res.exit_code !== 0;
        const expectedClean = (tc.expected || '').trim();
        let passed = false;
        let finalExpected = tc.expected;
        if (!expectedClean) {
          finalExpected = cleanOut;
          passed = !hasErr && cleanOut.length > 0;
        } else {
          passed = !hasErr && (cleanOut === expectedClean || cleanOut.includes(expectedClean));
        }
        updated.push({
          ...tc,
          input: tc.display || `stdin: "${stdinValue}"`,
          expected: finalExpected,
          actual: hasErr ? (res.error || 'Error').split('\n').pop() : (cleanOut || '[No output]'),
          status: passed ? 'passed' : 'failed'
        });
        continue;
      }

      // ── expression/assertion-based test ──
      let testInput = tc.input.trim();
      if (!testInput.startsWith('print(') && !testInput.startsWith('#') && !testInput.includes('=') && !testInput.includes('\n')) {
        testInput = `print(${testInput})`;
      }

      // Isolate assertion output from any top-level prints
      const testSnippet =
        `${editorCode}\n\n` +
        `import sys as _cp_sys, io as _cp_io\n` +
        `_cp_buf = _cp_io.StringIO()\n` +
        `_cp_old_out = _cp_sys.stdout\n` +
        `_cp_sys.stdout = _cp_buf\n` +
        `try:\n` +
        `    ${testInput.replace(/\n/g, '\n    ')}\n` +
        `except Exception as _cp_err:\n` +
        `    print(f'TestError: {_cp_err}')\n` +
        `finally:\n` +
        `    _cp_sys.stdout = _cp_old_out\n` +
        `print('___CLEARPATH_TC___' + _cp_buf.getvalue().strip())\n`;

      const res = await executeCodeWithBackend(testSnippet, 'python', customInput);
      let cleanOut = '';
      if (res.output && res.output.includes('___CLEARPATH_TC___')) {
        cleanOut = res.output.split('___CLEARPATH_TC___').pop().trim();
      } else if (res.output) {
        cleanOut = res.output.trim();
      }

      const hasErr = Boolean(res.error) || cleanOut.startsWith('TestError:');
      const expectedClean = (tc.expected || '').trim();

      let passed = false;
      let finalExpected = tc.expected;
      if (!expectedClean) {
        finalExpected = cleanOut;
        passed = !hasErr && cleanOut.length > 0;
      } else {
        passed = !hasErr && (cleanOut === expectedClean || cleanOut.includes(expectedClean));
      }

      updated.push({
        ...tc,
        expected: finalExpected,
        actual: hasErr ? (res.error ? res.error.split('\n').pop() : cleanOut) : (cleanOut || '[No output]'),
        status: passed ? 'passed' : 'failed'
      });
    }

    setCustomTestCases(updated);
    setIsRunningTests(false);
    setActiveResultTab('tests');

    const allPassed = updated.every((tc) => tc.status === 'passed');
    if (allPassed) {
      showToast('All test cases passed! ✨', 'success');
    } else {
      showToast('Some test cases need review. Check actual vs expected.', 'warning');
    }
  };

  // 1-Click apply optimization to editor
  const handleApplyOptimization = () => {
    if (analysisResult?.optimization?.after) {
      setEditorCode(analysisResult.optimization.after);
      showToast('Optimization applied to editor! Re-analyzing...', 'success');
      setTimeout(() => runAnalysis(), 350);
    } else {
      showToast('No optimization proposal available for this code.', 'info');
    }
  };

  const handleLoadChallenge = (snippet) => {
    setEditorCode(snippet);
    showToast('Loaded practice challenge into editor.', 'info');
    setTimeout(() => runAnalysis(), 300);
  };

  const toggleCheckTopic = (idx) => {
    setCompletedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
        showToast('Topic marked as pending.', 'info');
      } else {
        next.add(idx);
        showToast('Great job! Topic marked as completed. +10 XP', 'success');
      }
      return next;
    });
  };

  const handleSelectPreset = (presetKey) => {
    loadPreset(presetKey);
    if (presetKey === 'python_clean_twosum') {
      setCustomTestCases([
        { id: 1, input: 'two_sum([2, 7, 11, 15], 9)', expected: '[0, 1]', actual: '', status: 'untested' },
        { id: 2, input: 'two_sum([3, 2, 4], 6)', expected: '[1, 2]', actual: '', status: 'untested' }
      ]);
    } else if (presetKey === 'python_inefficient_fib') {
      setCustomTestCases([
        { id: 1, input: 'fibonacci(5)', expected: '5', actual: '', status: 'untested' },
        { id: 2, input: 'fibonacci(8)', expected: '21', actual: '', status: 'untested' }
      ]);
    } else if (presetKey === 'python_index_error') {
      setCustomTestCases([
        { id: 1, input: 'print(grades[0])', expected: '88', actual: '', status: 'untested' },
        { id: 2, input: 'print(len(grades))', expected: '4', actual: '', status: 'untested' }
      ]);
    } else if (presetKey === 'python_input_sample') {
      setCustomTestCases([
        { id: 1, input: 'print(name)', expected: 'Renu Asmitha', actual: '', status: 'untested' },
        { id: 2, input: 'print(topic)', expected: 'Dynamic Programming', actual: '', status: 'untested' }
      ]);
    }
  };

  const lineCount = editorCode.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 16) }, (_, i) => i + 1);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0d1322] border border-[#1c2742] rounded-2xl shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          {/* Locked Python Environment Badge */}
          <div className="flex items-center gap-2 bg-[#121a2f] border border-[#253356] rounded-xl px-3 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">Python 3.13</span>
            <span className="text-[10px] text-violet-400 bg-violet-500/10 px-1.5 py-0.2 rounded border border-violet-500/20 font-mono">
              AST Engine
            </span>
          </div>

          {/* Sample Presets */}
          <div className="flex items-center gap-1.5 bg-[#121a2f] border border-[#253356] rounded-xl px-2.5 py-1.5">
            <span className="text-[11px] text-slate-400">Sample:</span>
            <select
              onChange={(e) => {
                if (e.target.value) handleSelectPreset(e.target.value);
              }}
              defaultValue=""
              className="bg-transparent text-xs text-slate-200 border-none focus:outline-none cursor-pointer"
            >
              <option value="" disabled className="bg-[#121a2f] text-slate-400">
                Choose a Bug Scenario...
              </option>
              <option value="python_input_sample" className="bg-[#121a2f] text-white">
                Interactive: User input() Demo
              </option>
              <option value="python_index_error" className="bg-[#121a2f] text-white">
                IndexError: Array Out of Bounds
              </option>
              <option value="python_zero_division" className="bg-[#121a2f] text-white">
                ZeroDivisionError: Empty List
              </option>
              <option value="python_inefficient_fib" className="bg-[#121a2f] text-white">
                Performance: Exponential Recursion O(2^n)
              </option>
              <option value="python_syntax_error" className="bg-[#121a2f] text-white">
                SyntaxError: Missing Colon Header
              </option>
              <option value="python_clean_twosum" className="bg-[#121a2f] text-white">
                Clean Optimal: Two-Sum Hash Map O(n)
              </option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearCode}
            className="btn btn-ghost btn-sm text-xs text-slate-400 hover:text-white"
            title="Clear editor contents"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="btn btn-secondary btn-sm text-xs"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Run Code Button */}
          <button
            onClick={runExecution}
            disabled={isRunning || !editorCode.trim()}
            className="btn btn-cyan btn-sm font-semibold shadow-md shadow-cyan-600/20"
            title="Execute Python code and capture true stdout"
          >
            {isRunning ? (
              <span className="animate-spin text-xs">⏳</span>
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunning ? 'Running Python...' : 'Run Code'}</span>
          </button>

          {/* Analyze Code Button */}
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing || !editorCode.trim()}
            className="btn btn-primary btn-sm font-semibold shadow-lg shadow-violet-600/30"
            title="Analyze syntax, bugs, complexity & guided learning focus"
          >
            {isAnalyzing ? (
              <span className="animate-spin text-xs">⚙️</span>
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isAnalyzing ? 'Analyzing AST...' : 'Analyze Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Editor, Program Input (stdin) & Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="code-editor-container border border-[#1c2742] rounded-2xl overflow-hidden shadow-2xl bg-[#0b0f19]">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#080c14] border-b border-[#1c2742] text-xs">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-violet-400" />
                <span className="font-mono font-semibold text-white">main.py</span>
                <span className="text-[10px] text-slate-500 font-mono">({lineCount} lines)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Python Interpreter Ready" />
                <span className="text-[11px] text-emerald-400 font-mono">Ready</span>
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex min-h-[360px] max-h-[480px] overflow-auto bg-[#070a12]">
              {settings.showLineNumbers && (
                <div className="editor-gutter select-none font-mono text-[11px] text-slate-600 bg-[#060810] px-3 py-3 border-r border-[#1c2742] text-right">
                  {lineNumbers.map((num) => (
                    <div key={num} className="leading-6">
                      {num}
                    </div>
                  ))}
                </div>
              )}

              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                spellCheck={false}
                style={{ fontSize: `${settings.editorFontSize || 14}px` }}
                className="editor-textarea flex-1 p-3 bg-transparent font-mono text-slate-100 resize-none focus:outline-none leading-6 tab-4 min-h-[360px]"
                placeholder="# Enter or paste Python code here..."
              />
            </div>
          </div>

          {/* DEDICATED PROGRAM INPUT (STDIN) PANEL */}
          <div className="p-3.5 bg-[#0a0e1a] border border-[#1c2742] rounded-2xl shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-white">Program Input (stdin)</span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Passed to Python <code>input()</code> calls line-by-line
                </span>
              </div>
              {customInput ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                  {customInput.split('\n').filter(Boolean).length} value(s) ready
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono">
                  (Empty: type here if your code calls input())
                </span>
              )}
            </div>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type your inputs here, one per line (e.g. name, numbers, answers to input() prompts)..."
              rows={2}
              className="w-full bg-[#05070d] border border-[#253356] rounded-xl p-2.5 font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none transition-colors"
            />
          </div>

          {/* Terminal Console */}
          <div className="terminal-window border border-[#1c2742] rounded-2xl overflow-hidden shadow-xl">
            <div className="terminal-header flex items-center justify-between px-4 py-2.5 bg-[#090d16] border-b border-[#1c2742]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Execution Console & Output</span>
                {analysisResult?.execution && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded font-mono ${
                      (analysisResult.execution.exit_code ?? analysisResult.execution.exitCode) === 0
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    Exit Code: {analysisResult.execution.exit_code ?? analysisResult.execution.exitCode}
                  </span>
                )}
              </div>

              {analysisResult?.execution && (
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>⏱ {analysisResult.execution.duration_ms ?? analysisResult.execution.durationMs}ms</span>
                  <span>💾 {analysisResult.execution.memory_kb ?? analysisResult.execution.memoryKb ?? 2048} KB</span>
                </div>
              )}
            </div>

            <div className="terminal-body p-4 bg-[#05070d] text-xs font-mono min-h-[140px] max-h-[220px] overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
                  <span>▶ Executing code in Python runtime...</span>
                </div>
              ) : analysisResult?.execution?.error ? (
                <div className="space-y-1">
                  <div className="text-rose-400 whitespace-pre-wrap">
                    {analysisResult.execution.error}
                  </div>
                  {analysisResult.execution.output && (
                    <div className="pt-2 border-t border-[#1c2742] text-slate-300">
                      <span className="text-slate-500">// Output prior to crash:</span>
                      <pre className="mt-1">{analysisResult.execution.output}</pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <pre className="text-slate-200 whitespace-pre-wrap">
                    {analysisResult?.execution?.output || '[Run code to view output]'}
                  </pre>
                  <span className="text-emerald-400 inline-block animate-pulse">_</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Multidimensional Analysis, Guided Learning Focus & Tests (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="cp-card p-4 space-y-4 bg-[#0d1322] border-[#253356]">
            {/* Header / Health Status */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1c2742]">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md ${
                    analysisResult.status === 'clean'
                      ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-600/30 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {analysisResult.status === 'clean' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm">
                    {analysisResult.status === 'clean'
                      ? 'Code is Optimal & Clean'
                      : `${analysisResult.issues_count ?? analysisResult.issuesCount} Issue(s) Identified`}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {analysisResult.status === 'clean'
                      ? 'No syntax or runtime exceptions detected.'
                      : 'Review the guidance tabs below for fixes.'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    analysisResult.status === 'clean'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                  }`}
                >
                  {analysisResult.status === 'clean' ? '100% Score' : 'Action Needed'}
                </span>
              </div>
            </div>

            {/* Results Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 p-1 bg-[#090d16] rounded-xl border border-[#1c2742] text-[11px]">
              <button
                onClick={() => setActiveResultTab('overview')}
                className={`py-1.5 px-1 rounded-lg font-medium text-center transition-all ${
                  activeResultTab === 'overview'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveResultTab('explanation')}
                className={`py-1.5 px-1 rounded-lg font-medium text-center transition-all ${
                  activeResultTab === 'explanation'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Errors
              </button>
              <button
                onClick={() => setActiveResultTab('learningFocus')}
                className={`py-1.5 px-1 rounded-lg font-medium text-center transition-all ${
                  activeResultTab === 'learningFocus'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-sm font-semibold'
                    : 'text-cyan-400 hover:text-white'
                }`}
              >
                🎯 Topics to Do
              </button>
              <button
                onClick={() => setActiveResultTab('optimization')}
                className={`py-1.5 px-1 rounded-lg font-medium text-center transition-all ${
                  activeResultTab === 'optimization'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Improve
              </button>
              <button
                onClick={() => setActiveResultTab('tests')}
                className={`py-1.5 px-1 rounded-lg font-medium text-center transition-all ${
                  activeResultTab === 'tests'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tests
              </button>
            </div>

            {/* TAB: 1. Overview */}
            {activeResultTab === 'overview' && (
              <div className="space-y-3 animate-fade-in text-xs">
                {analysisResult.issues.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Clean Code Execution & Syntax
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Your program passed all static syntax checks. Review the <strong>Complexity</strong> metrics below and open the <strong>🎯 Topics to Do</strong> tab for recommended next practice!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {analysisResult.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border bg-rose-950/20 border-rose-800/40 text-rose-200"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            {issue.type}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40">
                            Line {issue.line || '—'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-mono leading-snug">
                          {issue.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Big-O Complexity Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-[#090d16] border border-[#1c2742]">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Time Complexity</span>
                    <div className="text-sm font-bold text-violet-400 font-mono mt-0.5">
                      {analysisResult.complexity?.time || 'O(1)'}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {analysisResult.complexity?.advice || 'Constant runtime operations.'}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#090d16] border border-[#1c2742]">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Space Complexity</span>
                    <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">
                      {analysisResult.complexity?.space || 'O(1)'}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Auxiliary storage allocated during runtime execution.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveResultTab('learningFocus')}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-violet-600/30 to-cyan-600/30 hover:from-violet-600/50 hover:to-cyan-600/50 text-white font-medium flex items-center justify-between border border-cyan-500/30 transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-cyan-400" />
                      View Topics You Need to Do Next
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB: 2. Error Explanation */}
            {activeResultTab === 'explanation' && (
              <div className="space-y-3 animate-fade-in text-xs">
                {analysisResult.issues.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#121a2f] border border-[#1c2742] text-slate-300">
                    No syntax errors currently detected. If you want to test the debugger, try typing an unclosed quote like <code>print("hello)</code> and click Analyze!
                  </div>
                ) : (
                  analysisResult.issues.map((issue, idx) => {
                    const exp = issue.explanation;
                    if (!exp) return null;
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742]">
                          <div className="font-semibold text-rose-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            1. What went wrong?
                          </div>
                          <p className="text-slate-200 text-xs leading-relaxed">{exp.what}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742]">
                          <div className="font-semibold text-amber-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            2. Why did it happen?
                          </div>
                          <p className="text-slate-200 text-xs leading-relaxed">{exp.why}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742]">
                          <div className="font-semibold text-cyan-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            3. Where is it located?
                          </div>
                          <p className="text-slate-200 text-xs font-mono">{exp.where}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742]">
                          <div className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            4. How to approach fixing it?
                          </div>
                          <p className="text-slate-200 text-xs leading-relaxed">{exp.how}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB: 3. GUIDED LEARNING: TOPICS YOU NEED TO DO */}
            {activeResultTab === 'learningFocus' && (
              <div className="space-y-3 animate-fade-in text-xs">
                {analysisResult.learningFocus ? (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-950/40 to-cyan-950/30 border border-cyan-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-cyan-400" />
                          Topics You Need to Do
                        </span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                          {analysisResult.learningFocus.urgency}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {analysisResult.learningFocus.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Recommended Concept: <span className="font-semibold text-cyan-300">{analysisResult.learningFocus.recommendedTopic}</span>
                      </p>
                    </div>

                    {/* Interactive Checklist of Topics to Do */}
                    {analysisResult.learningFocus.topicsToDo && (
                      <div className="space-y-1.5 bg-[#090d16] p-3 rounded-xl border border-[#1c2742]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Actionable Topics Checklist:
                        </span>
                        {analysisResult.learningFocus.topicsToDo.map((topicItem, idx) => {
                          const isDone = completedTopicIds.has(idx);
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleCheckTopic(idx)}
                              className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors border ${
                                isDone
                                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                                  : 'bg-[#121a2f] border-[#253356] text-slate-300 hover:bg-[#17223b]'
                              }`}
                            >
                              <button className="mt-0.5 text-violet-400">
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className={`font-semibold text-xs ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                                  {topicItem.name}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate">
                                  {topicItem.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742] space-y-1">
                        <div className="font-semibold text-violet-300 text-xs">📌 What to Focus On Next:</div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {analysisResult.learningFocus.step1}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742] space-y-1">
                        <div className="font-semibold text-amber-300 text-xs">🔍 Conceptual Takeaway:</div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {analysisResult.learningFocus.step2}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742] space-y-1">
                        <div className="font-semibold text-emerald-300 text-xs">🚀 Practice Challenge:</div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {analysisResult.learningFocus.step3}
                        </p>
                      </div>
                    </div>

                    {/* Quick Practice Challenge Launcher */}
                    <button
                      onClick={() => {
                        if (analysisResult.complexity?.time?.includes('O(n²)')) {
                          handleLoadChallenge(
                            `# Practice Challenge: Optimize Two Sum from O(n^2) to O(n)\n` +
                              `def two_sum_optimal(nums, target):\n` +
                              `    # TODO: Use a dictionary to store complements in O(1) lookup\n` +
                              `    seen = {}\n` +
                              `    for i, num in enumerate(nums):\n` +
                              `        complement = target - num\n` +
                              `        if complement in seen:\n` +
                              `            return [seen[complement], i]\n` +
                              `        seen[num] = i\n` +
                              `    return []\n\n` +
                              `print("Indices:", two_sum_optimal([2, 7, 11, 15], 9))\n`
                          );
                        } else if (analysisResult.issues.some((i) => i.type.includes('IndexError'))) {
                          handleLoadChallenge(
                            `# Practice Challenge: Safe Array Traversal with enumerate()\n` +
                              `students = ["Renu", "Alex", "Sam", "Priya"]\n` +
                              `scores = [95, 88, 92, 85]\n\n` +
                              `# Loop safely using enumerate to avoid index boundary traps\n` +
                              `for i, (name, score) in enumerate(zip(students, scores), start=1):\n` +
                              `    print(f"Rank {i}: {name} -> {score} points")\n`
                          );
                        } else {
                          handleLoadChallenge(
                            `# Practice Challenge: User input() validation\n` +
                              `user_name = input("Enter your username: ")\n` +
                              `if not user_name.strip():\n` +
                              `    print("Error: Username cannot be blank!")\n` +
                              `else:\n` +
                              `    print(f"Account created successfully for: {user_name.strip()}")\n`
                          );
                        }
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-violet-600/30"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Load Recommended Practice Challenge in Editor</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#121a2f] border border-[#1c2742] text-slate-300">
                    Analyze code to generate your customized Topics to Do plan.
                  </div>
                )}
              </div>
            )}

            {/* TAB: 4. Code Optimization & Improvement */}
            {activeResultTab === 'optimization' && (
              <div className="space-y-3 animate-fade-in text-xs">
                {analysisResult.optimization ? (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#121a2f] border border-[#1c2742] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                          <Zap className="w-4 h-4 text-emerald-400" />
                          <span>{analysisResult.optimization.title}</span>
                        </div>
                        {analysisResult.optimization.time_reduction && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                            {analysisResult.optimization.time_reduction}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {analysisResult.optimization.explanation}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/30">
                        <span className="text-[10px] font-mono text-rose-400 font-bold block mb-1">
                          - Your Current Approach:
                        </span>
                        <pre className="font-mono text-[11px] text-rose-200 overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto">
                          {analysisResult.optimization.before}
                        </pre>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            + Recommended Optimized Solution:
                          </span>
                          <span className="text-[10px] text-emerald-300 font-mono">
                            {analysisResult.optimization.space_reduction || 'Optimized Space'}
                          </span>
                        </div>
                        <pre className="font-mono text-[11px] text-emerald-200 overflow-x-auto whitespace-pre-wrap max-h-60 overflow-y-auto">
                          {analysisResult.optimization.after}
                        </pre>
                      </div>
                    </div>

                    <button
                      onClick={handleApplyOptimization}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Apply Optimized Solution to Editor
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#121a2f] border border-[#1c2742] text-slate-300 space-y-2">
                    <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      No Bottlenecks Detected
                    </div>
                    <p className="text-xs text-slate-400">
                      Your code is already running at optimal asymptotic efficiency ({analysisResult.complexity?.time || 'O(1)'}).
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: 5. Dynamic Test Cases Runner (Logical Errors) */}
            {activeResultTab === 'tests' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1c2742]">
                  <div>
                    <h4 className="font-bold text-white text-xs">Logical Assertion Test Runner</h4>
                    <p className="text-[11px] text-slate-400">
                      Asserts that code produces exact expected outputs across test inputs.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Auto-generate test cases button */}
                    <button
                      onClick={handleAutoGenerateTests}
                      className="btn btn-secondary btn-sm text-xs font-semibold flex items-center gap-1 border-violet-500/40 text-violet-300 hover:text-white"
                      title="Auto-detect functions and generate tailored test cases"
                    >
                      <Wand2 className="w-3 h-3 text-violet-400" />
                      <span>Auto-Generate</span>
                    </button>

                    <button
                      onClick={handleRunAllTestCases}
                      disabled={isRunningTests}
                      className="btn btn-primary btn-sm text-xs font-semibold flex items-center gap-1 shadow-md shadow-violet-600/20"
                    >
                      {isRunningTests ? <span className="animate-spin">⏳</span> : <Play className="w-3 h-3 text-cyan-400 fill-current" />}
                      <span>Run All Tests</span>
                    </button>
                  </div>
                </div>

                {/* Test Cases List */}
                <div className="space-y-2">
                  {customTestCases.map((tc) => (
                    <div
                      key={tc.id}
                      className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                        tc.status === 'passed'
                          ? 'bg-emerald-950/20 border-emerald-800/40'
                          : tc.status === 'failed'
                          ? 'bg-rose-950/20 border-rose-800/40'
                          : 'bg-[#121a2f] border-[#1c2742]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-slate-200 text-[11px]">
                          Assertion: {tc.input}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] px-2 py-0.2 rounded-full font-bold flex items-center gap-1 ${
                              tc.status === 'passed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : tc.status === 'failed'
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            {tc.status === 'passed' && <CheckCircle2 className="w-3 h-3" />}
                            {tc.status === 'failed' && <XCircle className="w-3 h-3" />}
                            {tc.status.toUpperCase()}
                          </span>
                          <button
                            onClick={() => handleDeleteTestCase(tc.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors"
                            title="Remove test case"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="font-mono text-[10px] space-y-0.5 bg-[#090d16] p-2 rounded-lg border border-[#1c2742]">
                        <div className="text-emerald-400">Expected: {tc.expected || '[Auto-detect upon run]'}</div>
                        {tc.actual && (
                          <div className={tc.status === 'passed' ? 'text-emerald-300' : 'text-rose-400'}>
                            Actual: {tc.actual}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Test Case Form */}
                <form onSubmit={handleAddTestCase} className="p-3 rounded-xl bg-[#090d16] border border-[#1c2742] space-y-2">
                  <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Add Custom Test Case Assertion:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newTestInput}
                      onChange={(e) => setNewTestInput(e.target.value)}
                      placeholder="Input expression (e.g. multiply(4, 5))"
                      className="bg-[#121a2f] border border-[#253356] rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      value={newTestExpected}
                      onChange={(e) => setNewTestExpected(e.target.value)}
                      placeholder="Expected output (e.g. 20)"
                      className="bg-[#121a2f] border border-[#253356] rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#17223b] hover:bg-[#253356] text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Add Test Case
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
