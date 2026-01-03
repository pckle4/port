module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'dusk-blue': 'hsl(var(--dusk-blue))',
        'dusty-lavender': 'hsl(var(--dusty-lavender))',
        rosewood: 'hsl(var(--rosewood))',
        'light-coral': 'hsl(var(--light-coral))',
        'light-bronze': 'hsl(var(--light-bronze))',
      },
      backgroundImage: {
        'fusion-gradient': 'linear-gradient(to right, hsl(var(--dusk-blue)), hsl(var(--dusty-lavender)), hsl(var(--rosewood)), hsl(var(--light-coral)), hsl(var(--light-bronze)))',
        'radial-faint': 'radial-gradient(circle at 50% -20%, hsl(var(--dusk-blue) / 0.15), transparent 60%)',
        'mesh-dark': 'radial-gradient(at 0% 0%, hsl(var(--dusk-blue) / 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, hsl(var(--dusty-lavender) / 0.1) 0px, transparent 50%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'spring-gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%': { transform: 'translateY(-10px) translateZ(0)' },
        },
      },
    },
  },
  plugins: [],
};
