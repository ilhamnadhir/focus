import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import NeumorphicCard from '../components/ui/NeumorphicCard';
import { FiAward } from 'react-icons/fi';

const Leaderboard = () => {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRank, setUserRank] = useState(null);

    useEffect(() => {
        fetchLeaderboard();
    }, [user]);

    const fetchLeaderboard = () => {
        try {
            // Get all sessions from localStorage
            const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]');

            // Calculate total focus time per user
            const userStats = {};
            sessions.forEach(session => {
                if (!userStats[session.userId]) {
                    userStats[session.userId] = {
                        userId: session.userId,
                        totalFocusTime: 0
                    };
                }
                userStats[session.userId].totalFocusTime += session.duration;
            });

            // Get user details and create leaderboard
            const users = Object.values(userStats)
                .map((stat, index) => ({
                    id: stat.userId,
                    rank: index + 1,
                    displayName: stat.userId === user?.uid ? user.displayName : 'User ' + stat.userId.slice(-4),
                    email: stat.userId === user?.uid ? user.email : 'user@focus.app',
                    photoURL: stat.userId === user?.uid ? user.photoURL : null,
                    totalFocusTime: stat.totalFocusTime
                }))
                .sort((a, b) => b.totalFocusTime - a.totalFocusTime)
                .map((u, index) => ({ ...u, rank: index + 1 }))
                .slice(0, 50);

            setLeaderboard(users);

            // Find current user's rank
            const currentUserRank = users.findIndex(u => u.id === user?.uid);
            if (currentUserRank !== -1) {
                setUserRank(currentUserRank + 1);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return null;
    };

    const getRankColor = (rank) => {
        if (rank === 1) return 'text-yellow-500';
        if (rank === 2) return 'text-gray-400';
        if (rank === 3) return 'text-orange-600';
        return 'text-graphite-500';
    };

    return (
        <div className="min-h-screen bg-neu-base p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <div className="text-6xl mb-4">🏆</div>
                    <h1 className="text-4xl font-bold text-graphite-600 mb-2">
                        Leaderboard
                    </h1>
                    <p className="text-graphite-500">Global rankings by total focus time</p>
                </motion.div>

                {/* User's Rank Card */}
                {userRank && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <NeumorphicCard className="bg-gradient-to-r from-coral-100 to-coral-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl font-bold text-coral-600">#{userRank}</div>
                                    <div>
                                        <div className="font-semibold text-graphite-600">Your Rank</div>
                                        <div className="text-sm text-graphite-500">Keep up the great work!</div>
                                    </div>
                                </div>
                                <FiAward className="text-coral-500 text-4xl" />
                            </div>
                        </NeumorphicCard>
                    </motion.div>
                )}

                {/* Leaderboard Table */}
                <NeumorphicCard>
                    {loading ? (
                        <div className="text-center py-8 text-graphite-500">Loading leaderboard...</div>
                    ) : leaderboard.length === 0 ? (
                        <div className="text-center py-8 text-graphite-500">
                            No users on the leaderboard yet. Be the first!
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {/* Header */}
                            <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-neu-dark text-sm font-semibold text-graphite-500">
                                <div className="col-span-2">Rank</div>
                                <div className="col-span-6">User</div>
                                <div className="col-span-4 text-right">Focus Time</div>
                            </div>

                            {/* Leaderboard Entries */}
                            {leaderboard.map((entry, index) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`
                    grid grid-cols-12 gap-4 p-4 rounded-neu-sm
                    ${entry.id === user?.uid
                                            ? 'neu-surface-sm ring-2 ring-coral-400'
                                            : 'neu-surface-sm'
                                        }
                  `}
                                >
                                    {/* Rank */}
                                    <div className="col-span-2 flex items-center gap-2">
                                        <span className={`text-2xl font-bold ${getRankColor(entry.rank)}`}>
                                            {getRankIcon(entry.rank) || `#${entry.rank}`}
                                        </span>
                                    </div>

                                    {/* User Info */}
                                    <div className="col-span-6 flex items-center gap-3">
                                        {entry.photoURL && (
                                            <img
                                                src={entry.photoURL}
                                                alt={entry.displayName}
                                                className="w-10 h-10 rounded-full shadow-neu-sm"
                                            />
                                        )}
                                        <div>
                                            <div className="font-semibold text-graphite-600">
                                                {entry.displayName || 'Anonymous'}
                                                {entry.id === user?.uid && (
                                                    <span className="ml-2 text-xs text-coral-500">(You)</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-graphite-400">{entry.email}</div>
                                        </div>
                                    </div>

                                    {/* Focus Time */}
                                    <div className="col-span-4 flex items-center justify-end">
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-coral-500">
                                                {formatTime(entry.totalFocusTime || 0)}
                                            </div>
                                            <div className="text-xs text-graphite-400">total focus</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </NeumorphicCard>
            </div>
        </div>
    );
};

export default Leaderboard;
