import React from 'react';

const NeumorphicInput = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    icon,
    ...props
}) => {
    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-graphite-400">
                    {icon}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
          w-full px-4 py-3 
          ${icon ? 'pl-12' : ''}
          bg-neu-base 
          rounded-neu-sm 
          shadow-neu-inset 
          text-graphite-600 
          placeholder-graphite-400
          focus:outline-none 
          focus:ring-2 
          focus:ring-coral-400
          transition-all
          ${className}
        `}
                {...props}
            />
        </div>
    );
};

export default NeumorphicInput;
