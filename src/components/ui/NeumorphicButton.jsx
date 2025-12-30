import React from 'react';
import { motion } from 'framer-motion';

const NeumorphicButton = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    icon,
    disabled = false,
    loading = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'neu-surface transition-neu font-semibold flex items-center justify-center gap-2';

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'p-3',
    };

    const variantClasses = {
        primary: 'text-coral-500 hover:text-coral-600',
        secondary: 'text-graphite-500 hover:text-graphite-600',
        icon: 'text-graphite-500 hover:text-coral-500',
    };

    const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:shadow-neu-inset';

    return (
        <motion.button
            whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
            onClick={disabled || loading ? undefined : onClick}
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-coral-500 border-t-transparent rounded-full" />
            ) : (
                <>
                    {icon && <span>{icon}</span>}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default NeumorphicButton;
