/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Olympic Headline"', 'sans-serif'],
        sans: ['"Olympic Sans"', 'sans-serif'],
        sansBold: ['"Olympic Sans Bold"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [
    require('daisyui'),
  ],
}

