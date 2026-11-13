@echo off
title ClearPath - FastAPI Backend Server
echo ========================================================
echo Starting ClearPath FastAPI Backend on http://127.0.0.1:8000
echo ========================================================
cd /d "%~dp0backend"
python main.py
pause
