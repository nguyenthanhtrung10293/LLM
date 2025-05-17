@echo off
REM Windows setup script for the Trading Platform application

echo Setting up Trading Platform Application...

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install

REM Create Python virtual environment and install backend dependencies
echo Setting up backend environment...
cd backend

if not exist venv\ (
    echo Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
echo Installing backend dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
cd ..
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please update the .env file with your settings
)

echo Setup complete! You can now run the application with start_app.bat
