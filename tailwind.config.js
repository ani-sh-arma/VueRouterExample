/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#1f2937',
        'secondary': '#4b5563',
        'tertiary': '#f3f4f6',
        'quaternary': '#e5e7eb',
      }
    },
    fontFamily: {
      'ubuntu-mono': ['"Ubuntu Mono"', 'monospace'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens:{
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
  },
  plugins: [],
};
