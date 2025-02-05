/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Add this for App Router support
    './pages/**/*.{js,ts,jsx,tsx}', // Keep this for Pages Router (if used)
    './components/**/*.{js,ts,jsx,tsx}', // Ensure components are included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
