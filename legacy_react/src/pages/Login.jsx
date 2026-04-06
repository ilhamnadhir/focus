import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NeumorphicButton from '../components/ui/NeumorphicButton';
import NeumorphicCard from '../components/ui/NeumorphicCard';

const Login = () => {
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Sign in error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-neu-base flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full"
            >
                <NeumorphicCard className="text-center">
                    {/* Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 mx-auto neu-surface rounded-full flex items-center justify-center">
                            <span className="text-5xl">🎯</span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-bold text-graphite-600 mb-3"
                    >
                        Focus
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-graphite-500 mb-8"
                    >
                        Stay focused, achieve more. Track your productivity with beautiful simplicity.
                    </motion.p>

                    {/* Sign In Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <NeumorphicButton
                            onClick={handleGoogleSignIn}
                            size="lg"
                            className="w-full"
                            icon={<FcGoogle size={24} />}
                        >
                            Sign in with Google
                        </NeumorphicButton>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 grid grid-cols-3 gap-4 text-sm text-graphite-500"
                    >
                        <div>
                            <div className="text-2xl mb-1">⏱️</div>
                            <div>Pomodoro Timer</div>
                        </div>
                        <div>
                            <div className="text-2xl mb-1">✅</div>
                            <div>Task Manager</div>
                        </div>
                        <div>
                            <div className="text-2xl mb-1">🏆</div>
                            <div>Leaderboard</div>
                        </div>
                    </motion.div>
                </NeumorphicCard>
            </motion.div>
        </div>
    );
};

export default Login;
