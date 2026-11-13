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
        surface: {
          950: '#070a12',
          900: '#0b0f19',
          850: '#0e1424',
          800: '#121a2f',
          750: '#17223b',
          700: '#1c2742',
          600: '#253356',
        },
        brand: {
          500: '#8b5cf6',
          600: '#7c3aed',
          400: '#a78bfa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
