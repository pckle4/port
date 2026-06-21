/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{html,ts}'
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
        sans: ['Cascadia Code', 'system-ui', 'sans-serif'],
        mono: ['Cascadia Code', 'Fira Code', 'monospace'],
        display: ['JetBrains Mono', 'Courier New', 'monospace'],
        handwriting: ['Caveat', 'Comic Sans MS', 'cursive'],
        retro: ['VT323', 'Courier New', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        'action-blue': '#1676F3',
        'deep-navy': '#121826',
        'warning-amber': '#FBA818',
        'magenta-accent': '#DF4994',
        'warm-paper': '#FBF7F0',
        'ink-wash': '#3A3A42',
        'pencil-graphite': '#6B6B78',
        'kraft-paper': '#E8DCC8',
        'sticky-note-yellow': '#FFF3C4',
        'highlighter-pink': '#FFE5F0',
        'tape-tan': '#F5EDE0',
        'terminal-accent': '#F05622',
        'pixel-purple': '#9B59B6',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'highlighter-gradient': 'linear-gradient(transparent 60%, #FBA818 60%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'sketchy-1': '16px 8px 16px 8px',
        'sketchy-2': '24px 8px 24px 8px',
        'sketchy-3': '12px 4px 12px 4px',
      },
      boxShadow: {
        'stamp': '3px 3px 0px #121826',
        'stamp-hover': '4px 6px 0px rgba(0,0,0,0.06)',
        'stamp-subtle': '2px 4px 0px rgba(0,0,0,0.06)',
        'glow-primary': '0px 8px 24px -8px rgba(22,118,243,0.5)',
        'glass-floating': '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
        'ink-bleed': '0px 0px 8px 2px rgba(223,73,148,0.4)', /* Magenta accent bleed */
        'sticky-note': '3px 3px 8px rgba(0,0,0,0.12)',
        'polaroid': '2px 4px 12px rgba(0,0,0,0.1)',
        /* Dark Mode Glows */
        'glow-subtle': '0px 0px 8px rgba(77, 163, 255, 0.08)',
        'glow-interactive': '0px 0px 16px rgba(77, 163, 255, 0.12)',
        'glow-cta': '0px 0px 32px rgba(77, 163, 255, 0.25)',
        'glow-accent': '0px 0px 24px rgba(255, 184, 51, 0.20)',
        'glow-focus': '0px 0px 0px 3px rgba(240, 86, 34, 0.20)',
        'glow-terminal': '0px 0px 16px rgba(240, 86, 34, 0.15)',
        'glow-charcoal': '0px 2px 8px rgba(0, 0, 0, 0.4)',
        'polaroid-dark': '2px 4px 16px rgba(0, 0, 0, 0.6)',
      },
      transitionTimingFunction: {
        'spring-gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'nav-pill-in': 'nav-pill-in 0.35s cubic-bezier(0.32,0.72,0,1)',
        'nav-slide-up': 'nav-slide-up 0.4s cubic-bezier(0.32,0.72,0,1)',
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
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'nav-pill-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'nav-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
