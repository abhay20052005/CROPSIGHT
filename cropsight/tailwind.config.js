/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e7d32',
          dark: '#1b5e20',
          light: '#4caf50',
        },
        secondary: {
          DEFAULT: '#ffa000',
          dark: '#f57c00',
          light: '#ffb333',
        },
        background: '#f8fafc',
        foreground: '#171717',
      },
    },
  },
  plugins: [],
}
