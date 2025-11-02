/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'capthat-primary': '#68C5DB',
        'capthat-blue': '#0197F6',
        'capthat-dark': '#02182B',
        'capthat-teal': '#448FA3',
        'capthat-red': '#D7263D',
      },
    },
  },
  plugins: [],
}

