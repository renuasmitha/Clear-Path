# ClearPath: AI-Powered Code Analysis & Guided Learning Platform

> *Understand the code. Discover the way forward.*

**Author:** Renu Asmitha T  
**Degree:** B.Tech Computer Science Engineering  
**Project Category:** AI-Powered Programming Assistance & Personalized Learning Platform 

---

## 1. Project Overview

**ClearPath** is an integrated developer education platform designed to transform coding errors into structured learning opportunities.

Rather than presenting students with confusing compiler errors or simply providing corrected code, ClearPath helps users understand their mistakes and develop better problem-solving skills.

It focuses on five key questions:

1. **What went wrong?** – Plain-language explanations of syntax, runtime, and logical issues.
2. **Why did it happen?** – Conceptual explanations of the root cause.
3. **Where is it located?** – Identification of relevant lines and code sections.
4. **How to fix it?** – Guided suggestions for correcting errors.
5. **What to learn next?** – Recommended concepts through a structured learning roadmap.

---

## 2. Key Features

- **Code Analyzer Workspace:** Interactive code editor with line numbers, language selection (Python, JavaScript, C++, Java), sample programs, and AST inspection.
- **Execution Console:** Displays program output, errors, return codes, execution time, and memory usage.
- **Guided Error Explanations:** Four-part breakdown covering What, Why, Where, and How.
- **Code Optimization:** Suggestions for improving code quality with before-and-after comparisons.
- **Time & Space Complexity:** Big-O analysis and educational explanations of algorithm efficiency.
- **Personalized Learning Path:** Five-stage progression covering Programming Fundamentals, Loops & Functions, Data Structures, Algorithms, and Object-Oriented Programming.
- **ClearPath AI Mentor:** Programming assistance for conceptual questions, hints, and code-related doubts.
- **Diagnostic History:** Searchable history of previous code analysis sessions.
- **Student Workspace:** Project management dashboard and learning checklists.
- **Interactive Architecture View:** System workflow and architectural diagrams for understanding the platform.

---

## 3. Technology Stack

**Frontend**
- React.js
- Vite
- Lucide React
- CSS

**Backend**
- Python
- FastAPI
- Python AST (Abstract Syntax Tree)

**Storage**
- Browser LocalStorage

---

## 4. Project Structure

```text
ClearPath/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── run-backend.bat
├── run-frontend.bat
└── start-all.bat
```

---

## 5. Getting Started

### Prerequisites

- Node.js and npm
- Python 3
- Git

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the application at:

`http://localhost:5173`

### Running the Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

API documentation:

`http://127.0.0.1:8000/docs`

---

## 6. Project Vision

ClearPath aims to make programming education more interactive, understandable, and accessible.

Instead of merely fixing errors, it encourages students to understand the reasoning behind their mistakes and gradually become independent problem-solvers.

**The goal is simple: Don't just fix the code. Understand it.**
