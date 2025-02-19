import type { Config } from 'tailwindcss';

const plugin = require('tailwindcss/plugin');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  safelist: [
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          background: 'var(--background-color)',
          foreground: 'var(--foreground-color)',
          accent: 'var(--accent-color)',
          'secondary-accent': 'var(--secondary-accent-color)',
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
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        slideDownAndFade: {
          from: {
            opacity: '0',
            transform: 'translateY(-2px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideLeftAndFade: {
          from: {
            opacity: '0',
            transform: 'translateX(2px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideUpAndFade: {
          from: {
            opacity: '0',
            transform: 'translateY(2px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideRightAndFade: {
          from: {
            opacity: '0',
            transform: 'translateX(-2px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        rotateDownAndOut: {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(150%) rotate(-20deg)',
          },
        },
        rotateUpAndIn: {
          from: {
            transform: 'translateY(150%) rotate(-20deg)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        navContentUp: {
          from: {
            transform: 'translateY(0)',
            opacity: '1',
          },
          to: {
            transform: 'translateY(-105%)',
            opacity: '0',
          },
        },
        navContentDown: {
          from: {
            transform: 'translateY(-105%)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
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
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      addVariant('optional', '&:optional');
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('inverted-colors', '@media (inverted-colors: inverted)');
    }),
  ],
} satisfies Config;

export default config;
