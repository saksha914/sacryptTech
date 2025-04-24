import type { Config } from 'tailwindcss';

const config: Config = {
  // mode: 'jit', // Removed mode for v3
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          dark: '#E5E5E5',
        },
        secondary: {
          DEFAULT: '#F3F4F6',
          dark: '#E5E7EB',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#D1D5DB',
          dark: '#9CA3AF',
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF' },
          '100%': { boxShadow: '0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'text-reveal': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 