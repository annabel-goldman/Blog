import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        'parchment': {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#faf8f5',
          300: '#f5f2ed',
          400: '#ede8e0',
          500: '#e0d8cc',
          600: '#d1c5b5',
          700: '#b8a894',
          800: '#9a8b75',
          900: '#7d6f5d',
        },
        'charcoal': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        'aristocratic': {
          red: '#8B4513',
          pink: '#DDA0DD',
          blue: '#B0C4DE',
          gold: '#DAA520',
          cream: '#F5F5DC',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter, sans-serif',
            h1: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config 