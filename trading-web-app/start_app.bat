@echo off
REM Windows batch script to start both frontend and backend

echo Starting the Trading Platform application...

REM Start backend in a new terminal window
start cmd /k "cd backend && start_server.bat"

REM Wait for a moment to allow the backend to start
timeout /t 5

REM Start frontend
echo Starting React frontend...
npm start
