import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { EnergyProvider } from './contexts/EnergyContext';
import Navbar from './components/layout/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Focus from './pages/Focus';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Channels from './pages/Channels';
import Garden from './pages/Garden';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-neu-base flex items-center justify-center">
                <div className="text-graphite-500">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <EnergyProvider>
                <Router>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/focus"
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Focus />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Tasks />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/leaderboard"
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Leaderboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/channels"
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Channels />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/garden"
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Garden />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default Redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
                </EnergyProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
