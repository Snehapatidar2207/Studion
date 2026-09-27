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
        studion: {
          bg: '#0c0d12',
          card: '#14151f',
          surface: '#1a1b28',
          subtle: '#222336',
          border: '#2a2b40',
          borderGlow: 'rgba(138, 43, 226, 0.4)',
          text: '#f1f1f5',
          muted: '#9495a8',
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9370db',
            700: '#8a2be2',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
          },
          accent: {
            cyan: '#06b6d4',
            pink: '#ec4899',
            emerald: '#10b981',
            amber: '#f59e0b',
            rose: '#f43f5e',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -2px rgba(138, 43, 226, 0.35)',
        'glow-md': '0 0 25px -4px rgba(138, 43, 226, 0.5)',
        'glow-lg': '0 0 40px -5px rgba(168, 85, 247, 0.65)',
        'glow-neon': '0 0 20px rgba(147, 112, 219, 0.6), inset 0 0 15px rgba(138, 43, 226, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
