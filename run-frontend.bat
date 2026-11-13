@echo off
title ClearPath - React Frontend
echo ========================================================
echo Starting ClearPath React Frontend...
echo ========================================================
cd /d "%~dp0frontend"
npm.cmd run dev
pause
