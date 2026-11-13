# ClearPath: AI-Powered Code Analysis & Guided Learning Platform

> *"Understand the code. Discover the way forward."*

**Author:** Renu Asmitha T  
**Degree:** B.Tech Computer Science Engineering  
**Project Category:** AI-Powered Programming Assistance & Personalized Learning Platform (SEC Capstone)

---

## 1. Project Overview

**ClearPath** is an integrated developer education platform designed to transform coding errors into structured learning opportunities. Rather than presenting students with cryptic compiler error codes or spoon-feeding copy-pasted answers, ClearPath provides:

1. **What went wrong?** Plain-language breakdown of syntax, runtime, and logical issues.
2. **Why did it happen?** Conceptual root causes (such as 0-indexing boundaries or unhandled base cases).
3. **Where is it located?** Line and token pointers.
4. **How to fix it?** Socratic guidance on the correction approach.
5. **What concept to study next?** Automatic mapping to an adaptive 5-stage computer science roadmap.

---

## 2. Key Features

- **Code Analyzer Workspace**: Live code editor with line gutter numbers, language switching (Python, JavaScript, C++, Java), sample bug scenarios, and instant AST inspection.
- **Execution Console & Terminal**: Isolated execution output capturing `stdout`, `stderr`, return codes, execution time, and memory usage.
- **Pedagogical Error Explanations**: 4-part guided breakdown (What, Why, Where, How) paired with recommended study concepts.
- **Code Optimization & Idiomatic Diffs**: Before-and-after visual code diffs with one-click fix application.
- **Big-O Complexity Analysis**: Asymptotic time ($O(1), O(n), O(n^2), O(2^n)$) and space estimates with educational advice.
- **5-Stage Personalized Learning Path**: Structured progression across Programming Fundamentals, Loops & Functions, Data Structures, Algorithms, and Object-Oriented Design.
- **ClearPath AI Mentor**: Socratic programming tutor for conceptual Q&A, hint generation, and direct code snippet inspection.
- **Diagnostic History**: Searchable, filterable log of previous analysis runs persisted locally.
- **Student Workspace & Tasks**: Project management dashboard with study checklists.
- **Interactive Presentation Review Mode**: Built-in system workflow flowchart and 3-tier architecture diagrams designed for capstone evaluations.

---

## 3. Technology Stack

- **Frontend**: React 18, Vite, Lucide React, Modern CSS (Linear / Vercel dark theme aesthetic).
- **Backend**: Python 3, FastAPI, Python `ast` (Abstract Syntax Tree) engine.
- **Storage**: Browser LocalStorage with seamless state synchronization.

---

## 4. Getting Started

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit the application at: `http://localhost:5173`

### Running the Backend (Optional)

```bash
cd backend
pip install -r requirements.txt
python main.py
```

API docs will be available at: `http://127.0.0.1:8000/docs`
