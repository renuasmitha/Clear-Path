@echo off
title ClearPath - Full Stack Launcher
echo ========================================================
echo Launching ClearPath Full-Stack Platform...
echo Author: Renu Asmitha T (SEC Capstone)
echo ========================================================
start "ClearPath FastAPI Backend" cmd /k "cd /d "%~dp0backend" && python main.py"
start "ClearPath React Frontend" cmd /k "cd /d "%~dp0frontend" && npm.cmd run dev"
echo.
echo Both servers have been launched in separate windows!
echo - Frontend: http://localhost:5173
echo - Backend:  http://127.0.0.1:8000
echo.
pause
