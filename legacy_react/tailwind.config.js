/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Neumorphic color palette based on CSS variables
                'neu-base': 'var(--color-neu-base)',
                'neu-dark': 'var(--color-neu-dark)',
                'neu-light': 'var(--color-neu-light)',
                'coral': {
                    100: '#ffd4d4',
                    200: '#ffb8b8',
                    300: '#ff9c9c',
                    400: '#ff8080',
                    500: '#ff6b6b',
                    600: '#e85d5d',
                },
                'graphite': {
                    100: 'var(--color-graphite-100)',
                    200: 'var(--color-graphite-200)',
                    300: 'var(--color-graphite-300)',
                    400: 'var(--color-graphite-400)',
                    500: 'var(--color-graphite-500)',
                    600: 'var(--color-graphite-600)',
                }
            },
            boxShadow: {
                // Neumorphic shadows connected to CSS variables
                'neu': '8px 8px 16px var(--shadow-neu-dark-val), -8px -8px 16px var(--shadow-neu-light-val)',
                'neu-sm': '4px 4px 8px var(--shadow-neu-dark-val), -4px -4px 8px var(--shadow-neu-light-val)',
                'neu-lg': '12px 12px 24px var(--shadow-neu-dark-val), -12px -12px 24px var(--shadow-neu-light-val)',
                'neu-inset': 'inset 4px 4px 8px var(--shadow-neu-dark-val), inset -4px -4px 8px var(--shadow-neu-light-val)',
                'neu-inset-sm': 'inset 2px 2px 4px var(--shadow-neu-dark-val), inset -2px -2px 4px var(--shadow-neu-light-val)',
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
