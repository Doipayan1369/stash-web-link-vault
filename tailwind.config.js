/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        apple: {
          bg: '#FBFBFD',
          surface: '#FFFFFF',
          card: 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(0, 0, 0, 0.08)',
          borderHover: 'rgba(0, 0, 0, 0.18)',
          text: '#1D1D1F',
          muted: '#6E6E73',
          subtle: '#86868B',
          blue: '#0071E3',
          blueHover: '#0077ED',
          gold: '#F59E0B'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
