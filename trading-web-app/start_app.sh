#!/bin/bash
# Shell script to start both frontend and backend

echo "Starting the Trading Platform application..."

# Start backend in a new terminal window
gnome-terminal --tab --title="Backend Server" --command="bash -c 'cd backend && ./start_server.sh; exec bash'" 2>/dev/null || \
xterm -title "Backend Server" -e "cd backend && ./start_server.sh" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/backend && ./start_server.sh"' 2>/dev/null || \
echo "Could not open a new terminal window for backend, starting in background..." && \
(cd backend && ./start_server.sh &)

# Wait for a moment to allow the backend to start
echo "Waiting for backend to start..."
sleep 5

# Start frontend
echo "Starting React frontend..."
npm start
