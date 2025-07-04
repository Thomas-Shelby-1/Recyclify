/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fall: 'fall 2s ease-out infinite',
      },
      keyframes: {
        fall: {
          '0%': {
            transform: 'translateY(-100%) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
