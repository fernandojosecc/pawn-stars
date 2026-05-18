import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Pawn Stars brand colors
      colors: {
        // Dark carbon backgrounds
        carbon: {
          DEFAULT: '#0A0A08',
          50: '#1A1A18',
          100: '#141412',
          200: '#1E1E1C',
          300: '#2A2A28',
          400: '#3A3A38',
          500: '#4A4A48',
          600: '#6A6A68',
          700: '#8A8A88',
          800: '#AAAAAA',
          900: '#CACAC8',
          950: '#FAFAF8',
        },
        // Brand gold
        gold: {
          50: '#FBF5E8',
          100: '#F5E9C8',
          200: '#EDD494',
          300: '#E4C06A',
          400: '#D4B056',
          DEFAULT: '#C9A84C',
          500: '#C9A84C',
          600: '#B8933A',
          700: '#9A7A2E',
          800: '#7C6124',
          900: '#5E491B',
          950: '#3A2D10',
        },
        // Primary - Chess board inspired
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Accent - Gold/Trophy inspired
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Success - Green
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Danger - Red
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Warning - Amber
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Chess board squares
        chess: {
          light: '#f0d9b5',
          dark: '#b58863',
          'light-hover': '#e6ccb3',
          'dark-hover': '#a67c52',
        },
      },
      // Custom typography
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas-neue)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'JetBrains Mono', 'monospace'],
      },
      // Custom spacing based on 8px grid
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Custom shadows for depth
      boxShadow: {
        'chess': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'trophy': '0 10px 15px -3px rgba(245, 158, 11, 0.1), 0 4px 6px -2px rgba(245, 158, 11, 0.05)',
      },
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Custom breakpoints for mobile-first
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};

export default config;
