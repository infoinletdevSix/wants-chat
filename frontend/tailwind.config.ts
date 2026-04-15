import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#6096B4',
          foreground: '#ffffff',
          50: '#F0F5F8',
          100: '#DAE5EC',
          200: '#BDCDD6',
          300: '#93BFCF',
          400: '#75AAC1',
          500: '#6096B4',
          600: '#4C7F98',
          700: '#3A6A82',
          800: '#2A566B',
          900: '#1B4356',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#6096B4',
        // Brand colors — slate-blue (OSS edition)
        brand: {
          DEFAULT: '#6096B4',
          light: '#75AAC1',
          dark: '#4C7F98',
          50: '#F0F5F8',
          100: '#DAE5EC',
          200: '#BDCDD6',
          300: '#93BFCF',
          400: '#75AAC1',
          500: '#6096B4',
          600: '#4C7F98',
          700: '#3A6A82',
          800: '#2A566B',
          900: '#1B4356',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        // OSS edition palette — slate-blue + cream, used on the public OSS
        // landing page for a calmer, community-focused identity. Core app
        // surfaces still use the teal brand.
        oss: {
          ink: '#14232B',      // body / headings on cream
          accent: {
            DEFAULT: '#6096B4',  // primary action, links
            dark: '#4C7F98',     // hover / active
          },
          mist: '#93BFCF',     // soft sky-blue, info chips
          fog: '#BDCDD6',      // pale blue-gray surfaces
          paper: '#EEE9DA',    // cream page background
        },
        // Fitness theme colors
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
}

export default config