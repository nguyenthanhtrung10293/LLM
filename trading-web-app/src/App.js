import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import StockDetails from './pages/StockDetails/StockDetails';
import Portfolio from './pages/Portfolio/Portfolio';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';

// Auth Components
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { StockProvider } from './context/StockContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { NotificationProvider } from './context/NotificationContext';

// UI Components
import NotificationSystem from './components/UI/NotificationSystem/NotificationSystem';

function App() {
  return (
    <AuthProvider>
      <StockProvider>
        <PortfolioProvider>
          <NotificationProvider>
            <Router>
              <div className="App">
                <NotificationSystem />
                <Routes>
                  {/* Main Application Routes with MainLayout */}
                  <Route path="/" element={
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  } />
                  <Route path="/stock/:symbol" element={
                    <MainLayout>
                      <StockDetails />
                    </MainLayout>
                  } />                <Route path="/portfolio" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Portfolio />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                  
                  {/* Authentication Routes with AuthLayout */}
                  <Route path="/login" element={
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  } />
                  <Route path="/register" element={
                    <AuthLayout>
                      <Register />
                    </AuthLayout>
                  } />
                  
                  {/* Redirect for any unmatched routes */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Router>
          </NotificationProvider>
        </PortfolioProvider>
      </StockProvider>
    </AuthProvider>
  );
}

export default App;
