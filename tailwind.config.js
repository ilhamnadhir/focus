/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Neumorphic color palette based on UI reference
                'neu-base': '#e4e7ec',
                'neu-dark': '#d1d5db',
                'neu-light': '#ffffff',
                'coral': {
                    100: '#ffd4d4',
                    200: '#ffb8b8',
                    300: '#ff9c9c',
                    400: '#ff8080',
                    500: '#ff6b6b',
                    600: '#e85d5d',
                },
                'graphite': {
                    100: '#f5f5f5',
                    200: '#e0e0e0',
                    300: '#bdbdbd',
                    400: '#9e9e9e',
                    500: '#757575',
                    600: '#616161',
                }
            },
            boxShadow: {
                // Neumorphic shadows
                'neu': '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
                'neu-sm': '4px 4px 8px #d1d5db, -4px -4px 8px #ffffff',
                'neu-lg': '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff',
                'neu-inset': 'inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff',
                'neu-inset-sm': 'inset 2px 2px 4px #d1d5db, inset -2px -2px 4px #ffffff',
            },
            borderRadius: {
                'neu': '20px',
                'neu-sm': '12px',
                'neu-lg': '30px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
            },
        },
    },
    plugins: [],
}
