/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        odst: {
          orange: '#E87729',
          'orange-hover': '#D5681E',
          'orange-light': '#FFF0E5',
          navy: '#242E69',
          'navy-dark': '#18204D',
          'navy-deep': '#101638',
          cream: '#FFF7F0',
          'cream-border': '#FFE9D6',
          muted: '#8FA7B7',
          gray: '#E2E8F0',
        }
      },
      fontFamily: {
        'noto-arabic': ['"Noto Sans Arabic"', 'Cairo', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'Cairo', 'sans-serif'],
        kufam: ['Kufam', '"Noto Sans Arabic"', 'sans-serif'],
        cairo: ['Cairo', '"Noto Sans Arabic"', 'sans-serif'],
        k2d: ['K2D', 'sans-serif'],
        sans: ['Outfit', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'hero': '32px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
