@echo off
REM Windows batch script to run the FastAPI backend server

REM Navigate to the backend directory
cd /d "%~dp0"

REM Check if Python virtual environment exists
if not exist venv\ (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing requirements...
pip install -r requirements.txt

REM Run the server
echo Starting FastAPI server...
python run.py
