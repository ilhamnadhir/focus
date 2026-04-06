import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NeumorphicCard from '../components/ui/NeumorphicCard';
import NeumorphicButton from '../components/ui/NeumorphicButton';
import { FiClock, FiTarget, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { format } from 'date-fns';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [todayFocusTime, setTodayFocusTime] = useState(0);
    const [totalFocusTime, setTotalFocusTime] = useState(0);
    const [todayTasks, setTodayTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const today = format(new Date(), 'yyyy-MM-dd');

            // Fetch today's focus sessions from localStorage
            const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]');
            const todaySessions = sessions.filter(s => s.date === today && s.userId === user.uid);
            const totalTime = todaySessions.reduce((sum, session) => sum + session.duration, 0);
            setTodayFocusTime(totalTime);

            // Fetch absolute total focus time
            const storedUser = JSON.parse(localStorage.getItem('focusUser') || '{}');
            setTotalFocusTime(storedUser.totalFocusTime || 0);

            // Fetch tasks from localStorage
            const tasks = JSON.parse(localStorage.getItem('focusTasks') || '[]');
            const userTasks = tasks
                .filter(t => t.userId === user.uid)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);
            setTodayTasks(userTasks);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neu-base flex items-center justify-center">
                <div className="animate-pulse-soft text-coral-500 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neu-base p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-graphite-600 mb-2">
                        Welcome back, {user?.displayName?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-graphite-500">Let's make today productive</p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    {/* Today's Focus Time */}
                    <motion.div variants={itemVariants}>
                        <NeumorphicCard>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 neu-surface rounded-full flex items-center justify-center">
                                    <FiClock className="text-coral-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-graphite-500 text-sm">Today's Focus</p>
                                    <p className="text-2xl font-bold text-graphite-600">
                                        {formatTime(todayFocusTime)}
                                    </p>
                                </div>
                            </div>
                        </NeumorphicCard>
                    </motion.div>

                    {/* Tasks Completed */}
                    <motion.div variants={itemVariants}>
                        <NeumorphicCard>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 neu-surface rounded-full flex items-center justify-center">
                                    <FiCheckCircle className="text-coral-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-graphite-500 text-sm">Tasks Completed</p>
                                    <p className="text-2xl font-bold text-graphite-600">
                                        {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
                                    </p>
                                </div>
                            </div>
                        </NeumorphicCard>
                    </motion.div>

                    {/* Focus Target */}
                    <motion.div variants={itemVariants}>
                        <NeumorphicCard>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 neu-surface rounded-full flex items-center justify-center">
                                    <FiTarget className="text-coral-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-graphite-500 text-sm">All-time Focus</p>
                                    <p className="text-2xl font-bold text-graphite-600">{formatTime(totalFocusTime)}</p>
                                </div>
                            </div>
                        </NeumorphicCard>
                    </motion.div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <motion.div variants={itemVariants}>
                        <NeumorphicCard hoverable onClick={() => navigate('/focus')} className="text-center">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-graphite-600 mb-2">Start Focus</h3>
                            <p className="text-graphite-500 text-sm">Begin a Pomodoro session</p>
                        </NeumorphicCard>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <NeumorphicCard hoverable onClick={() => navigate('/tasks')} className="text-center">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold text-graphite-600 mb-2">Manage Tasks</h3>
                            <p className="text-graphite-500 text-sm">View and organize your to-dos</p>
                        </NeumorphicCard>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <NeumorphicCard hoverable onClick={() => navigate('/leaderboard')} className="text-center">
                            <div className="text-5xl mb-4">🏆</div>
                            <h3 className="text-xl font-semibold text-graphite-600 mb-2">Leaderboard</h3>
                            <p className="text-graphite-500 text-sm">See how you rank globally</p>
                        </NeumorphicCard>
                    </motion.div>
                </motion.div>

                {/* Recent Tasks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <NeumorphicCard>
                        <h2 className="text-2xl font-bold text-graphite-600 mb-4 flex items-center gap-2">
                            <FiTrendingUp className="text-coral-500" />
                            Recent Tasks
                        </h2>
                        {todayTasks.length === 0 ? (
                            <p className="text-graphite-500 text-center py-8">
                                No tasks yet. Create your first task to get started!
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {todayTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center gap-3 p-3 neu-surface-sm rounded-neu-sm"
                                    >
                                        <div className={`w-5 h-5 rounded-full ${task.completed ? 'bg-coral-500' : 'bg-graphite-300'}`} />
                                        <span className={`flex-1 ${task.completed ? 'line-through text-graphite-400' : 'text-graphite-600'}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <NeumorphicButton onClick={() => navigate('/tasks')} className="w-full">
                                View All Tasks
                            </NeumorphicButton>
                        </div>
                    </NeumorphicCard>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
