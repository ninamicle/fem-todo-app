/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brightBlue: 'hsl(220, 98%, 61%)',
      veryLightGray: 'hsl(0, 0%, 98%)',
      veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
      lightGrayishBlue: 'hsl(233, 11%, 84%)',
      darkGrayishBlue: 'hsl(236, 9%, 61%)',
      veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',

      veryDarkBlueDark: 'hsl(235, 21%, 11%)',
      veryDarkDesaturatedBlueDark: 'hsl(235, 24%, 19%)',
      lightGrayishBlueDark: 'hsl(234, 39%, 85%)',
      lightGrayishBlueDarkHover: 'hsl(236, 33%, 92%)',
      darkGrayishBlueDark: 'hsl(234, 11%, 52%)',
      veryDarkGrayishBlueDarker: 'hsl(233, 14%, 35%)',
      veryDarkGrayishBlueDark: 'hsl(237, 14%, 26%)'
    },
    extend: {

      backgroundImage: {
        checkBackground: 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
        'desktop-hero-pattern': "url('/bg-desktop-light.jpg')",
        'desktop-hero-pattern-dark': "url('/bg-desktop-dark.jpg')",
        'mobile-hero-pattern': "url('/bg-mobile-light.jpg')",
        'mobile-hero-pattern-dark': "url('/bg-mobile-dark.jpg')",
      }
    },
  },
  plugins: [

  ],
  darkMode: "class"
}

