import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Lightbulb,
  FileCode,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AIAssistant() {
  const { editorCode, editorLanguage, navigateTo, showToast } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      time: 'Just now',
      content: `👋 Hello! I'm your **ClearPath AI Programming Mentor**.

My goal is not to give you blind copy-paste solutions, but to help you **understand the core concepts**, debug errors, and develop algorithmic intuition.

How can I help you in your coding journey today? You can choose a suggested question below or ask anything about your code!`
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Why did I get an IndexError in my loop?",
    "Explain recursion base cases with an analogy",
    "What's the difference between a Stack and a Queue?",
    "How can I optimize nested loops from O(n²) to O(n)?",
    "Give me a hint for the Two Sum problem without giving away the full answer",
    "Why does Python say 'division by zero' when my list is empty?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Contextual Socratic response generation
    setTimeout(() => {
      let replyContent = '';
      const q = query.toLowerCase();

      if (q.includes('indexerror') || q.includes('out of range') || q.includes('bound')) {
        replyContent = `### Understanding IndexError: List Index Out of Range

In Python, sequences like lists and strings use **0-based indexing**:
- A list of size 4 has indices: \`0, 1, 2, 3\`.
- \`len(scores)\` returns \`4\`.

When you write:
\`\`\`python
for i in range(len(scores) + 1): # Generates 0, 1, 2, 3, 4
    print(scores[i]) # When i=4, scores[4] doesn't exist!
\`\`\`

**The Socratic Fix:**
Ask yourself: *Do you really need the index integer, or do you just need the values?*
- If you only need values: \`for score in scores:\`
- If you need numbering: \`for i, score in enumerate(scores, start=1):\`

💡 *Check Stage 3: "Arrays & Lists: Bounds & Slicing" in your Learning Path.*`;
      } else if (q.includes('recursion') || q.includes('base case')) {
        replyContent = `### Intuitive Analogy: Recursion & Base Cases

Imagine you are standing in a long line at a movie theater and want to know what position you are in:
1. You ask the person in front of you: *"What position are you?"*
2. That person asks the person in front of them... (This is the **Recursive Step**).
3. Eventually, the person at the very front of the line says: *"I am #1!"* (This is the **Base Case**).
4. The answer travels backwards: each person adds 1 until it reaches you.

If nobody at the front ever stops and answers (missing base case), the theater line asks forever until security throws everyone out — that is your **RecursionError (Maximum recursion depth exceeded)**!

Every recursive function requires:
1. **Base Case:** An explicit condition (like \`if n <= 1:\`) that stops recursion and returns a fixed value.
2. **Recursive Step:** Calling itself with a smaller input that moves closer to the base case.`;
      } else if (q.includes('stack') && q.includes('queue')) {
        replyContent = `### Stacks vs. Queues: The Core Difference

Both are linear abstract data structures, but they differ in the **order of item removal**:

| Data Structure | Policy | Real-World Analogy | Primary Operations |
|---|---|---|---|
| **Stack** | **LIFO** (Last In, First Out) | Stack of cafeteria trays | \`push()\` & \`pop()\` (from top) |
| **Queue** | **FIFO** (First In, First Out) | People waiting in ticket line | \`enqueue()\` & \`dequeue()\` (from front) |

**In Python:**
- For a **Stack**: Use standard list: \`stack.append(x)\` and \`stack.pop()\`. Both are O(1).
- For a **Queue**: Do NOT use \`list.pop(0)\` (which is slow O(n)). Instead, use \`collections.deque\` with \`deque.popleft()\` for O(1) performance!`;
      } else if (q.includes('nested') || q.includes('o(n^2)') || q.includes('o(n2)') || q.includes('optimize')) {
        replyContent = `### Escaping Quadratic O(n²) Time Complexity

When you have a loop inside a loop over the same list of size N:
\`\`\`python
for i in range(len(arr)):
    for j in range(len(arr)):
        if arr[i] + arr[j] == target: ...
\`\`\`
For $N = 10,000$, $N^2 = 100,000,000$ operations!

**How to reduce to O(n) Linear Time:**
1. **Trade space for time**: Use a **Hash Map (Python dictionary)** or a **Set**.
2. Looking up an item in a set or dictionary takes average **O(1)** time instead of scanning the array in O(n).
3. Pre-populate the hash table or check complements on the fly as you do a single pass over the array!`;
      } else if (q.includes('two sum') || q.includes('hint')) {
        replyContent = `### Hint for Two Sum:

Instead of comparing every number with every other number (nested loops O(n²)):

1. Maintain a dictionary called \`seen = {}\`.
2. As you iterate through each number \`num\` with its index \`i\`:
   - Calculate what partner you need: \`complement = target - num\`.
   - Ask: *Is \`complement\` already in \`seen\`?*
   - If yes: You found your pair! Return \`[seen[complement], i]\`.
   - If no: Store the current number: \`seen[num] = i\`.

Try writing this pattern in the **Code Analyzer** and click *Analyze* to verify its O(n) complexity!`;
      } else if (q.includes('zero') || q.includes('division')) {
        replyContent = `### ZeroDivisionError on Empty Lists

In Python:
\`\`\`python
average = total / len(grades)
\`\`\`
If \`grades = []\`, \`len(grades)\` is \`0\`. Dividing anything by 0 causes a fatal **ZeroDivisionError**.

**Defensive Guarding Rule:**
Always validate denominators before dividing:
\`\`\`python
if not grades:
    return 0.0 # Or raise a descriptive ValueError
return sum(grades) / len(grades)
\`\`\`
This ensures robust code that won't crash when provided with empty input datasets.`;
      } else {
        replyContent = `### Analysis of your question:

Regarding **"${query}"**:

1. **Core Principle:** Focus on identifying how your data flows from input to output and where assumptions may fail.
2. **Debugging Habit:** Print intermediate variable states or check boundary cases (empty lists, single elements, negative values).
3. **Complexity Note:** Keep track of your loop nesting depth and memory allocations.

Would you like me to inspect your current code from the Code Analyzer or explain a related data structure?`;
      }

      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: replyContent
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleImportCurrentCode = () => {
    if (!editorCode.trim()) {
      showToast('No code in editor to import.', 'warning');
      return;
    }
    const snippetPrompt = `Here is my current ${editorLanguage} code from the editor:

\`\`\`${editorLanguage}
${editorCode}
\`\`\`

Can you review this code, explain any bugs or inefficiencies, and give me a guided hint without spoiling the complete answer?`;

    handleSendMessage(snippetPrompt);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'assistant',
        time: 'Just now',
        content: "Chat cleared. What concept or problem would you like to explore next?"
      }
    ]);
    showToast('Conversation reset.', 'info');
  };

  const handleCopyText = (content) => {
    navigator.clipboard.writeText(content);
    showToast('Copied to clipboard!', 'success');
  };

  return (
    <div className="space-y-4 animate-fade-in max-w-4xl mx-auto">
      {/* Top Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0d1322] border border-[#1c2742] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              ClearPath AI Mentor
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Online
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Socratic learning assistant • Hints, concept breakdowns & debugging advice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleImportCurrentCode}
            className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
            title="Import active code from Code Analyzer"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Import Editor Code</span>
          </button>

          <button
            onClick={handleClearChat}
            className="btn btn-ghost btn-sm text-xs text-slate-400 hover:text-white"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions Carousel / Grid */}
      <div className="p-3 bg-[#0a0e19] border border-[#1c2742] rounded-xl">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-medium">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Topic Prompts:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#121a2f] hover:bg-[#1a2542] text-slate-300 hover:text-white border border-[#253356] transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="bg-[#0b0f19] border border-[#1c2742] rounded-2xl min-h-[440px] max-h-[580px] flex flex-col overflow-hidden shadow-xl">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-sm'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-violet-600/25 border border-violet-500/40 text-slate-100 rounded-tr-none'
                    : 'bg-[#121a2f] border border-[#253356] text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {msg.sender === 'user' ? 'You' : 'ClearPath Mentor'}
                  </span>
                  <span>{msg.time}</span>
                </div>

                <div className="space-y-2 whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {msg.sender === 'assistant' && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end">
                    <button
                      onClick={() => handleCopyText(msg.content)}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" /> Copy Explanation
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-[#121a2f] border border-[#253356] text-xs text-slate-400 flex items-center gap-2">
                <span className="animate-spin text-sm">⏳</span>
                <span>Mentor is formulating a pedagogical explanation...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#080c14] border-t border-[#1c2742]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask an error question, concept explanation, or request a hint..."
              className="flex-1 bg-[#121a2f] border border-[#253356] rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="btn btn-primary btn-md rounded-xl font-semibold px-4 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
