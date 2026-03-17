/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gb: {
          bg: '#0a0a0f',
          surface: '#12121a',
          card: '#1a1a2e',
          border: '#2a2a3e',
          primary: '#00f0ff',
          secondary: '#7b2ff7',
          accent: '#ff2d55',
          success: '#00e676',
          warning: '#ffab00',
          text: '#e8e8f0',
          muted: '#6b6b8a',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,240,255,0.2), 0 0 20px rgba(0,240,255,0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(0,240,255,0.4), 0 0 40px rgba(0,240,255,0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
