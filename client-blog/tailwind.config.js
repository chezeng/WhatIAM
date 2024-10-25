const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'ssm': '320px',
        'iphone': '375px',
        'galaxy': '344px',
        's375': '375px',
        's400': '400px',
        's450': '450px',
        's500': '500px',
        'xl': '1200px', 
      },
      spacing: {
        5.5: '1.375rem',
      },

      scale: {
        102: '1.02',
      },
      
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],

}

