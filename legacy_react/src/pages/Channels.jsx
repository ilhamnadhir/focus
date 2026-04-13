import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import NeumorphicCard from '../components/ui/NeumorphicCard';
import NeumorphicButton from '../components/ui/NeumorphicButton';
import NeumorphicInput from '../components/ui/NeumorphicInput';
import { FiUsers, FiPlus, FiArrowLeft, FiTrendingUp } from 'react-icons/fi';

const Channels = () => {
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);
    const [activeChannelId, setActiveChannelId] = useState(null);
    const [newChannelName, setNewChannelName] = useState('');
    const [joinChannelCode, setJoinChannelCode] = useState('');
    const [joinError, setJoinError] = useState('');
    const [loading, setLoading] = useState(true);

    const activeChannel = channels.find(c => c.id === activeChannelId);

    useEffect(() => {
        if (user) {
            loadChannels();
        }
    }, [user]);

    const loadChannels = () => {
        try {
            const storedChannels = JSON.parse(localStorage.getItem('focusChannels') || '[]');
            const storedUser = JSON.parse(localStorage.getItem('focusUser') || '{}');
            
            const syncedChannels = storedChannels.map(channel => {
                const members = channel.members.map(m => 
                    m.uid === user.uid 
                        ? { ...m, totalFocusTime: storedUser.totalFocusTime || 0 }
                        : m
                );
                return { ...channel, members };
            });

            setChannels(syncedChannels);
            setLoading(false);
        } catch (error) {
            console.error('Error loading channels:', error);
            setLoading(false);
        }
    };

    const handleCreateChannel = (e) => {
        e.preventDefault();
        if (!newChannelName.trim()) return;

        const storedUser = JSON.parse(localStorage.getItem('focusUser') || '{}');
        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const newChannel = {
            id: Date.now().toString(),
            name: newChannelName,
            joinCode: joinCode,
            createdBy: user.uid,
            createdAt: new Date().toISOString(),
            members: [
                {
                    uid: user.uid,
                    displayName: user.displayName,
                    totalFocusTime: storedUser.totalFocusTime || 0
                }
            ]
        };

        const updatedChannels = [...channels, newChannel];
        localStorage.setItem('focusChannels', JSON.stringify(updatedChannels));
        
        setNewChannelName('');
        loadChannels();
        setActiveChannelId(newChannel.id); // Auto open newly created channel
    };

    const handleJoinChannel = (e) => {
        e.preventDefault();
        setJoinError('');
        if (!joinChannelCode.trim()) return;
        
        const code = joinChannelCode.trim().toUpperCase();
        const storedChannels = JSON.parse(localStorage.getItem('focusChannels') || '[]');
        
        const channelIndex = storedChannels.findIndex(c => c.joinCode === code);
        
        if (channelIndex === -1) {
            setJoinError('Channel not found. Please check your code.');
            return;
        }

        const channel = storedChannels[channelIndex];
        const isMember = channel.members.some(m => m.uid === user.uid);
        
        if (!isMember) {
            const storedUser = JSON.parse(localStorage.getItem('focusUser') || '{}');
            channel.members.push({
                uid: user.uid,
                displayName: user.displayName,
                totalFocusTime: storedUser.totalFocusTime || 0
            });
            storedChannels[channelIndex] = channel;
            localStorage.setItem('focusChannels', JSON.stringify(storedChannels));
            loadChannels();
        }
        
        setJoinChannelCode('');
        setActiveChannelId(channel.id);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neu-base flex items-center justify-center">
                <div className="text-graphite-500 animate-pulse-soft">Loading channels...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neu-base p-6">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4 mb-2">
                        {activeChannel && (
                            <button 
                                onClick={() => setActiveChannelId(null)}
                                className="w-10 h-10 neu-surface hover:shadow-neu-inset rounded-full flex items-center justify-center text-graphite-600 transition-all"
                            >
                                <FiArrowLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-4xl font-bold text-graphite-600">
                            {activeChannel ? activeChannel.name : 'Study Channels 📡'}
                        </h1>
                    </div>
                    <p className="text-graphite-500">
                        {activeChannel ? 'Analyze member progress' : 'Collaborate and track progress together'}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!activeChannel ? (
                        /* CHANNELS LIST VIEW */
                        <motion.div
                            key="channels-list"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Forms Container */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Create Channel Form */}
                                <NeumorphicCard>
                                    <form onSubmit={handleCreateChannel} className="flex gap-4 items-center">
                                        <h3 className="text-graphite-600 font-semibold whitespace-nowrap">New Channel</h3>
                                        <NeumorphicInput
                                            placeholder="Name..."
                                            value={newChannelName}
                                            onChange={(e) => setNewChannelName(e.target.value)}
                                            className="flex-1"
                                        />
                                        <NeumorphicButton
                                            type="submit"
                                            icon={<FiPlus size={20} />}
                                            disabled={!newChannelName.trim()}
                                        >
                                            Create
                                        </NeumorphicButton>
                                    </form>
                                </NeumorphicCard>

                                {/* Join Channel Form */}
                                <NeumorphicCard>
                                    <form onSubmit={handleJoinChannel} className="flex gap-4 items-center">
                                        <h3 className="text-graphite-600 font-semibold whitespace-nowrap">Join Channel</h3>
                                        <div className="flex-1">
                                            <NeumorphicInput
                                                placeholder="Code (e.g. A4FX91)"
                                                value={joinChannelCode}
                                                onChange={(e) => {
                                                    setJoinChannelCode(e.target.value);
                                                    setJoinError('');
                                                }}
                                                className="w-full"
                                            />
                                        </div>
                                        <NeumorphicButton type="submit" disabled={!joinChannelCode.trim()}>
                                            Join
                                        </NeumorphicButton>
                                    </form>
                                    {joinError && <p className="text-coral-500 text-sm mt-3 font-semibold">{joinError}</p>}
                                </NeumorphicCard>
                            </div>

                            {/* Channels Grid */}
                            {channels.length === 0 ? (
                                <div className="text-center py-12 text-graphite-500">
                                    <FiUsers size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>No channels found. Create one to start collaborating!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {channels.map(channel => (
                                        <NeumorphicCard 
                                            key={channel.id} 
                                            hoverable 
                                            onClick={() => setActiveChannelId(channel.id)}
                                            className="cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h2 className="text-xl font-bold text-graphite-600 group-hover:text-coral-500 transition-colors">
                                                    # {channel.name}
                                                </h2>
                                                <div className="flex -space-x-2">
                                                    {channel.members.slice(0, 3).map((m, i) => (
                                                        <div key={i} className="w-8 h-8 rounded-full bg-neu-base border-2 border-neu-light shadow-neu-sm flex items-center justify-center text-xs font-bold text-coral-500 z-10" style={{ zIndex: 10 - i}}>
                                                            {m.displayName.charAt(0)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-sm text-graphite-500 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FiUsers />
                                                    <span>{channel.members.length} members</span>
                                                </div>
                                                <div className="font-mono font-bold bg-neu-base px-2 py-1 rounded shadow-neu-inset-sm">
                                                    {channel.joinCode}
                                                </div>
                                            </div>
                                        </NeumorphicCard>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        /* ACTIVE CHANNEL LEADERBOARD VIEW */
                        <motion.div
                            key="channel-details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <NeumorphicCard>
                                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-neu-dark">
                                    <div className="flex items-center gap-3">
                                        <FiTrendingUp className="text-coral-500 text-2xl" />
                                        <h2 className="text-2xl font-bold text-graphite-600">Leaderboard</h2>
                                    </div>
                                    <div className="bg-neu-base shadow-neu-inset px-4 py-2 rounded-neu-sm flex items-center gap-2">
                                        <span className="text-graphite-500 text-sm">Join Code:</span>
                                        <span className="text-graphite-600 font-mono font-bold tracking-widest">{activeChannel.joinCode}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[...activeChannel.members]
                                        .sort((a, b) => b.totalFocusTime - a.totalFocusTime)
                                        .map((member, index) => (
                                        <div 
                                            key={member.uid}
                                            className={`flex items-center justify-between p-4 rounded-neu-sm ${member.uid === user.uid ? 'neu-surface ring-2 ring-coral-400' : 'neu-surface-sm'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 font-bold text-graphite-400 text-xl">
                                                    #{index + 1}
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-coral-100 flex items-center justify-center text-coral-600 font-bold text-lg">
                                                    {member.displayName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-graphite-600">
                                                        {member.displayName} {member.uid === user.uid && "(You)"}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-graphite-600">
                                                    {formatTime(member.totalFocusTime)}
                                                </div>
                                                <div className="text-xs text-graphite-400">total focus</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </NeumorphicCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Channels;
