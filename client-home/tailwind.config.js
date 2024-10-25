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
        's550': '550px',
        's600': '600px',
        's650': '650px',
        'xl': '1200px', 
      },
      
      spacing: {
        '1.5': '0.375rem',
        '3.5': '0.875rem',
        '5.5': '1.375rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '24': '6rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '29': '7.25rem',
        '30': '7.5rem',
        '65': '16.25rem',
        '70': '17.5rem',
        '18': '4.25rem',
        'xl': '20rem',
        '85': '21.25rem',
        '100': '25rem',
        '110': '27.5rem',
        '125': '31.25rem',
        '150': '37.5rem',
        '200': '50rem',
        '250': '62.5rem',
      },

      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },

      scale: {
        102: '1.02',
      },

      animation: {
        'border-spin': 'border-spin 7s linear infinite',
        'spin-slow': 'spin 7s linear infinite',
      },

    },
  },
  plugins: [],
}

