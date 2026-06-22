/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { neon: '#C8FF00', dark: '#0A0A0A', mid: '#111111' },
      fontFamily: { bebas: ['var(--font-bebas)','sans-serif'], inter: ['var(--font-inter)','sans-serif'] }
    }
  },
  plugins: []
}
