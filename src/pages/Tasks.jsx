import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import NeumorphicCard from '../components/ui/NeumorphicCard';
import NeumorphicButton from '../components/ui/NeumorphicButton';
import NeumorphicInput from '../components/ui/NeumorphicInput';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

const Tasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [estimatedSessions, setEstimatedSessions] = useState(1);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadTasks();
        }
    }, [user]);

    const loadTasks = () => {
        try {
            const allTasks = JSON.parse(localStorage.getItem('focusTasks') || '[]');
            const userTasks = allTasks
                .filter(t => t.userId === user.uid)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTasks(userTasks);
            setLoading(false);
        } catch (error) {
            console.error('Error loading tasks:', error);
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const allTasks = JSON.parse(localStorage.getItem('focusTasks') || '[]');
            const newTask = {
                id: Date.now().toString(),
                userId: user.uid,
                title: newTaskTitle,
                estimatedSessions: parseInt(estimatedSessions, 10) || 1,
                completed: false,
                createdAt: new Date().toISOString(),
            };
            allTasks.push(newTask);
            localStorage.setItem('focusTasks', JSON.stringify(allTasks));
            setNewTaskTitle('');
            setEstimatedSessions(1);
            loadTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleToggleTask = async (taskId, currentStatus) => {
        try {
            const allTasks = JSON.parse(localStorage.getItem('focusTasks') || '[]');
            const taskIndex = allTasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                allTasks[taskIndex].completed = !currentStatus;
                localStorage.setItem('focusTasks', JSON.stringify(allTasks));
                loadTasks();
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const allTasks = JSON.parse(localStorage.getItem('focusTasks') || '[]');
            const filteredTasks = allTasks.filter(t => t.id !== taskId);
            localStorage.setItem('focusTasks', JSON.stringify(filteredTasks));
            loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const stats = {
        total: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
    };

    return (
        <div className="min-h-screen bg-neu-base p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-graphite-600 mb-2">
                        Tasks ✅
                    </h1>
                    <p className="text-graphite-500">Organize and track your to-dos</p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-4 mb-8"
                >
                    <NeumorphicCard className="text-center">
                        <div className="text-3xl font-bold text-graphite-600">{stats.total}</div>
                        <div className="text-sm text-graphite-500">Total</div>
                    </NeumorphicCard>
                    <NeumorphicCard className="text-center">
                        <div className="text-3xl font-bold text-coral-500">{stats.active}</div>
                        <div className="text-sm text-graphite-500">Active</div>
                    </NeumorphicCard>
                    <NeumorphicCard className="text-center">
                        <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
                        <div className="text-sm text-graphite-500">Completed</div>
                    </NeumorphicCard>
                </motion.div>

                {/* Add Task Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <NeumorphicCard className="mb-6">
                        <form onSubmit={handleAddTask} className="flex gap-3">
                            <NeumorphicInput
                                placeholder="Add a new task..."
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                className="flex-1"
                            />
                            <div className="w-24">
                                <NeumorphicInput
                                    type="number"
                                    min="1"
                                    placeholder="Est."
                                    value={estimatedSessions}
                                    onChange={(e) => setEstimatedSessions(e.target.value)}
                                />
                            </div>
                            <NeumorphicButton
                                type="submit"
                                icon={<FiPlus size={20} />}
                                disabled={!newTaskTitle.trim()}
                            >
                                Add
                            </NeumorphicButton>
                        </form>
                    </NeumorphicCard>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 mb-6"
                >
                    {['all', 'active', 'completed'].map((f) => (
                        <NeumorphicButton
                            key={f}
                            onClick={() => setFilter(f)}
                            variant={filter === f ? 'primary' : 'secondary'}
                            size="sm"
                            className={filter === f ? 'ring-2 ring-coral-400' : ''}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </NeumorphicButton>
                    ))}
                </motion.div>

                {/* Tasks List */}
                <NeumorphicCard>
                    {loading ? (
                        <div className="text-center py-8 text-graphite-500">Loading tasks...</div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="text-center py-8 text-graphite-500">
                            {filter === 'all' ? 'No tasks yet. Add one to get started!' :
                                filter === 'active' ? 'No active tasks!' :
                                    'No completed tasks yet!'}
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            <div className="space-y-3">
                                {filteredTasks.map((task, index) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-3 p-4 neu-surface-sm rounded-neu-sm group"
                                    >
                                        {/* Checkbox */}
                                        <button
                                            onClick={() => handleToggleTask(task.id, task.completed)}
                                            className={`
                        w-6 h-6 rounded-full flex items-center justify-center
                        transition-all duration-300
                        ${task.completed
                                                    ? 'bg-coral-500 shadow-neu-sm'
                                                    : 'bg-neu-base shadow-neu-inset-sm'
                                                }
                      `}
                                        >
                                            {task.completed && <FiCheck className="text-white" size={16} />}
                                        </button>

                                        {/* Task Details */}
                                        <div className={`flex-1 transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
                                            <div className={`${task.completed ? 'line-through text-graphite-400' : 'text-graphite-600'}`}>
                                                {task.title}
                                            </div>
                                            {task.estimatedSessions > 0 && (
                                                <div className="text-xs text-graphite-400 mt-1">
                                                    🎯 {task.estimatedSessions} session{task.estimatedSessions > 1 ? 's' : ''} est.
                                                </div>
                                            )}
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-graphite-400 hover:text-coral-500"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    )}
                </NeumorphicCard>
            </div>
        </div>
    );
};

export default Tasks;
