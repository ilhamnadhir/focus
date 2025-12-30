import React from 'react';
import { motion } from 'framer-motion';

const NeumorphicCard = ({
    children,
    className = '',
    hoverable = true,
    onClick,
    ...props
}) => {
    return (
        <motion.div
            className={`neu-surface p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
            whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default NeumorphicCard;
