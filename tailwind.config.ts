import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-tenor-sans)'],
        subtitle: ['var(--font-poppins)'],
        body: ['var(--font-nunito)'],
        switzer: ['var(--font-switzer)'],
        switzerItalic: ['var(--font-switzer-italic)'],
      },
      letterSpacing: {
        reduced: '-3%',
        expanded: '5%',
      },
      colors: {
        light_blue: {
          DEFAULT: '#b0dee6',
          100: '#14383e',
          200: '#276f7c',
          300: '#3ba7ba',
          400: '#73c5d3',
          500: '#b0dee6',
          600: '#c1e5eb',
          700: '#d0ecf0',
          800: '#e0f2f5',
          900: '#eff9fa',
          50: '#b0dee680',
        },
        bondi_blue: {
          DEFAULT: '#368db1',
          100: '#0b1c23',
          200: '#163846',
          300: '#205369',
          400: '#2b6f8c',
          500: '#368db1',
          600: '#53a7ca',
          700: '#7ebdd7',
          800: '#a9d3e5',
          900: '#d4e9f2',
        },
        charcoal: {
          DEFAULT: '#313e4e',
          100: '#0a0c10',
          200: '#14191f',
          300: '#1d252f',
          400: '#27323f',
          500: '#313e4e',
          600: '#4f647d',
          700: '#728aa7',
          800: '#a1b1c4',
          900: '#d0d8e2',
          80: '#313e4eCC',
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#ffffff',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff',
        },
        'anti-flash': {
          DEFAULT: '#f3f5f6',
          100: '#2a3338',
          200: '#546670',
          300: '#8498a2',
          400: '#bcc7cc',
          500: '#f3f5f6',
          600: '#f6f7f8',
          700: '#f8f9fa',
          800: '#fafbfb',
          900: '#fdfdfd',
          50: '#f3f5f680',
        },
        jasmine: {
          DEFAULT: '#ffe48c',
          100: '#4f3c00',
          200: '#9d7800',
          300: '#ecb500',
          400: '#ffd13b',
          500: '#ffe48c',
          600: '#ffe9a1',
          700: '#ffefb9',
          800: '#fff4d0',
          900: '#fffae8',
          75: '#ffe48cbf',
        },
        silver: {
          DEFAULT: '#c5c7c9',
          100: '#262829',
          200: '#4c5053',
          300: '#73777c',
          400: '#9b9fa3',
          500: '#c5c7c9',
          600: '#d0d2d4',
          700: '#dcdddf',
          800: '#e8e9e9',
          900: '#f3f4f4',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          background: 'var(--background-color)',
          foreground: 'var(--foreground-color)',
          accent: 'var(--accent-color)',
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        default: 'cubic-bezier(0.7, 0, 0.2, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        rotateDownAndOut: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(150%) rotate(-20deg)' },
        },
        rotateUpAndIn: {
          from: { transform: 'translateY(150%) rotate(-20deg)' },
          to: { transform: 'translateY(0)' },
        },
        navContentUp: {
          from: { transform: 'translateY(0)', opacity: '1' },
          to: { transform: 'translateY(-105%)', opacity: '0' },
        },
        navContentDown: {
          from: { transform: 'translateY(-105%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        rotateDownAndOut:
          'rotateDownAndOut 500ms cubic-bezier(0.7, 0, 0.2, 1) forwards',
        rotateUpAndIn:
          'rotateUpAndIn 500ms cubic-bezier(0.7, 0, 0.2, 1) forwards',
        navContentUp:
          'navContentUp 500ms cubic-bezier(0.7, 0, 0.2, 1) forwards',
        navContentDown:
          'navContentDown 500ms cubic-bezier(0.7, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
