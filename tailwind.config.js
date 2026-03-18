/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gb: {
          bg: '#060610',
          surface: '#0c0c18',
          card: '#0f1019',
          border: '#1a1a2e',
          primary: '#00e5ff',
          secondary: '#7c4dff',
          accent: '#ff4081',
          success: '#00e676',
          warning: '#ffab00',
          text: '#e8e8f0',
          muted: '#5a5a7a',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,229,255,0.2), 0 0 20px rgba(0,229,255,0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(0,229,255,0.4), 0 0 50px rgba(0,229,255,0.2)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.3), 0 0 60px rgba(124,77,255,0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(0,229,255,0.5), 0 0 80px rgba(124,77,255,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
