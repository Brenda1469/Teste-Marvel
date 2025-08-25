/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        marvel: {
          red: '#ec1d24',
          dark: '#0d0d0d',
          gray: '#1a1a1a',
          lightgray: '#2c2c2c'
        }
      },
      fontFamily: {
        marvel: ['Marvel', 'sans-serif']
      }
    },
  },
  plugins: [],
};

export default config;