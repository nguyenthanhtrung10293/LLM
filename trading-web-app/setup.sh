#!/bin/bash
# Setup script for the Trading Platform application

echo "Setting up Trading Platform Application..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Create Python virtual environment and install backend dependencies
echo "Setting up backend environment..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
cd ..
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please update the .env file with your settings"
fi

echo "Setup complete! You can now run the application with ./start_app.sh"
