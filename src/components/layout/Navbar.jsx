import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import NeumorphicButton from '../ui/NeumorphicButton';
import { FiHome, FiTarget, FiCheckSquare, FiTrendingUp, FiLogOut, FiUser, FiSun, FiMoon, FiUsers } from 'react-icons/fi';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/focus', icon: FiTarget, label: 'Focus' },
        { path: '/tasks', icon: FiCheckSquare, label: 'Tasks' },
        { path: '/leaderboard', icon: FiTrendingUp, label: 'Leaderboard' },
        { path: '/channels', icon: FiUsers, label: 'Channels' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-neu-base border-b border-neu-dark sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 neu-surface rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <span className="text-2xl font-bold text-graphite-600">Focus</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                    px-4 py-2 rounded-neu-sm flex items-center gap-2
                    transition-all duration-300
                    ${isActive(item.path)
                                            ? 'shadow-neu-inset text-coral-500'
                                            : 'shadow-neu text-graphite-500 hover:text-coral-500'
                                        }
                  `}
                                >
                                    <item.icon size={18} />
                                    <span className="font-medium hidden md:inline">{item.label}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Right side interactions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-graphite-500 hover:text-coral-500 neu-surface hover:shadow-neu-inset transition-all"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-3 neu-surface px-4 py-2 rounded-neu-sm hover:shadow-neu-inset transition-all"
                        >
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-coral-500 flex items-center justify-center text-white">
                                    <FiUser />
                                </div>
                            )}
                            <span className="font-medium text-graphite-600 hidden md:inline">
                                {user?.displayName?.split(' ')[0]}
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {showUserMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 neu-surface rounded-neu-sm p-2"
                                >
                                    <div className="px-3 py-2 border-b border-neu-dark mb-2">
                                        <div className="font-semibold text-graphite-600">{user?.displayName}</div>
                                        <div className="text-xs text-graphite-400">{user?.email}</div>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full px-3 py-2 text-left text-graphite-600 hover:text-coral-500 flex items-center gap-2 rounded transition-colors"
                                    >
                                        <FiLogOut size={16} />
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
