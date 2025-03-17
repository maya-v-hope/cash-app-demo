/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D632',
        secondary: '#1A1A1A',
        background: '#F7F7F7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 0.8 },
        }
      },
      animation: {
        'sparkle': 'sparkle 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
} 