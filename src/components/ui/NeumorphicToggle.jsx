import React from 'react';
import { motion } from 'framer-motion';

const NeumorphicToggle = ({
    checked,
    onChange,
    label,
    className = ''
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                onClick={() => onChange(!checked)}
                className="relative w-14 h-8 neu-surface rounded-full transition-neu focus:outline-none"
            >
                <motion.div
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-neu-sm ${checked ? 'bg-coral-500' : 'bg-graphite-300'
                        }`}
                    animate={{
                        x: checked ? 24 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </button>
            {label && (
                <span className="text-graphite-600 font-medium">{label}</span>
            )}
        </div>
    );
};

export default NeumorphicToggle;
