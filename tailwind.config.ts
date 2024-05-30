import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  darkMode: 'class', // Ensure dark mode is set to 'class'
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4682A9',
          100: '#E1F0F7',
          200: '#B3D9EB',
          300: '#85C3DF',
          400: '#57ACD3',
          500: '#4682A9',
          600: '#396883',
          700: '#2D4D5D',
          800: '#203337',
          900: '#121A1A'
        },
        secondary: {
          DEFAULT: '#F5FAFA',
          100: '#FCFDFD',
          200: '#F9FAFA',
          300: '#F5FAFA',
          400: '#F0F6F6',
          500: '#EBF2F2',
          600: '#C4CACB',
          700: '#9DA2A4',
          800: '#757A7C',
          900: '#4E5354'
        },
        tertiary: {
          DEFAULT: '#CCF2F4',
          100: '#E3F7F8',
          200: '#C6EEF0',
          300: '#A9E6E9',
          400: '#8CDDE1',
          500: '#70D5DA',
          600: '#5CA9AE',
          700: '#478083',
          800: '#325659',
          900: '#1D2C2E'
        },
        quaternary: {
          DEFAULT: '#A4EBF3',
          100: '#E6F6FA',
          200: '#CDEEF5',
          300: '#B3E7F0',
          400: '#99DFEB',
          500: '#80D8E6',
          600: '#66AAB8',
          700: '#4D7D8A',
          800: '#334F5C',
          900: '#192A2E'
        },
        quinary: {
          DEFAULT: '#A7CBCF',
          100: '#E3F1F1',
          200: '#C7E3E3',
          300: '#A7CBCF',
          400: '#89B4BB',
          500: '#6A9DA7',
          600: '#558184',
          700: '#3E6163',
          800: '#2A4242',
          900: '#152222'
        },
        senary: {
          DEFAULT: '#00A6FB',
          100: '#E6F7FE',
          200: '#CDEFFA',
          300: '#B3E8F7',
          400: '#99E0F3',
          500: '#80D9F0',
          600: '#66AACE',
          700: '#4D7B9C',
          800: '#334D6A',
          900: '#192E37'
        },
        septenary: {
          DEFAULT: '#FFADAD',
          100: '#FFE5E5',
          200: '#FFBABA',
          300: '#FF8E8E',
          400: '#FF6363',
          500: '#FF3939',
          600: '#DB2F2F',
          700: '#B72626',
          800: '#931C1C',
          900: '#6F1313'
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F2F2F2',
          300: '#E6E6E6',
          400: '#D9D9D9',
          500: '#CCCCCC',
          600: '#B3B3B3',
          700: '#999999',
          800: '#7F7F7F',
          900: '#666666'
        },
        customRed: {
          DEFAULT: '#FF0000',
          100: '#FFE5E5',
          200: '#FFBABA',
          300: '#FF8E8E',
          400: '#FF6363',
          500: '#FF0000',
          600: '#DB0000',
          700: '#B70000',
          800: '#930000',
          900: '#6F0000'
        },
        ...defaultTheme.colors,
        gray: {
          DEFAULT: '#F5FAFA',
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0',
          600: '#718096',
          700: '#4A5568',
          800: '#2D3748',
          900: '#1A202C'
        },
        blue: {
          DEFAULT: '#2563EB',
          100: '#EBF8FF',
          200: '#BEE3F8',
          300: '#90CDF4',
          400: '#63B3ED',
          500: '#4299E1',
          600: '#2563EB',
          700: '#2B6CB0',
          800: '#2C5282',
          900: '#2A4365'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
