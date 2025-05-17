#!/bin/bash
# Shell script to run the FastAPI backend server

# Navigate to the backend directory
cd "$(dirname "$0")"

# Check if Python virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate 2>/dev/null || venv\Scripts\activate.bat

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Run the server
echo "Starting FastAPI server..."
python run.py
