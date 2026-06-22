/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0f',
          light: '#12121a',
          mid: '#1a1a2e',
          deep: '#060609',
        },
        champagne: {
          DEFAULT: '#d4a853',
          light: '#e8c878',
          muted: '#b8943f',
          dark: '#9a7830',
          glow: 'rgba(212, 168, 83, 0.15)',
        },
        pearl: {
          DEFAULT: '#f0e6d3',
          dim: '#a89b8c',
          warm: '#e8dcc8',
          bright: '#faf5ec',
        },
      },
      fontFamily: {
        luxury: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-24px)' },
        },
        'float-card-1': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-card-2': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-card-3': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 168, 83, 0.3), 0 0 10px rgba(212, 168, 83, 0.1)' },
          '50%': { boxShadow: '0 0 15px rgba(212, 168, 83, 0.5), 0 0 30px rgba(212, 168, 83, 0.2)' },
        },
        'border-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-medium': 'float-medium 4.5s ease-in-out infinite',
        'float-fast': 'float-fast 3.5s ease-in-out infinite',
        'float-card-1': 'float-card-1 5s ease-in-out infinite',
        'float-card-2': 'float-card-2 4s ease-in-out infinite',
        'float-card-3': 'float-card-3 5.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'border-shimmer': 'border-shimmer 4s ease-in-out infinite',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      backgroundImage: {
        'holographic': 'conic-gradient(from 0deg, #d4a853, #e8c878, #f0e6d3, #d4a853, #b8943f, #e8c878, #d4a853)',
        'hero-gradient': 'radial-gradient(ellipse at 30% 20%, rgba(212, 168, 83, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(26, 26, 46, 0.6) 0%, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
