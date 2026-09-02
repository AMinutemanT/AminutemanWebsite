/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '481px',
      'md': '769px',
      'lg': '1025px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Structural blacks. Neutral rather than blue-tinted, so the orange
        // accent stays the only chromatic note on the page.
        void: '#000000',
        abyss: '#060608',
        panel: '#0A0A0C',
        steel: '#16161A',
        line: {
          DEFAULT: '#1F1F24',
          bright: '#2A2A30',
        },
        // Primary accent. Navigation, data, every active state.
        accent: {
          DEFAULT: '#FF8A00',
          soft: '#FFAE42',
          deep: '#FF7A3F',
        },
        // Kept as an alias so existing signal/targeting chrome stays consistent.
        signal: {
          DEFAULT: '#FF8A00',
          soft: '#FFAE42',
        },
        // Status colours.
        nominal: '#5DFF6A',
        critical: '#FF5A5A',
        info: '#5AB6FF',
        // Text ramp.
        ink: {
          0: '#FFFFFF',
          1: '#E8E8EC',
          2: '#B8B8BF',
          3: '#8C8C94',
          // Raised from #5A5A62, which sat at 3.07:1 on black and failed WCAG AA
          // for the small mono labels this is used on. Now 5.52:1.
          dim: '#82828B',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xs: '1.5rem',
          sm: '2rem',
          md: '2.5rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
        screens: {
          xs: '100%',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Big Shoulders Display"', 'Impact', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '0.95' }],
        '9xl': ['8rem', { lineHeight: '0.9' }],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.35em',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(to right, rgba(255,255,255,0.038) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.038) 1px, transparent 1px)',
        'grid-coarse':
          'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-fine': '32px 32px',
        'grid-coarse': '128px 128px',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.9' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        drift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 -256px' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.25' },
          '100%': { opacity: '1' },
        },
        'trace-dash': {
          to: { strokeDashoffset: '-1000' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        sweep: 'sweep 6s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        drift: 'drift 24s linear infinite',
        blink: 'blink 2.6s ease-in-out infinite',
        'trace-dash': 'trace-dash 14s linear infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
