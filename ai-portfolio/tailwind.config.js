/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0b0f13',
        'panel': '#0f1720',
        'neon-cyan': '#00f0ff',
        'neon-pink': '#ff3ca6',
        'muted': '#94a3b8'
      }
    },
  },
  plugins: [],
}

