import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    colors: {
      primary: '#4682A9',
      secondary: '#F5FAFA',
      tertiary: '#CCF2F4',
      quaternary: '#A4EBF3',
      quinary: '#A7CBCF',
      senary: '#00A6FB',
      septenary: '#FFADAD',
      green: "#00FF00",
      gray: "#f8f9fa",
      textgray: "#8e9299",
      darkGray:"#6b7385",
      lightborder: "#e6e3f1",
      white: "#FFFFFF",
      black: "#000000",
      sucsessGreen:"#3EB75E",
      red:"#FF0000",
      transparent: 'transparent',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
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
      },
      boxShadow: {
        'spread-sm': '0 2px 4px 2px rgba(0, 0, 0, 0.1)',
        'spread-md': '0 4px 6px 3px rgba(0, 0, 0, 0.1)',
        'spread-lg': '0 10px 15px 5px rgba(0, 0, 0, 0.1)',
        'spread-xl': '0 20px 25px 10px rgba(0, 0, 0, 0.1)',
      },
      outline: {
        none: ['2px solid transparent', '2px']
      },
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
