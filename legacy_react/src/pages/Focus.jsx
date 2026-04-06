import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import useTimer from '../hooks/useTimer';
import CircularProgress from '../components/ui/CircularProgress';
import NeumorphicButton from '../components/ui/NeumorphicButton';
import NeumorphicCard from '../components/ui/NeumorphicCard';
import NeumorphicInput from '../components/ui/NeumorphicInput';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';

const POMODORO_PRESETS = {
    '25:5': { focus: 25 * 60, break: 5 * 60 },
    '50:10': { focus: 50 * 60, break: 10 * 60 },
    'Custom': { focus: 0, break: 0 }
};

const Focus = () => {
    const { user } = useAuth();
    const shouldStartRef = React.useRef(false);
    const [selectedPreset, setSelectedPreset] = useState('25:5');
    const [customFocus, setCustomFocus] = useState(25);
    const [customBreak, setCustomBreak] = useState(5);
    const [sessionType, setSessionType] = useState('focus'); // 'focus' or 'break'
    const [sessionStartTime, setSessionStartTime] = useState(null);

    const preset = selectedPreset === 'Custom' 
        ? { focus: customFocus * 60, break: customBreak * 60 }
        : POMODORO_PRESETS[selectedPreset];
    const initialTime = sessionType === 'focus' ? preset.focus : preset.break;

    const handleSessionComplete = async () => {
        if (sessionType === 'focus' && sessionStartTime) {
            // Save focus session to localStorage
            try {
                const duration = preset.focus;
                const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]');
                sessions.push({
                    userId: user.uid,
                    duration: duration,
                    date: format(new Date(), 'yyyy-MM-dd'),
                    timestamp: new Date().toISOString(),
                });
                localStorage.setItem('focusSessions', JSON.stringify(sessions));

                // Update user's total focus time
                const storedUser = JSON.parse(localStorage.getItem('focusUser'));
                if (storedUser) {
                    storedUser.totalFocusTime = (storedUser.totalFocusTime || 0) + duration;
                    localStorage.setItem('focusUser', JSON.stringify(storedUser));
                }
            } catch (error) {
                console.error('Error saving focus session:', error);
            }
        }

        // Switch to break or focus
        if (sessionType === 'focus') {
            setSessionType('break');
        } else {
            setSessionType('focus');
        }
    };

    const timer = useTimer(initialTime, handleSessionComplete);

    useEffect(() => {
        timer.reset(initialTime);
        if (shouldStartRef.current) {
            timer.start();
            shouldStartRef.current = false;
        }
    }, [sessionType, selectedPreset, customFocus, customBreak]);

    const handleStart = () => {
        if (!timer.isRunning) {
            setSessionStartTime(new Date());
        }
        timer.start();
    };

    const handleReset = () => {
        timer.reset(initialTime);
        setSessionStartTime(null);
        setSessionType('focus');
    };

    const handleModeAction = (type) => {
        if (sessionType === type) {
            if (timer.isRunning) {
                if (timer.isPaused) {
                    timer.resume();
                } else {
                    timer.pause();
                }
            } else {
                handleStart();
            }
        } else {
            shouldStartRef.current = true;
            setSessionType(type);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-neu-base flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    {/* Session Type Indicator */}
                    <motion.div
                        key={sessionType}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-graphite-600 mb-2">
                            {sessionType === 'focus' ? '🎯 Focus Time' : '☕ Break Time'}
                        </h1>
                        <p className="text-graphite-500">
                            {sessionType === 'focus'
                                ? 'Stay focused and productive'
                                : 'Take a well-deserved break'}
                        </p>
                    </motion.div>

                    {/* Pomodoro Preset Selector */}
                    <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-8 flex justify-center gap-4"
                        >
                            {Object.keys(POMODORO_PRESETS).map((p) => (
                                <NeumorphicButton
                                    key={p}
                                    onClick={() => setSelectedPreset(p)}
                                    variant={selectedPreset === p ? 'primary' : 'secondary'}
                                    className={selectedPreset === p ? 'ring-2 ring-coral-400' : ''}
                                >
                                    {p}
                                </NeumorphicButton>
                            ))}
                        </motion.div>

                    {/* Custom Inputs */}
                    {selectedPreset === 'Custom' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-8 flex justify-center gap-6 items-center"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-graphite-500 text-sm">Focus</span>
                                <div className="w-24">
                                    <NeumorphicInput
                                        type="number"
                                        min="1"
                                        value={customFocus}
                                        onChange={(e) => setCustomFocus(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-graphite-500 text-sm">Break</span>
                                <div className="w-24">
                                    <NeumorphicInput
                                        type="number"
                                        min="1"
                                        value={customBreak}
                                        onChange={(e) => setCustomBreak(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Timer Display */}
                    <NeumorphicCard className="mb-8 flex justify-center">
                        <CircularProgress
                            progress={timer.progress}
                            size={280}
                            strokeWidth={16}
                            color={sessionType === 'focus' ? '#ff6b6b' : '#4ade80'}
                        >
                            <div className="text-center">
                                <div className="text-6xl font-bold text-graphite-600 mb-2">
                                    {formatTime(timer.timeLeft)}
                                </div>
                                <div className="text-sm text-graphite-500 uppercase tracking-wide">
                                    {timer.isRunning && !timer.isPaused ? 'In Progress' :
                                        timer.isPaused ? 'Paused' : 'Ready'}
                                </div>
                            </div>
                        </CircularProgress>
                    </NeumorphicCard>

                    {/* Controls */}
                    <div className="flex justify-center gap-4">
                        {!timer.isRunning || timer.isPaused ? (
                            <NeumorphicButton
                                onClick={timer.isPaused ? timer.resume : handleStart}
                                size="lg"
                                icon={<FiPlay size={24} />}
                            >
                                {timer.isPaused ? 'Resume' : 'Start'}
                            </NeumorphicButton>
                        ) : (
                            <NeumorphicButton
                                onClick={timer.pause}
                                size="lg"
                                icon={<FiPause size={24} />}
                            >
                                Pause
                            </NeumorphicButton>
                        )}

                        <NeumorphicButton
                            onClick={handleReset}
                            size="lg"
                            variant="secondary"
                            icon={<FiRotateCcw size={24} />}
                        >
                            Reset
                        </NeumorphicButton>
                    </div>

                    {/* Session Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 grid grid-cols-2 gap-4"
                    >
                        <NeumorphicButton
                            onClick={() => handleModeAction('focus')}
                            className={`flex-col items-center p-6 h-auto ${sessionType === 'focus' ? 'ring-2 ring-coral-400' : ''}`}
                            variant={sessionType === 'focus' ? 'primary' : 'secondary'}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm ${sessionType === 'focus' ? 'text-coral-500' : 'text-graphite-500'} opacity-80`}>Focus Duration</span>
                                {sessionType === 'focus' && timer.isRunning && (
                                    timer.isPaused ? <FiPlay size={14} className="text-coral-500" /> : <FiPause size={14} className="text-coral-500" />
                                )}
                            </div>
                            <div className={`text-2xl font-bold ${sessionType === 'focus' ? 'text-coral-500' : 'text-graphite-500'}`}>
                                {preset.focus / 60} min
                            </div>
                        </NeumorphicButton>

                        <NeumorphicButton
                            onClick={() => handleModeAction('break')}
                            className={`flex-col items-center p-6 h-auto ${sessionType === 'break' ? 'ring-2 ring-emerald-400' : ''}`}
                            variant={sessionType === 'break' ? 'primary' : 'secondary'}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm ${sessionType === 'break' ? 'text-emerald-500' : 'text-graphite-500'} opacity-80`}>Break Duration</span>
                                {sessionType === 'break' && timer.isRunning && (
                                    timer.isPaused ? <FiPlay size={14} className="text-emerald-500" /> : <FiPause size={14} className="text-emerald-500" />
                                )}
                            </div>
                            <div className={`text-2xl font-bold ${sessionType === 'break' ? 'text-emerald-500' : 'text-graphite-500'}`}>
                                {preset.break / 60} min
                            </div>
                        </NeumorphicButton>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Focus;
